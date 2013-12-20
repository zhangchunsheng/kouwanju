var gameControl = (function() {

    var EA = wozllajs.EventAdmin;

    function onDataReady() {
        console.log('data ready');
        loadingControl.close(function() {
            loginControl.destroy();
            // 第一次游戏
            if(gameConfig.test) {
                playerControl.initPlayer(function() {
                    mapControl.loadMap(gameConfig.defaultScene, function() {
                        mapControl.addPlayer(playerControl.getPlayerObject());
                        cityUIControl.initCityStage(function() {
                            loadingControl.open();
                        });
                    });
                });
                return;
            }
            if(!localStorage.getItem('player.firstTimeFlag')) {
                mapControl.loadMap(gameConfig.defaultScene, function() {
                    // TODO 加载第一次战斗
                    loadingControl.open(function() {
                        gameConfig.story && game.Process.exec('dialogue/process0');
                    });
                });
            } else {
                var lastExitScene = localStorage.getItem('player.lastExitScene');
                playerControl.initPlayer(function() {
                    mapControl.loadMap(lastExitScene, function() {
                        mapControl.addPlayer(playerControl.getPlayerObject());
                        cityUIControl.initCityStage(function() {
                            loadingControl.open();
                        });
                    });
                });
            }
        });
    }

    return {

        login : function() {
            if(gameConfig.login) {
                loadingControl.initStage(function() {
                    loginControl.initLoginPage();
                });
                EA.once('user.logined', function(serverId) {
                    EA.notify('data.load');
                    EA.once('data.ready', function() {
                        onDataReady();
                    });
                });
            } else {
                client.setServerURL();
                loadingControl.initStage(function() {
                    EA.notify('data.load');
                    EA.once('data.ready', function() {
                        onDataReady();
                    });
                });
            }
        },

        tick : function() {
            mapControl.tick();
            cityUIControl.tick();
            battleControl.tick();
            battleResultControl.tick();
            battleInstResultControl.tick();
            dialogueControl.tick();
            taskControl.tick();
            mainUIControl.tick();
            shopControl.tick();
            emailControl.tick();
            chatControl.tick();
            worldmapControl.tick();
            tipsWindowControl.tick();
            loginControl.tick();
            popupControl.tick();
            loadingControl.tick();
            tipsControl.tick();
            cameraControl.tick();
        }

    };

})();