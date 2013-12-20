var battleResultControl = (function() {

    var EA = wozllajs.EventAdmin;
    var battleResultStage;

    EA.on('BattleResult.ReturnBtn.click', function() {
        battleResultControl.close(function() {
            battleControl.destroyBattle();
            battleInstResultControl.show(null);
        });
    });

    EA.on('BattleResult.ReplayBtn.click', function() {

    });

    return {


        show : function(battleResult, onComplete) {
            battleResultStage = game.initScene('main', 'UI_battle_result', function() {
                battleResultStage.getObjectById('UI_battle_result').getBehaviour('base.alert').alert(onComplete);
            });
        },

        close : function(onComplete) {
            battleResultStage.getObjectById('UI_battle_result').getBehaviour('base.alert').close(function() {
                battleResultStage.destroy();
                battleResultStage = null;
                onComplete && onComplete();
            });
        },

        tick : function() {
            battleResultStage && battleResultStage.tick();
        }
    }

})();