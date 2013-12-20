var game = {};

game.loadSceneData = function(scene, onComplete) {
    var src = 'scenes/' + scene + '.sn';
    wozllajs.Ajax.getJSON(src, function(data) {
        onComplete && onComplete(data);
    });
};

game.initScene = function(canvasId, sceneId, onComplete) {
    var canvas = document.getElementById(canvasId);
    var stage = new wozllajs.Stage(sceneId, canvas, canvas.width, canvas.height);
    game.loadSceneData(sceneId, function(sceneData) {
        wozllajs.StageBuilder.buildStage(sceneData, stage);
        stage.loadResources({
            onComplete : function() {
                stage.init();
                onComplete && onComplete();
            }
        });
    });
    return stage;
};

game.emptyCallback = function(callback) {
    callback();
};

game.fadeInCallback = function(callback) {
    loadingControl.fadeIn({
        color : '#000000',
        time : 1500,
        onComplete : callback
    });
};

game.fadeOutCallback = function(callback) {
    loadingControl.fadeOut({
        time : 1500,
        onComplete : callback
    });
};

game.loadingCloseCallbcak = function(callback) {
    loadingControl.close(callback);
};

game.loadingOpenCallbcak = function(callback) {
    loadingControl.open(callback);
};

game.initPlayerCallback = function(callback) {
    playerControl.initPlayer(callback);
};

game.initCityUICallbcak = function(callback) {
    cityUIControl.initCityStage(callback);
};

game.templateLoadScene = function(sceneId, playerPosition, onComplete, loadingFunc,
                                  initPlayerFunc, initCityUIFunc, loadingOpenFunc) {

    if(typeof playerPosition === 'function') {
        onComplete = playerPosition;
        playerPosition = null;
    }

    loadingFunc(function() {
        initPlayerFunc(function() {
            initCityUIFunc(function() {
                mapControl.loadMap(sceneId, function() {
                    var playerObj = playerControl.getPlayerObject();
                    mapControl.addPlayer(playerObj);
                    if(playerPosition) {
                        playerObj.transform.x = playerPosition.x;
                        playerObj.transform.y = playerPosition.y;
                    }
                    loadingOpenFunc(onComplete);
                });
            });
        });
    });

};


game.fadeToScene = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.fadeInCallback, game.emptyCallback, game.emptyCallback, game.fadeOutCallback);
};

game.fadeToSceneWithPlayer = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.fadeInCallback, game.initPlayerCallback, game.emptyCallback, game.fadeOutCallback);
};

game.fadeToSceneWithCity = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.fadeInCallback, game.emptyCallback, game.initCityUICallbcak, game.fadeOutCallback);
};

game.fadeToSceneWithCityAndPlayer = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.fadeInCallback, game.initPlayerCallback, game.initCityUICallbcak, game.fadeOutCallback);
};

game.loadingToScene = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.loadingCloseCallbcak, game.emptyCallback, game.emptyCallback, game.loadingOpenCallbcak);
};

game.loadingToSceneWithPlayer = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.loadingCloseCallbcak, game.initPlayerCallback, game.emptyCallback, game.loadingOpenCallbcak);
};

game.loadingToSceneWithCity = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.loadingCloseCallbcak, game.emptyCallback, game.initCityUICallbcak, game.loadingOpenCallbcak);
};

game.loadingToSceneWithCityAndPlayer = function(sceneId, playerPosition, onComplete) {
    game.templateLoadScene(sceneId, playerPosition, onComplete,
        game.loadingCloseCallbcak, game.initPlayerCallback, game.initCityUICallbcak, game.loadingOpenCallbcak);
};

