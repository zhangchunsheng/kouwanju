playerControl.autoFindingTo({ x : 2497, y: 263, mapId : 'City_fresh_village' });
process.updateTaskProcess('MainLine', process.id);
if(!process.context.executed) {
    process.context.executed = true;

    function mapLoaded(e) {
        if(e.mapId === 'Ins_HaiYangLuDi') {
            process.off('map.loaded', mapLoaded);
            function collide(e) {
                if(e.target.id === 'process1003') {
                    Player.stopMovement();
                    process.off('player.collide', collide);
                    process.next('dialogue/process4');
                }
            }
            process.on('player.collide', collide);
            npcControl.showNpc('NPC0103');
            npcControl.symbolNpc('NPC0103', '?');
        }
    }

    process.on('map.loaded', mapLoaded);
}