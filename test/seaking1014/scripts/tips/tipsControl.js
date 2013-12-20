var tipsControl = (function() {

    var EA = wozllajs.EventAdmin;

    var tipsStage;
    var tween;
    var tweenWorking = false;
    var hideTimer;

    EA.on('player.autoFinding.start', function() {
        tipsControl.tipsText('开始自动寻路');
    });

    EA.on('player.autoFinding.end', function() {
        tipsControl.tipsText('自动寻路完成');
    });

    EA.on('player.autoFinding.fail', function() {
        tipsControl.tipsText('自动寻路失败');
    });

    EA.on('player.autoFinding.cancel', function() {
        tipsControl.tipsText('取消自动寻路');
    });

    function doTips(text, time) {
        hideTimer && clearTimeout(hideTimer);
        tipsStage.findObjectById('Text').getRenderer().text = text;
        tipsStage.transform.alpha = 0;
        tween = createjs.Tween.get(tipsStage.transform).to({alpha:1}, 500).call(function() {
            tweenWorking = false;
        });
        tweenWorking = true;
        hideTimer = setTimeout(function() {
            hideTimer = null;
            tipsControl.hide();
        }, time || 2400);
    }

    return {

        tipsText : function(text, time) {
            //TODO queue tips
            if(tipsStage) {
                doTips(text, time);
                return;
            }
            tipsStage = game.initScene('main', 'UI_tips', function() {
                doTips(text, time);
            });
            tipsStage.autoClear = false;
        },

        hide : function() {
            if(!tipsStage) {
                return;
            }
            tween = createjs.Tween.get(tipsStage.transform).to({alpha:0}, 500).call(function() {
                tweenWorking = false;
                tipsStage && tipsStage.destroy();
                tipsStage = null;
            });
            tweenWorking = true;
        },

        tick : function() {
            tween && tween.tick(wozllajs.Time.delta);
            if(!tweenWorking) {
                tween = null;
            }
            tipsStage && tipsStage.tick();
        }
    }
})();