$import('process/Process.js');

game.Process.register('dialogue', {

    execute : function() {
        var me = this;
        dialogueControl.alert(this.id, this.data.dialogue);
        this.once('dialogue.close', function() {
            me.data.touch === false ? wozllajs.Touch.disable() : wozllajs.Touch.enable();
            me.next();
        });
        if(this.data.updateTaskProcess) {
            taskControl.getCurrentTaskContext(this.data.catagory)
                .updateProgress(this.data.updateProcess);
        }

    }

});