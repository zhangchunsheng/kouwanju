if(window.IDE) {
    IDE.ComponentRegistry.register('battle.M10101', []);
}

wozllajs.defineComponent('battle.M10101', {

    extend : 'battle.LongRangeBattleObject',

    alias : 'battle.object',

    normalAttack : function(targetBattleObject, battleUnit, onComplete) {
        var me = this;
        var completeFlag = -1;
        var targetPos = targetBattleObject.getStandPosition();

        function checkComplete() {
            completeFlag++;
            if(completeFlag > 0) {
                onComplete && onComplete();
            }
        }
        me.playAnimation('attack', function() {
            me.playAnimation('stand', null, 'stand');
        });
        function indexChanged(e) {
            if(e.index === 9) {
                me.removeAnimationListener('attack', 'indexchanged', indexChanged);
                me.playEffectAt('attack_effect', targetPos, checkComplete);
                if(battleUnit.targetAction === 'hit') {
                    targetBattleObject.hit(battleUnit, battleUnit.targetHP, checkComplete, true);
                }
            }
        }
        me.addAnimationListener('attack', 'indexchanged', indexChanged);
    },


    skillAttack : function(targetBattleObject, battleUnit, onComplete) {

    }

});