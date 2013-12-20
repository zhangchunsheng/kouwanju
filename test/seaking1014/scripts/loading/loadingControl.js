var loadingControl = (function() {

    var EA = wozllajs.EventAdmin;

    var loadingStage;
    var pureColorLoader;
    var openCloseBehaviour;
    var smallLoadingBehaviour;
    var working = true;

    return {

        initStage : function(onComplete) {
            loadingStage = game.initScene('main', 'UI_loading', function() {
                pureColorLoader = loadingStage.findObjectById('PureColorLoading').getBehaviour('loading.pureColorLoader');
                openCloseBehaviour = loadingStage.findObjectById('ImageLoading').getBehaviour('loading.openClose');
                smallLoadingBehaviour = loadingStage.findObjectById('SmallLoading').getBehaviour('base.alert');
                onComplete && onComplete();
            });
        },

        getLoadingStage : function() {
            return loadingStage;
        },

        tick : function() {
            if(loadingStage && working) {
                loadingStage.tick();
            }
        },

        templateAlert : function(text, onAlert, onClose) {
            loadingControl.alert({
                text : text,
                onComplete : function() {
                    onAlert(function(data) {
                        setTimeout(function() {
                            loadingControl.closeAlert({
                                onComplete : function() {
                                    onClose(data);
                                }
                            });
                        }, 500);
                    });
                }
            });
        },

        alert : function(params) {
            wozllajs.Touch.disable();
            loadingStage.findObjectByPath('Loading.SmallLoading.Text').getRenderer().text = params.text || 'loading...';
            loadingStage.findObjectByPath('Loading.SmallLoading').setActive(true);
            loadingStage.findObjectByPath('Loading.ColorLayer').setActive(true);
            setTimeout(function() {
                smallLoadingBehaviour.alert(function() {
                    wozllajs.Touch.enable();
                    params.onComplete && params.onComplete();
                });
            }, 300);
        },

        closeAlert : function(params) {
            wozllajs.Touch.disable();
            if(typeof params === 'function') {
                params = {
                    onComplete: params
                };
            }
            smallLoadingBehaviour.close(function() {
                setTimeout(function() {
                    loadingStage.findObjectByPath('Loading.ColorLayer').setActive(false);
                    loadingStage.findObjectByPath('Loading.SmallLoading').setActive(false);
                    wozllajs.Touch.enable();
                    params.onComplete && params.onComplete();
                }, 300);
            });
        },

        fadeIn : function(param) {
            wozllajs.Touch.disable();
            pureColorLoader.close(param)
        },

        fadeOut : function(param) {
            var originOnComplete = param.onComplete;
            param.onComplete = function() {
                wozllajs.Touch.enable();
                originOnComplete  && originOnComplete();
                EA.notify('loading.open');
            };
            pureColorLoader.open(param);
        },

        close : function(onClose) {
            wozllajs.Touch.disable();
            openCloseBehaviour.close(onClose);
        },

        open : function(onOpen) {
            openCloseBehaviour.open(function() {
                wozllajs.Touch.enable();
                onOpen && onOpen();
                EA.notify('loading.open');
            });
        }
    }

})();