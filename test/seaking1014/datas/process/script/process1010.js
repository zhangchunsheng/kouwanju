Touch.disable();
Player.setFollow(false);
Camera.move({ x : -280, y : 400, onComplete : function() {
    taskControl.nextTask('MainLine', function() {
        taskControl.tipsAcceptTask(function() {
            console.log('task');
            Touch.enable();
            Player.setFollow(true);
            process.next('script/process1011.js');
        });
    });
}});
