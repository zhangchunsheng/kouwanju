var battleControl = (function() {

    var EA = wozllajs.EventAdmin;

    var battleStage;
    var battleData;
    var battleMap;
    var battleObjectMap;
    var working = false;

    var fightNumberControl = (function() {

        EA.on('battle.hit', function(e) {
            var babbleUnit = e.battleUnit;
            var pos = e.pos;
            fightNumberControl.bubble(babbleUnit.damageType, e.damage, pos, e.camp);
        });

        return {
            bubble : function(type, number, pos, camp) {
                battleStage.findObjectByPath('FightFrontLayer.FightFont').getRenderer().bubble(type, number, pos, camp);
            }
        }
    })();

    var battleObjectBuilder = (function() {

        var objectQueue = [];

        function buildBattleObject(onComplete) {
            var objectData = objectQueue.shift();
            if(!objectData) {
                onComplete && onComplete();
                return;
            }
            game.loadSceneData('battle/' + objectData.kind, function(sceneData) {
                var gameObject = wozllajs.StageBuilder.buildGameObject(sceneData.children[0]);
                gameObject.loadResources({
                    onComplete : function() {
                        var objId = objectData.camp + '_' + objectData.formation;
                        var formationPlaceHolder = battleControl.getFightLayer().getObjectById(objId);
                        gameObject.transform.x = formationPlaceHolder.transform.x;
                        gameObject.transform.y = formationPlaceHolder.transform.y;
                        gameObject.init();
                        gameObject.setId(objectData.id);
                        var effectObj = gameObject.getObjectById('Effect');
                        if(effectObj) {
                            effectObj.remove();
                            battleControl.getFightFrontLayer().addObject(effectObj);
                        }
                        battleControl.getFightLayer().addObject(gameObject);
                        gameObject.callBehaviour('initBattleData', [objectData]);
                        battleObjectMap[gameObject.id] = gameObject.getBehaviour('battle.object');
                        buildBattleObject(onComplete);
                    }
                });
            });
        }

        return {

            build : function(battleData, onComplete) {
                var i, len, data;
                battleObjectMap = {};
                for(i=0,len=battleData.player.length; i<len; i++) {
                    data = battleData.player[i];
                    data.camp = 'player';
                    objectQueue.push(data);
                }
                for(i=0,len=battleData.enemy.length; i<len; i++) {
                    data = battleData.enemy[i];
                    data.camp = 'enemy';
                    objectQueue.push(data);
                }
                buildBattleObject(onComplete);
            }
        }

    })();

    var handleResult = function(onComplete) {
        battleResultControl.show(battleData.result, onComplete);
    };

    var battleDirector = (function() {

        function updateValues(battleUnit, onComplete) {
            battleObjectMap[battleUnit.target].updateHP(battleUnit.targetHP);
            battleObjectMap[battleUnit.target].updateAnger(battleUnit.targetAnger);
            battleObjectMap[battleUnit.attacker].updateAnger(battleUnit.attackAnger);

            if(battleUnit.targetDied) {
                setTimeout(function() {
                    battleObjectMap[battleUnit.target].death(onComplete);
                }, 500);
            } else {
                onComplete && onComplete();
            }
        }

        function checkBattleOver(showResult, onContinue) {
            if(battleData.battle.length === 0) {
                showResult();
            } else {
                onContinue && onContinue();
            }
        }

        function updateBuffs(battleUnit, onComplete) {
            onComplete && onComplete();
        }

        function updateSequence(battleUnit, onComplete) {
            battleControl.getAttackSequenceApi().queueUpTo(1, function() {
                onComplete && onComplete();
            });
        }


        function nextBattle(onComplete) {
            var battleUnit = battleData.battle.shift();
            //battleData.battle.unshift(battleUnit);
            if(!battleUnit) {
                onComplete && onComplete();
                return;
            }
            var attackBattleObj = battleObjectMap[battleUnit.attacker];
            var targetBattleObj = battleObjectMap[battleUnit.target];
            setTimeout(function() {
                attackBattleObj.attack(targetBattleObj, battleUnit, function() {
                    setTimeout(function() {
                        updateValues(battleUnit, function() {
                            setTimeout(function() {
                                checkBattleOver(onComplete, function() {
                                    updateBuffs(battleUnit, function() {
                                        updateSequence(battleUnit, function() {
                                            nextBattle(onComplete);
                                        });
                                    });
                                });
                            }, 500);
                        });
                    }, 500);

                });
            }, 300);
            if(battleUnit.attackType === 0) {
                battleControl.tipsAttack(battleUnit.attacker);
            } else {
                battleControl.tipsSkill(battleUnit.attacker);
            }
        }

        return {
            direct : function(onComplete) {
                nextBattle(onComplete);
            }
        }

    })();

    return {

        testBattle : function() {
            client.battle({}, function(battleData) {
                battleControl.initBattle(battleData, function() {
                    battleControl.startBattle();
                });
            });
        },

        initBattle : function(aBattleData, onComplete) {
            battleData = aBattleData;
            battleMap = {};
            var i, len, data;
            for(i=0,len=battleData.player.length; i<len; i++) {
                data = battleData.player[i];
                data.camp = 'player';
                battleMap[data.id] = data;
            }
            for(i=0,len=battleData.enemy.length; i<len; i++) {
                data = battleData.enemy[i];
                data.camp = 'enemy';
                battleMap[data.id] = data;
            }
            battleStage = game.initScene('main', 'Fight', function() {
//                battleDataProvider.setBattleData(battleData);
                battleObjectBuilder.build(battleData, function() {
                    onComplete && onComplete();
                });
            });
        },

        destroyBattle : function() {
            //battleStage && battleStage.releaseResources();
            cityUIControl.setWorking(true);
            playerControl.setWorking(true);
            battleStage.releaseResources([
                'resources/texture/UI_all.tt.png',
                'resources/texture/UI_public.tt.png'
            ]);
            battleStage.destroy();
            battleStage = null;
            working = false;
        },

        getBattleStage : function() {
            return battleStage;
        },

        getFightLayer : function() {
            return battleStage.getObjectById('FightLayer');
        },

        getFightFrontLayer : function() {
            return battleStage.getObjectById('FightFrontLayer');
        },

        getAttackSequenceApi : function() {
            return battleStage.findObjectByPath('AttackSeq.List').getBehaviour('battle.attackSeqApi');
        },

        startBattle : function() {
            cityUIControl.setWorking(false);
            playerControl.setWorking(false);
            battleControl.setWorking(true);
            battleControl.showPK(function() {
                battleControl.showUI(function() {
                    setTimeout(function() {
                        battleDirector.direct(function() {
                            setTimeout(function() {
                                handleResult(function() {
                                    console.log('battle result');
                                });
                            }, 500);
                        });
                    }, 1000);
                });
            });
        },

        showPK : function(finished) {
            var pk = battleStage.getObjectById('PK');
            pk.setActive(true);
            pk.getBehaviour('battle.PKAnimation').animate(function() {
                finished && finished();
            });
        },

        showUI : function(onComplete) {
            var attackSeqObj = battleStage.getObjectById('AttackSeq');
            var enemyTeamBuff = battleStage.getObjectById('EnemyTeamBuff');
            var myTeamInfo = battleStage.getObjectById('MyTeamInfo');
            attackSeqObj.setActive(true);
            enemyTeamBuff.setActive(true);
            myTeamInfo.setActive(true);
            attackSeqObj.callBehaviour('animate');
            enemyTeamBuff.callBehaviour('animate');
            myTeamInfo.callBehaviour('animate');
            setTimeout(function() {
                onComplete && onComplete();
            }, 600);
        },

        getIdForAttackSequence : function(attackSequenceObjectId) {
            if(!battleData) {
                return attackSequenceObjectId;
            }
            var ids = attackSequenceObjectId.split('_');
            var data = battleData[ids[0]][parseInt(ids[1])-1];
            if(!data) {
                return null;
            }
            return data.id;
        },

        getIdForMyTeamInfo : function(myTeamInfoObjectId) {
            return battleControl.getIdForAttackSequence(myTeamInfoObjectId);
        },

        getAttackSequenceHeadCut : function(id) {
            if(!battleData) {
                return null;
            }
            var kind = battleMap[id].kind;
            return 'resources/battle/headcut/' + kind + '.png';
        },

        getMyTeamInfoHeadCut : function(id) {
            if(!battleData) {
                return null;
            }
            var kind = battleMap[id].kind;
            return 'resources/battle/team/' + kind + '.png';
        },

        getMyTeamCharacterObject : function(id) {
            return battleStage.findObjectByPath('MyTeamInfo.Layout.ClistLayout.' + id);
        },

        getInitSequence : function() {
            if(!battleData) {
                return null;
            }
            return battleData.battle[0].sequence;
        },

        getBattleObjectBasicInfo : function(id) {
            if(!battleData) {
                return null;
            }
            var i, len;
            var infoDatas = battleData.player.concat(battleData.enemy);
            for(i=0,len=infoDatas.length; i<len; i++) {
                if(infoDatas[i].id === id) {
                    return infoDatas[i];
                }
            }
            return null;
        },

        getBattleObjectById : function(id) {
            return battleObjectMap[id];
        },

        tipsAttack : function(id) {
            var attackEffect = battleStage.findObjectByPath('MyTeamInfo.Layout.ClistLayout.attack_effect');
            var skillEffect = battleStage.findObjectByPath('MyTeamInfo.Layout.ClistLayout.skill_effect');
            attackEffect.setActive(false);
            skillEffect.setActive(false);
            var attackObj = battleControl.getMyTeamCharacterObject(id);
            if(attackObj) {
                attackEffect.transform.x = attackObj.transform.x;
                attackEffect.setActive(true);
                attackEffect.getRenderer().addEventListener('animationend', function() {
                    attackEffect.setActive(false);
                }, true);
            }
        },

        tipsSkill : function(id) {
            var attackEffect = battleStage.findObjectByPath('MyTeamInfo.Layout.ClistLayout.attack_effect');
            var skillEffect = battleStage.findObjectByPath('MyTeamInfo.Layout.ClistLayout.skill_effect');
            attackEffect.setActive(false);
            skillEffect.setActive(false);
            var attackObj = battleControl.getMyTeamCharacterObject(id);
            if(attackObj) {
                skillEffect.transform.x = attackObj.transform.x;
                skillEffect.setActive(true);
            }
        },

        setWorking : function(flag) {
            working = flag;
        },

        tick : function() {
            working && battleStage && battleStage.tick();
        }
    };

})();