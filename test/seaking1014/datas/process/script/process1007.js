// TODO request accept task to server
Touch.disable();
npcControl.symbolNpc('NPC0101', null);
taskControl.tipsReward({
    onHide : function() {
        Touch.enable();
        process.next('dialogue/process6');
    }
});
