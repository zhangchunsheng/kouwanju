npcControl.hideNpc('NPC0103');

function loadingOpen() {
    var mapId = mapControl.getCurrentMapId();
    if(mapId = 'City_fresh_village') {
        process.off('loading.open', loadingOpen);
        npcControl.symbolNpc('NPC0101', '!');
        process.next('script/process1006.js');
    }
}

process.on('loading.open', loadingOpen);
taskControl.updateTaskStatus('MainLine', 4);
taskControl.tipsFinishTask();

