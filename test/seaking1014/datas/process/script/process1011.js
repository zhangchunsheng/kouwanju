function npcTalk(e) {
    if(e.npcId === 'NPC0000') {
        process.off('npc.talk', npcTalk);
        process.next('dialogue/process9');
    }
}
process.on('npc.talk', npcTalk);