var battleInstResultControl = (function() {

    var EA = wozllajs.EventAdmin;
    var battleInstResultStage;

    EA.on('InstResult.SureBtn.click', function() {
        battleInstResultControl.close(function() {
        });
    });

    EA.on('InstResult.ShareBtn.click', function() {

    });

    return {

        show : function(battleResult, onComplete) {
            battleInstResultStage = game.initScene('main', 'UI_inst_result', function() {
                battleInstResultStage.getObjectById('UI_inst_result').getBehaviour('base.alert').alert(function() {
                    setTimeout(function () {
                        var titleBGObj = battleInstResultStage.findObjectByPath('UI_inst_result.TitleBG');
                        titleBGObj.getObjectById('Star1').callBehaviour('animate');
                        setTimeout(function() {
                            titleBGObj.getObjectById('Star2').callBehaviour('animate');
                        }, 400);
                        onComplete && onComplete();
                    }, 400);
                });
            });
        },

        close : function(onComplete) {
            battleInstResultStage.getObjectById('UI_inst_result').getBehaviour('base.alert').close(function() {
                battleInstResultStage.destroy();
                battleInstResultStage = null;
                onComplete && onComplete();
            });
        },

        tick : function() {
            battleInstResultStage && battleInstResultStage.tick();
        }
    }

})();