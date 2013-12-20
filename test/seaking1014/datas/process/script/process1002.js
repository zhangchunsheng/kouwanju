taskControl.updateTaskStatus('MainLine', 1);
taskControl.tipsAcceptTask(function() {
    npcControl.symbolNpc('NPC0101', '!.');
    process.next('script/process1003.js');
});