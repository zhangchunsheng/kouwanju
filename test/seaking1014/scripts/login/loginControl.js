var loginControl = (function() {

    var EA = wozllajs.EventAdmin;
    var loginStage;
    var tween;
    var loginTokenHolder = localData.get('login.token');
    var userInput = false;
    var serverListData;
    var selectedServer;
    var selectedCharacterObj;
    var selectedCharacterOriginalPos;
    var isRandomName = false;

    var fsm = StateMachine.create({
        initial: 'LoginPanel',
        events: [
            { name: 'login',  from: 'LoginPanel',  to: 'ServerListPanel' },
            { name: 'toRegister', from: 'LoginPanel', to: 'RegisterPanel' },
            { name: 'register', from: 'RegisterPanel', to: 'LoginPanel' },
            { name: 'returnToLogin', from: 'ServerListPanel', to: 'LoginPanel' },
            { name: 'connectServer', from: 'ServerListPanel', to: 'MainPlayerSelectPanel' },
            { name: 'returnToServerList', from: 'MainPlayerSelectPanel', to: 'ServerListPanel' }
        ],
        callbacks : {

            onleaveLoginPanel : function(type, from, to, params) {
                if(type === 'toRegister') {
                    loginControl.showRegisterPanel(function() {
                        fsm.transition();
                    });
                } else {
                    loadingControl.alert({
                        text : '登录中...',
                        onComplete : function() {

                            function fail(text) {
                                loginTokenHolder = null;
                                if(typeof text !== 'string') {
                                    text = null;
                                }
                                loadingControl.closeAlert(function() {
                                    popupControl.notice(text || '登录失败!');
                                });
                                fsm.transition.cancel();
                            }

                            function success(data) {
                                if(data.code !== 200) {
                                    fail();
                                    return;
                                }
                                loginTokenHolder = data;
                                updateLoginFields();
                                localData.set('login.token', loginTokenHolder);
                                client.setToken(data.token);
                                client.getServerList(function(data) {
                                    serverListData = data;
                                    if(data.code !== 200) {
                                        fail();
                                        return;
                                    }
                                    setTimeout(function() {
                                        loadingControl.closeAlert(function() {
                                            loginControl.hideLoginPanel(function() {
                                                setTimeout(function() {
                                                    loginControl.showServerListPanel(serverListData);
                                                }, 300);
                                                fsm.transition();
                                            });
                                        });
                                    }, 500);
                                }, fail, fail);
                            }

                            if(params.type === 'quicklyEnter') {
                                client.autoRegister(success, fail, fail);
                            } else if(params.type === 'userRegister') {
                                success(params.data);
                            } else if(params.type === 'userLogin') {
                                if(userInput) {
                                    client.login(params.data, success, fail, fail);
                                } else {
                                    success(loginTokenHolder);
                                }
                            }
                        }
                    });
                }
                return StateMachine.ASYNC;
            },

            onleaveRegisterPanel : function(type, from, to, params) {
                loadingControl.alert({
                    text: '注册中...',
                    onComplete : function() {

                        function fail(text) {
                            loginTokenHolder = null;
                            if(typeof text !== 'string') {
                                text = null;
                            }
                            loadingControl.closeAlert(function() {
                                popupControl.notice(text || '注册失败!');
                            });
                            fsm.transition.cancel();
                        }

                        function success(data) {
                            if(data.code !== 200) {
                                fail();
                                return;
                            }
                            loginTokenHolder = data;
                            updateLoginFields();
                            loadingControl.closeAlert(function() {
                                loginControl.hideRegisterPanel(function() {
                                    fsm.transition();
                                    fsm.login({
                                        type : 'userRegister',
                                        data : data
                                    });
                                });
                            });
                        }

                        // TODO register
                        client.register(params, success, fail);
                    }
                });
                return StateMachine.ASYNC;
            },

            onleaveServerListPanel : function(type, from, to, params) {
                if(type === 'returnToLogin') {
                    loginControl.hideServerListPanel(function() {
                        setTimeout(function() {
                            loginControl.showLoginPanel();
                            fsm.transition();
                        }, 500);
                    });
                } else if(type === 'connectServer') {
                    loadingControl.alert({
                        text: '连接服务器...',
                        onComplete : function() {
                            var serverURL = 'http://' + selectedServer.connectors.host + ':' + selectedServer.connectors.port + '/';
                            client.setServerURL(serverURL);

                            function fail(text) {
                                loadingControl.closeAlert(function() {
                                    popupControl.notice(text || '连接服务器失败!');
                                });
                                fsm.transition.cancel();
                            }

                            function success(data) {
                                if(data.code !== 200) {
                                    fail();
                                    return;
                                }

                                loadingControl.closeAlert(function() {
                                    loginControl.hideServerListPanel(function() {
                                        var characterDesc, nickName, characters;
                                        loginControl.showMainPlayerSelect(function() {
                                            fsm.transition();
                                        });

                                        if(params.characters && params.characters[0]) {
                                            characterDesc = params.characters[0];
                                            selectMainPlayerByIndex(characterDesc.cId);
                                            nickName = characterDesc.nickname + ' Lv' + characterDesc.level;
                                            loginStage.fp('UI_login.Layout.MainPlayerSelect.CharacterName').getRenderer().text = nickName;
                                            loginStage.bset('UI_login.Layout.MainPlayerSelect', {
                                                'SelectHelper' : { active: false },
                                                'Buttons.NameInput' : { active: false },
                                                'DeleteCharacterBtn' : { active: true },
                                                'EnterGameBtn' : { active : true },
                                                'CharacterName' : { active : true },
                                                'Characters.Character1' :  { active : false },
                                                'Characters.Character2' :  { active : false },
                                                'Characters.Character3' :  { active : false },
                                                'Characters.Character4' :  { active : false }
                                            }, true);
                                            loginStage.bset('UI_login.Layout.MainPlayerSelect.Characters.Character' + characterDesc.cId, {
                                                active : true,
                                                x: -31,
                                                y: 247
                                            });

                                        } else {
                                            selectMainPlayerByIndex(1);

                                            loginStage.bset('UI_login.Layout.MainPlayerSelect', {
                                                'SelectHelper' : { active: true },
                                                'Buttons.NameInput' : { active: true },
                                                'DeleteCharacterBtn' : { active: false },
                                                'EnterGameBtn' : { active : false },
                                                'CharacterName' : { active : false },
                                                'Characters.Character1' :  { active : true, x: -350, y: 229 },
                                                'Characters.Character2' :  { active : true, x: -149, y: 246 },
                                                'Characters.Character3' :  { active : true, x: 76, y: 206 },
                                                'Characters.Character4' :  { active : true, x: 271, y: 222 }
                                            }, true);

                                            randomName();

                                        }

                                    });
                                });
                            }

                            client.auth(success, fail, fail);
                        }
                    });
                }
                return StateMachine.ASYNC;
            },

            onleaveMainPlayerSelectPanel : function() {
                loginControl.hideMainPlayerSelect(function() {
                    loginControl.showServerListPanel(serverListData, function() {
                        selectedServer = null;
                        fsm.transition();
                    });
                });
                return StateMachine.ASYNC;
            }


        }
    });

    EA.on('Login.Account.changed', function() {
        userInput = true;
    });

    EA.on('Login.Password.changed', function() {
        userInput = true;
    });

    EA.on('QuicklyEnterBtn.click', function() {
        fsm.login({
            type : 'quicklyEnter'
        });
    });

    EA.on('Login.LoginBtn.click', function() {
        var account = loginStage.fp('UI_login.Layout.Login.LoginForm.AccountInput.Text').getRenderer().text;
        var password = loginStage.fp('UI_login.Layout.Login.LoginForm.PasswordInput.Text').getRenderer().text;
        if(account && password) {
            fsm.login({
                type : 'userLogin',
                data : {
                    loginName : account,
                    password : hex_md5(password),
                    registerType : 1
                }
            });
        }
    });

    EA.on('Login.RegisterBtn.click', function() {
        fsm.toRegister();
    });

    EA.on('Register.RegisterBtn.click', function() {
        var account, password, password2;
        account = loginStage.fp('UI_login.Layout.Register.RegisterForm.AccountInput.Text').getRenderer().text;
        password = loginStage.fp('UI_login.Layout.Register.RegisterForm.PasswordInput.Text').getRenderer().text;
        password2 = loginStage.fp('UI_login.Layout.Register.RegisterForm.PasswordInput2.Text').getRenderer().text;
        fsm.register({
            registerType : 1,
            loginName : account,
            password : hex_md5(password),
            password_verify : hex_md5(password2)
        });
    });

    EA.on('ServerList.ReturnBtn.click', function() {
        fsm.returnToLogin();
    });

    EA.on('ServerList.click', function(e) {
        var localP = e.localPoint;
        var y = localP.y - 25;
        var selectIndex = parseInt(y/80);
        // TODO
        var list = loginStage.fp('UI_login.Layout.ServerList.List').getChildren();
        var i, len;
        for(i=0,len=list.length; i<len; i++) {
            if(i === selectIndex) {
                list[i].getRenderer().changeFrameIndex(18);
            } else {
                list[i].getRenderer().changeFrameIndex(17);
            }
        }
        selectedServer = serverListData.serverLists[selectIndex];
    });

    EA.on('ServerList.EnterBtn.click', function() {
        if(selectedServer) {
            fsm.connectServer(selectedServer);
        } else {
            popupControl.notice('请选择服务器');
        }
    });

    EA.on('SelectMainPlayer.click', function(e) {
        var localPoint = e.localPoint;
        var selectIndex;
        if(localPoint.x <= 215) {
            selectIndex = 1;
        } else if(localPoint.x <= 430) {
            selectIndex = 2;
        } else if(localPoint.x <= 645) {
            selectIndex = 3;
        } else {
            selectIndex = 4;
        }

        selectMainPlayerByIndex(selectIndex);
    });

    EA.on('MainPlayerSelect.ReturnBtn.click', function() {
        fsm.returnToServerList();
    });

    EA.on('RandomNameHelper.click', function() {
        randomName();
    });

    EA.on('CreateCharacterBtn.click', function() {
        var nickName = loginStage.fp('UI_login.Layout.MainPlayerSelect.Buttons.NameInput.PlayerNickName').getRenderer().text;
        loadingControl.templateAlert('创建角色中...', function(close) {
            function fail() {
                close();
            }
            client.createMainPlayer({
                cId : 1,
                nickname : nickName,
                isRandom : 0
            }, function(data) {
                close(data);
            }, fail, fail);
        }, function(data) {
            if(!data || data.code !== 200) {
                popupControl.notice('创建角色失败!');
                return;
            }
            var i, len, children, child;
            var characters = loginStage.fp('UI_login.Layout.MainPlayerSelect.Characters');
            characters.bcset({ active : false });
            selectedCharacterObj.setActive(true);
            loginStage.bset('UI_login.Layout.MainPlayerSelect', {
                'Buttons.NameInput' : { active: false },
                'Buttons.EnterGameBtn' : { active : true },
                'Buttons.DeleteCharacterBtn' : { active : true },
                'SelectHelper' : { active : false }
            }, true);
            tween = createjs.Tween.get(selectedCharacterObj.transform, null, null, true).to({
                x: -31,
                y: 247
            }, 1000).call(function() {
                var characterNameObj = loginStage.fp('UI_login.Layout.MainPlayerSelect.CharacterName');
                characterNameObj.setActive(true);
                characterNameObj.getRenderer().text = data.player.nickname;
                tween = null;
            });
        });
    });

    EA.on('MainPlayerSelect.DeleteChracterBtn.click', function() {
        loadingControl.templateAlert('删除角色中...', function(close) {
            function fail() {
                close();
            }
            client.removeMainPlayer(function(data) {
                close(data);
            }, fail, fail);
        }, function(data) {
            if(!data || data.code !== 200) {
                popupControl.notice('删除角色失败!');
                return;
            }
            loginStage.fp('UI_login.Layout.MainPlayerSelect.CharacterName').setActive(false);
            tween = createjs.Tween.get(selectedCharacterObj.transform, null, null, true)
                .to({ alpha: 0 }, 500, createjs.Ease.quintOut).call(function() {
                selectedCharacterObj.bset(selectedCharacterOriginalPos);
                var character = loginStage.fp('UI_login.Layout.MainPlayerSelect.Characters');
                character.transform.alpha = 0;
                character.bcset({
                    active : true,
                    alpha : 1
                });
                tween = createjs.Tween.get(character.transform, null, null, true).to({ alpha: 1 }, 500).call(function() {
                    loginStage.bset('UI_login.Layout.MainPlayerSelect', {
                        'Buttons.NameInput' : { active: true },
                        'Buttons.EnterGameBtn' : { active : false },
                        'Buttons.DeleteCharacterBtn' : { active : false },
                        'SelectHelper' : { active : true }
                    }, true);
                    tween = null;
                });
            });
        });
    });

    function randomName() {
        loginStage.fp('UI_login.Layout.MainPlayerSelect.Buttons.NameInput.PlayerNickName').getRenderer()
            .text = '随机' + parseInt(Math.random() * 100 % 100);
    }

    function createServerItemGameObject(serverData) {
        var gameObject, characterText;
        gameObject = wozllajs.StageBuilder.buildGameObject(serverItemObject);
        gameObject.init();
        gameObject.g('ServerName').getRenderer().text = serverData.showName;
        if(!serverData.characters || serverData.characters.length === 0) {
            characterText = '无角色';
        } else {
            characterText = serverData.characters[0].nickname + ' (lv' + serverData.characters[0].level + ')';
        }
        gameObject.g('Character').getRenderer().text = characterText;
        gameObject.g('StateIcon').getRenderer().changeFrameIndex(parseInt(serverData.status) == 3 ? 3 : 4);
        var stateTextureRenderer = gameObject.g('State').getRenderer();
        switch(parseInt(serverData.status)) {
            case 1 : stateTextureRenderer.changeFrameIndex(23); break;
            case 2 : stateTextureRenderer.changeFrameIndex(12); break;
            case 3 : stateTextureRenderer.changeFrameIndex(10); break;
        }

        return gameObject;
    }

    function selectMainPlayerByIndex(selectIndex) {
        var i, len, children, child;
        var characters = loginStage.fp('UI_login.Layout.MainPlayerSelect.Characters');
        children = characters.getChildren();
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            if(child.id.indexOf(''+selectIndex) !== -1) {
                child.g('Photo').transform.alpha = 1;
                child.g('Stage').transform.regX = 8;
                child.g('Stage').transform.regY = 8;
                child.g('Stage').getRenderer().changeFrameIndex(14);
                selectedCharacterObj = child;
                selectedCharacterOriginalPos = {
                    x : child.transform.x,
                    y : child.transform.y
                };
            } else {
                child.g('Photo').transform.alpha = 0.6;
                child.g('Stage').transform.regX = 0;
                child.g('Stage').transform.regY = 0;
                child.g('Stage').getRenderer().changeFrameIndex(13);
            }
        }
    }

    function updateLoginFields() {
        userInput = false;
        if(loginTokenHolder) {
            loginStage.fp('UI_login.Layout.Login.LoginForm.AccountInput.Text').getRenderer().text = loginTokenHolder.loginName;
            loginStage.fp('UI_login.Layout.Login.LoginForm.PasswordInput.Text').getRenderer().text = loginTokenHolder.loginName;
        } else {
            loginStage.fp('UI_login.Layout.Login.LoginForm.AccountInput.Text').getRenderer().text = '';
            loginStage.fp('UI_login.Layout.Login.LoginForm.PasswordInput.Text').getRenderer().text = '';
        }
    }


    return {
        initLoginPage : function(onComplete) {
            loginStage = game.initScene('main', 'UI_login', function() {
                console.log(loginTokenHolder);
                updateLoginFields();
                onComplete && onComplete();
            });
        },
        destroy : function() {
            var whitelist = [
                'resources/texture/UI_all.tt.png',
                'resources/texture/UI_public.tt.png'
            ];
            loginStage && loginStage.releaseResources(whitelist);
            loginStage && loginStage.destroy();
            loginStage = null;
        },
        tick : function() {
            loginStage && loginStage.tick();
            tween && tween.tick(wozllajs.Time.delta);
        },

        showLoginPanel : function(onComplete) {
            var loginObj = loginStage.findObjectByPath('UI_login.Layout.Login');
            loginObj.setActive(true);
            loginObj.getBehaviour('login.loginPageEffect').fadeIn(function() {
                onComplete && onComplete();
            });
        },

        hideLoginPanel : function(onComplete) {
            var loginObj = loginStage.findObjectByPath('UI_login.Layout.Login');
            loginObj.getBehaviour('login.loginPageEffect').fadeOut(function() {
                loginObj.setActive(false);
                onComplete && onComplete();
            });
        },

        showRegisterPanel : function(onComplete) {
            var regObj = loginStage.findObjectByPath('UI_login.Layout.Register');
            regObj.setActive(true);
            regObj.getBehaviour('base.alert').alert(onComplete);
        },

        hideRegisterPanel : function(onComplete) {
            var regObj = loginStage.findObjectByPath('UI_login.Layout.Register');
            regObj.getBehaviour('base.alert').close(function() {
                regObj.setActive(false);
                onComplete && onComplete();
            });
        },

        showServerListPanel : function(serverListData, onComplete) {
            var serverListObj = loginStage.findObjectByPath('UI_login.Layout.ServerList');
            var listContainerObj = serverListObj.getObjectById('List');
            var i, len;
            listContainerObj.removeAll(true);
            for(i=0,len=serverListData.serverLists.length; i<len; i++) {
                listContainerObj.addObject(createServerItemGameObject(serverListData.serverLists[i]));
            }
            listContainerObj.layout();
            serverListObj.setActive(true);
            serverListObj.getBehaviour('login.serverListEffect').alert(onComplete);
            selectedServer = null;
        },

        hideServerListPanel : function(onComplete) {
            var serverListObj = loginStage.findObjectByPath('UI_login.Layout.ServerList');
            serverListObj.setActive(true);
            serverListObj.getBehaviour('login.serverListEffect').close(function() {
                serverListObj.setActive(false);
                onComplete && onComplete();
            });
        },

        showMainPlayerSelect : function(onComplete) {
            var mainPlayerSelectObj = loginStage.findObjectByPath('UI_login.Layout.MainPlayerSelect');
            loginStage.findObjectByPath('UI_login.Layout.CityBG').getBehaviour('login.cloudEffect').zoomout(function() {
                setTimeout(function() {
                    onComplete && onComplete();
                }, 300);
            });
            mainPlayerSelectObj.setActive(true);
            mainPlayerSelectObj.getBehaviour('login.mainPlayerSelectEffect').zoomout();
        },

        hideMainPlayerSelect : function(onComplete) {
            var mainPlayerSelectObj = loginStage.findObjectByPath('UI_login.Layout.MainPlayerSelect');
            loginStage.findObjectByPath('UI_login.Layout.CityBG').getBehaviour('login.cloudEffect').zoomin(function() {
                onComplete && onComplete();
            });
            mainPlayerSelectObj.getBehaviour('login.mainPlayerSelectEffect')
                .zoomin(function() {
                    mainPlayerSelectObj.setActive(false);
                });
        }
    }

})();