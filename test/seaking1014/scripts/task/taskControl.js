/**
 *
 HANDOVERED: 5,
 COMPLETED: 4,
 CANNOT_ACCEPT: 3,
 NOT_COMPLETED: 2, doing
 START_TASK: 1,
 NOT_START: 0, acceptable

 *
 * localStorage :
 *    task.MaineLine.process
 *    task.Branch.process
 *    task.Dailly.process
 *    task.Activity.process
 *
 */
var taskControl = (function() {

    var RM = wozllajs.ResourceManager;
    var EA = wozllajs.EventAdmin;
    var taskWinStage;
    var taskContextMap = {
        'MainLine' : new game.TaskContext('MainLine'),
        'Branch' : new game.TaskContext('Branch'),
        'Dailly' : new game.TaskContext('Dailly'),
        'Activity' : new game.TaskContext('Activity')
    };

    EA.on('TaskButton.click', function() {
        taskControl.openWindow();
    });

    EA.on('TaskCloseButton.click', function() {
        taskControl.closeWindow();
        cityUIControl.tipsTask(false);
    });

    EA.on('MainLineBtn.click', function() {
        taskControl.execTask('MainLine');
        taskControl.closeWindow();
    });


    function getTaskById(id, onComplete) {
        wozllajs.Ajax.getJSON('datas/task/' + id + '.json', onComplete);
    }

    function initTaskContext(catagory, serverTask, onComplelte) {
        if(!serverTask) return;
        getTaskById(serverTask.taskId, function(task) {
            if(task.fail) {
                return;
            }
            task.status = serverTask.status;
            taskContextMap[catagory].updateTask(task, true);
            onComplelte && onComplelte();
        });
    }

    function updatedTaskStatus(catagory, status) {

    }

    function updateTaskTextByCatagory(catagory) {
        var taskObjId = catagory;
        var taskObj = taskWinStage.findObjectById(taskObjId);
        var taskContext = taskContextMap[catagory];
        if(!taskContext.hasTask()) {
            taskObj.setActive(false);
        } else {
            var statusTextIndexMap = {
                0 : [11, 12],
                1 : [17, 18],
                2 : [17, 18],
                3 : [13, 13],
                4 : [4, 5]
            };
            var statusTextMap = {
                0 : "acceptable",
                1 : "doing",
                2 : "doing",
                3 : "unacceptable",
                4 : 'finish',
                5 : 'commit'
            };
            var status = taskContext.task.status;
            console.log(status);
            var statusText = statusTextMap[status];
            var frameIndex = statusTextIndexMap[taskContext.task.status];
            taskObj.setActive(true);
            taskObj.getObjectById('Name').getRenderer().text = taskContext.task.name;
            taskObj.getObjectById('Description').getRenderer().text = taskContext.task[statusText + 'Desc'];
            taskObj.getObjectById('Reward').getRenderer().text = taskContext.task.reward;
            taskObj.getObjectById('Btn').getRenderer().changeTextureFrameIndex(frameIndex[0], frameIndex[1]);
        }
    }

    function updateTaskText() {
        if(!taskWinStage) return;
        updateTaskTextByCatagory('MainLine');
        updateTaskTextByCatagory('Branch');
        updateTaskTextByCatagory('Dailly');
        updateTaskTextByCatagory('Activity');
        taskWinStage.layout();
    }

    return {

        initWindow : function(onComplete) {
            taskWinStage = game.initScene('main', 'UI_task', function() {
                updateTaskText();
                onComplete && onComplete();
            });
        },

        execTask : function(catagory) {
            taskContextMap[catagory].exec();
        },

        initTaskContext : function(taskData) {
            // init model
            initTaskContext('MainLine', taskData.MainLine);
            initTaskContext('Branch', taskData.Branch);
            initTaskContext('Dailly', taskData.Dailly);
            initTaskContext('Activity', taskData.Activity);
        },

        updateTaskStatus : function(catagory, status) {
            taskControl.getCurrentTaskContext(catagory).task.status = status;
            updateTaskText();
        },

        getCurrentTaskContext : function(catagory) {
            if(!catagory) {
                return taskContextMap;
            }
            return taskContextMap[catagory];
        },

        nextTask : function(catagory, onComplelte) {
            var taskContext = taskContextMap[catagory];
            var nextId = taskContext.task.next;
            var serverTask = {
                taskId : nextId,
                status : 1
            };
            initTaskContext(catagory, serverTask, onComplelte);
        },

        openWindow : function() {
            this.initWindow();
        },

        closeWindow : function() {
            taskWinStage && taskWinStage.destroy();
            taskWinStage = null;
        },

        tick : function() {
            taskWinStage && taskWinStage.tick();
        },

        tipsAcceptTask : function(onComplete) {
            cityUIControl.tipsAcceptTask(onComplete);
        },

        tipsFinishTask : function(onComplete) {
            cityUIControl.tipsFinishTask(onComplete);
        },

        tipsReward : function(params) {
            params.mode = 'reward';
            tipsWindowControl.alert(params);
        }
    }

})();