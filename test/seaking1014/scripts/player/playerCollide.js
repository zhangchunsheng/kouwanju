(function() {

    var EA = wozllajs.EventAdmin;

    EA.on('player.collide', function(e) {
        if(!playerControl.isCollision()) {
            return;
        }
        var target = e.target;
        var id = e.target.id;
        if(id === 'Ins_Exit') {
            playerControl.suspendCollision();
            playerControl.stopMovement();
            game.loadingToScene(mapControl.getLastMapId());
        }
        else if(id.indexOf('Ins_') === 0) {
            playerControl.suspendCollision();
            playerControl.stopMovement();
            game.loadingToScene(id);
        }
        else if(id.indexOf('Monster') === 0) {
            playerControl.suspendCollision();
            playerControl.stopMovement();
            loadingControl.templateAlert('加载战斗中...', function(close) {
                client.battle({}, function(battleData) {
                    battleControl.initBattle(battleData, function() {
                        close();
                    });
                });
            }, function() {
                target.setActive(false);
                target.delayRemove();
                playerControl.resumeCollision();
                battleControl.startBattle();
                console.log('fight');
            });
        }
    });

})();