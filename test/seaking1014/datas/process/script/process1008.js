game.fadeToScene('Ins_HaiYangGaoDi1', function() {
    npcControl.showNpc('NPC0000');
    npcControl.symbolNpc('NPC0000', '!');
    process.next('dialogue/process7');
});