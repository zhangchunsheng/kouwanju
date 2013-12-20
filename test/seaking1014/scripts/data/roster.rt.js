(function() {

    var EA = wozllajs.EventAdmin;

    EA.once('data.load', function(e) {
        client.getMainPlayer(function(data) {
            // TODO init

            cityUIControl.initMainPlayerInfo(data.player);

            // task init
            taskControl.initTaskContext({
                MainLine : data.player.curTasks.currentMainTask,
                Branch : data.player.curTasks.currentBranchTask,
                Dailly : data.player.curTasks.currentDayTask,
                Activity : data.player.curTasks.currentExerciseTask
            });

            attrControl.initAttr({
                attack : data.player.attack,
                defense : data.player.defense,
                speed : data.player.speed,
                focus : data.player.focus,
                criticalHit : data.player.criticalHit,
                counter : data.player.counter,
                block : data.player.block,
                dodge : data.player.dodge
            });

            EA.notify('data.ready');
        });

    });

})();