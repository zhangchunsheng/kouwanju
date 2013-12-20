var popupControl = (function() {

    var EA = wozllajs.EventAdmin;

    var popupStage;
    var noticeTimer;

    EA.on('Popup.Notice.click', function() {
        closeNotice();
    });

    function closeNotice() {
        popupStage.findObjectByPath('UI_popup.Notice').getBehaviour('base.alert').close();
    }

    function notice(text, time) {
        noticeTimer && clearTimeout(noticeTimer);
        popupStage.findObjectByPath('UI_popup.Notice.Text').getRenderer().text = text;
        popupStage.findObjectByPath('UI_popup.Notice').getBehaviour('base.alert').alert();
        noticeTimer = setTimeout(function() {
            noticeTimer = null;
            closeNotice();
        }, time || 1500);
    }

    return {

        notice : function(text, time) {
            //TODO queue tips
            if(popupStage) {
                notice(text, time);
                return;
            }
            popupStage = game.initScene('main', 'UI_popup', function() {
                notice(text, time);
            });
        },

        tick : function() {
            popupStage && popupStage.tick();
        }
    }
})();