var playerControl = (function() {

    var EA = wozllajs.EventAdmin;

    var playerStage;
    var working = true;
    var autoFinding = false;

    var doCollision = true;

    var clickBanEffectShowTimer;

    EA.on('player.touchToMove', function(e) {
        var clickEffectObj = playerControl.getClickEffect();
        var clickBanEffectObj = playerControl.getClickBanEffect();
        var endPoint = e.end;
        clickBanEffectShowTimer && clearTimeout(clickBanEffectShowTimer);
        if(e.walkable) {
            clickEffectObj.getRenderer().play('play', 'null');
            clickEffectObj.transform.x = endPoint.x;
            clickEffectObj.transform.y = endPoint.y;
        } else {
            clickBanEffectObj.setActive(true);
            clickBanEffectObj.transform.x = endPoint.x;
            clickBanEffectObj.transform.y = endPoint.y;
            clickBanEffectObj.getBehaviour('player.clickBanEffectAnimation').play();
        }
        playerControl.cancelAutoFinding();
    });

    EA.on('map.loaded', function() {
        playerControl.resumeCollision();
    });

    return {

        initPlayer : function(onComplete) {
            playerStage = game.initScene('main', 'MainPlayer', function() {
                playerControl.getClickEffect().getRenderer().stop();
                playerControl.getClickBanEffect().setActive(false);
                onComplete && onComplete();
            });
            playerStage.autoClear = false;
        },

        setWorking : function(flag) {
            working = flag;
            playerControl.getPlayerObject().setActive(working);
        },

        getCurrentPosition : function() {
            var trans = playerControl.getPlayerObject().transform;
            return {
                x : trans.x,
                y : trans.y
            };
        },

        setPlayerPosition : function(x, y) {
            var trans = playerControl.getPlayerObject().transform;
            trans.x = x;
            trans.y = y;
        },

        getPlayerObject : function() {
            return playerStage.getObjectById('Player');
        },

        getClickEffect : function() {
            return playerStage.getObjectById('ClickEffect');
        },

        getClickBanEffect : function() {
            return playerStage.getObjectById('ClickBanEffect');
        },

        isCollision : function() {
            return doCollision;
        },

        suspendCollision : function() {
            doCollision = false;
        },

        resumeCollision : function() {
            doCollision = true;
        },

        stopMovement : function(nofity) {
            playerStage.findObjectById('Player').getBehaviour('player.movement').stop();
            if(autoFinding) {
                autoFinding = false;
                nofity && EA.notify('player.autoFinding.cancel');
            }
        },

        setFollow : function(follow) {
            playerStage.findObjectById('Player').getBehaviour('player.cameraFollow').setFollow(follow);
        },

        cancelAutoFinding : function(stop) {
            if(autoFinding) {
                stop && playerStage.findObjectById('Player').getBehaviour('player.movement').stop();
                autoFinding = false;
                EA.notify('player.autoFinding.cancel');
            }
        },

        autoFindingTo : function(pos, onComplete) {
            var success = playerControl.walkTo(pos, function(flag) {
                autoFinding = false;
                EA.notify('player.autoFinding.end');
                onComplete && onComplete(flag);
            });
            if(success) {
                autoFinding = true;
                EA.notify('player.autoFinding.start');
            } else {
                EA.notify('player.autoFinding.fail');
            }
            return success;
        },

        walkTo : function(pos, onComplete) {
            if(pos.mapId && pos.mapId !== mapControl.getCurrentMapId()) {
                return false;
            }
            var result = mapControl.findPath(playerControl.getCurrentPosition(), pos);
            var path = result.path;
            if(!path) {
                onComplete && onComplete(false);
                return false;
            }
            playerControl.getPlayerObject().getBehaviour('player.movement').moveByPath(path, onComplete);
            return true;
        }

    };

})();