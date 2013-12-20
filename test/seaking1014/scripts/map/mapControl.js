var mapControl = (function() {

    var RM = wozllajs.ResourceManager;
    var EA = wozllajs.EventAdmin;
    var Ajax = wozllajs.Ajax;
    var working = true;
    var lastMapId;
    var currentMapId;
    var currentMapStage;

    var path;
    var crossMeshCollider;
    var drawPath = false;
    var drawCross = false;


    function doLoadMap(mapId, onComplete) {
        var gameObj, clickEffect, clickBanEffect;
        var canvas = document.getElementById('main');
        var crossSrc = 'resources/map/' + mapId + '/cross.json';
        var collisionSrc = 'resources/map/' + mapId + '/mesh.json';
        if(currentMapStage) {
            mapControl.removePlayer();
            currentMapStage.destroy();
            currentMapStage.releaseResources();
            lastMapId = currentMapId;
        }
        crossMeshCollider = null;
        path = null;

        function buildMap() {
            var stage = game.initScene('main', mapId, function() {
                currentMapStage = stage;
                currentMapId = mapId;
                EA.notify('map.loaded', { mapId : mapId });
                onComplete && onComplete();
            });
            stage.autoClear = true;
        }

        if(!gameConfig.specialScenes[mapId]) {
            Ajax.getJSON(crossSrc, function(data) {
                if(!data.fail) {
                    crossMeshCollider = wozllajs.createComponent('collider.mesh', {
                        datas : data
                    });
                    crossMeshCollider.initComponent();
                }
                Ajax.getJSON(collisionSrc, function(data) {
                    if(!data.fail) {
                        var start = Date.now();
                        path = new game.Path(data, true);
                        console.log('buildPath time: ' + (Date.now()-start));
                    }
                    buildMap();
                });
            });
        } else {
            buildMap();
        }
    }

    return {

        getLastMapId : function() {
            return lastMapId;
        },

        getCurrentMapId : function() {
            return currentMapId;
        },

        getCurrentMapStage : function() {
            return currentMapStage;
        },

        getSize : function() {
            return currentMapStage.findObjectById('Map').getRenderer().getSize();
        },

        loadMap : function(mapId, onComplete) {
            if(mapId.indexOf('Ins_') === 0) {
                client.enterIndu({
                    induId : 'Ins10101'
                }, function(data) {
                    doLoadMap(mapId, onComplete);
                });
            } else {
                doLoadMap(mapId, onComplete);
            }
        },

        addPlayer : function(playerObj) {
            var pos = playerPosition[currentMapId];
            if(pos) {
                playerObj.transform.x = pos.x;
                playerObj.transform.y = pos.y;
            }
            var playerLayer = currentMapStage.findObjectById('PlayerLayer');
            playerLayer && playerLayer.addObject(playerObj);
            var mapLayer = currentMapStage.findObjectById('Map');
            mapLayer && mapLayer.addObject(playerControl.getClickEffect());
            mapLayer && mapLayer.addObject(playerControl.getClickBanEffect());
        },

        removePlayer : function() {
            gameObj = currentMapStage.findObjectById('Player');
            if(gameObj) {
                gameObj.remove();
                playerControl.getClickEffect().remove();
                playerControl.getClickBanEffect().remove();
            }
        },

        findPath : function(startPoint, endPoint, findWalkable) {
            return path.find(startPoint, endPoint, findWalkable);
        },

        isCross : function(x, y) {
            if(crossMeshCollider) {
                return crossMeshCollider.isPointIn(x, y);
            }
            return false;
        },

        tick : function() {
            if(working && currentMapStage) {
                currentMapStage.tick();
                currentMapStage.stageContext.save();
                currentMapStage.transform.updateContext(currentMapStage.stageContext);
                if(drawPath && path) {
                    path.draw && path.draw(currentMapStage.stageContext);
                }
                if(drawCross && crossMeshCollider) {
                    crossMeshCollider.draw && crossMeshCollider.draw(currentMapStage.stageContext);
                }
                currentMapStage.stageContext.restore();
            }
        }

    };

})();