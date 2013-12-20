$import('process/Process.js');

game.Process.register('script', {

    execute : function() {
        var Touch = wozllajs.Touch;
        var Camera = cameraControl;
        var Player = playerControl;
        var process = this;
        eval(this.data);
    },

    updateTaskProcess : function(catagory, process) {
        taskControl.getCurrentTaskContext(catagory)
            .updateProgress(process);
    }

});