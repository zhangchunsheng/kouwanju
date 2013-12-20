var tipsWindowControl = (function() {

    var tipsWindowStage;
    var tipsWin;

    var tween;
    var tweenWorking = false;
    var hideTimer;

    function updateContent(params) {
    }

    function doAlert(params) {
        hideTimer && clearTimeout(hideTimer);
        tipsWin.transform.y = 680;
        tipsWin.transform.alpha = 0;
        tween = createjs.Tween.get(tipsWin.transform).to({alpha:1, y:370}, 500, createjs.Ease.getPowOut(4)).call(function() {
            params.onComplete && params.onComplete();
            tweenWorking = false;
        });
        tweenWorking = true;
        hideTimer = setTimeout(function() {
            hideTimer = null;
            tipsWindowControl.close(params.onHide);
        }, params.time || 2000);
        updateContent(params);
    }

    return {

        alert : function(params) {
            tipsWindowStage = game.initScene('main', 'UI_tipsWindow', function() {
                tipsWin = tipsWindowStage.getObjectById('UI_tipsWin');
                doAlert(params);
            });
        },

        close : function(onClose) {
            tween = createjs.Tween.get(tipsWin.transform).to({alpha:0, y: 680}, 500, createjs.Ease.getPowOut(4)).call(function() {
                tweenWorking = false;
                tipsWindowStage && tipsWindowStage.destroy();
                tipsWindowStage = null;
                tipsWin = null;
                onClose && onClose();
            });
            tweenWorking = true;
        },

        tick : function() {
            tween && tween.tick(wozllajs.Time.delta);
            if(!tweenWorking) {
                tween = null;
            }
            tipsWindowStage && tipsWindowStage.tick();
        }
    }
})();