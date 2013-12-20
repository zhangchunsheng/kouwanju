npcControl.symbolNpc('NPC0101', '!');
process.updateTaskProcess('MainLine', process.id);
playerControl.autoFindingTo({ x : 3680, y: 1066, mapId: 'City_fresh_village' }, function() {
    npcTalk({ npcId : 'NPC0101' });
});

function npcTalk(e) {
    if(e.npcId === 'NPC0101') {
        process.off('npc.talk', npcTalk);
        process.next('dialogue/process10');
    }
}
process.on('npc.talk', npcTalk);
