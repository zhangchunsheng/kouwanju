npcControl.hideNpc('NPC0000');

taskControl.tipsAcceptTask();

function loadingOpen() {
    var mapId = mapControl.getCurrentMapId();
    if(mapId = 'City_fresh_village') {
        process.off('loading.open', loadingOpen);
        process.next('script/process1013.js');
    }
}

process.on('loading.open', loadingOpen);