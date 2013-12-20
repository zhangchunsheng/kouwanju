(function() {

    var EA = wozllajs.EventAdmin;

    var TaskContext = function(catagory) {
        this.catagory = catagory;
        this.task = null;
        this.process = null;
    };

    TaskContext.prototype = {
        hasTask : function() {
            return !!this.task;
        },
        updateTask : function(task, lastTime) {
            this.task = task;
            if(lastTime) {
                this.process = localStorage.getItem('task.' + this.catagory + '.process') || task.startProcess;
            } else {
                this.process = task.startProcess;
            }
        },
        updateProgress : function(progress) {
            this.process = progress;
        },
        save : function() {
            localStorage.setItem('task.' + this.catagory + '.process', this.process);
        },
        exec : function() {
            game.Process.exec(this.process);
        }
    };

    game.TaskContext = TaskContext;

})();