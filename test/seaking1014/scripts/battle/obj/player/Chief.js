/**
 * 1. 怒气buff
 * 2. 头顶buff
 * 3. 攻击特效
 * 4. 技能特效
 * 5. 闪避特效
 */

if(window.IDE) {
    IDE.ComponentRegistry.register('battle.Chief', []);
}

wozllajs.defineComponent('battle.Chief', {

    extend : 'battle.ShortRangeBattleObject',

    alias : 'battle.object',

    thisPos : null,
    targetPos : null,
    centerPos : null,

    onStageInit : function() {
        var me = this;
        this.addAnimationListener('go', 'indexchanged', function(e) {
            switch(e.index) {
                case 0 : me.setPosition(me.thisPos); break;
                case 1 : me.setPosition(me.targetPos); break;
            }
        });
        this.addAnimationListener('comeback', 'indexchanged', function(e) {
            switch(e.index) {
                case 0 : me.setPosition(me.targetPos); break;
                case 1 : me.setPosition(me.thisPos); break;
            }
        });
    },

    attackTemplate : function(targetBattleObject, battleUnit, onComplete, params) {
        var me = this;
        var completeFlag;
        var comboTargetHP = [].concat(battleUnit.targetComboHP || [battleUnit.targetHP]);
        var thisStandPos = this.getStandPosition();
        var thisPos = this.getStandPosition();
        var targetPos = targetBattleObject.getStandPosition();

        if(this.camp === 'player') {
            targetPos.y += 40;
            targetPos.x -= parseInt(40 * this.sqrt3);
            var dir = {
                x : targetPos.x - thisPos.x,
                y : targetPos.y - thisPos.y
            };
            dir.x = dir.x/dir.y;
            dir.y = 1;
            thisPos.y -= 10;
            thisPos.x -= parseInt(10 * dir.x);
        }
        this.thisPos = thisPos;
        this.targetPos = targetPos;
        this.centerPos = {
            x : (targetPos.x + thisPos.x)/2,
            y : (targetPos.y + thisPos.y)/2
        };

        completeFlag = 0 - params.hitPoint.length;
        function checkComplete() {
            completeFlag++;
            if(completeFlag > 0) {
                onComplete && onComplete();
            }
        }

        me.playEffectAt('go_effect', this.thisPos);
        me.playAnimation('go', function() {
            me.setPosition(me.targetPos);
            function indexChanged(e) {
                var hasNextHitPoint;
                if(e.index === params.hitPoint[0]) {
                    params.hitPoint.shift();
                    if(params.hitPoint.length === 0) {
                        me.removeAnimationListener(params.attackAction, 'indexchanged', indexChanged);
                    }
                    if(battleUnit.targetAction === 'hit') {
                        targetBattleObject.hit(battleUnit, comboTargetHP.shift(), checkComplete, true);
                    }
                }
            }
            me.addAnimationListener(params.attackAction, 'indexchanged', indexChanged);
            me.playAnimation(params.attackAction, function() {
                me.playAnimation('comeback', function() {
                    me.setPosition(thisStandPos);
                    me.playAnimation('stand', null, 'stand');
                    checkComplete && checkComplete();
                });
            });
        });
    },

    normalAttack : function(targetBattleObject, battleUnit, onComplete) {
        this.attackTemplate(targetBattleObject, battleUnit, onComplete, {
            hitPoint : [9],
            attackAction : 'attack'
        });
    },


    skillAttack : function(targetBattleObject, battleUnit, onComplete) {
        this.attackTemplate(targetBattleObject, battleUnit, onComplete, {
            hitPoint : [11,14,18],
            attackAction : 'skill'
        });
    }

});