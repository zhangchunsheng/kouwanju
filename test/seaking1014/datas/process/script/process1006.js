process.updateTaskProcess('MainLine', process.id);
playerControl.autoFindingTo({ x : 3680, y: 1066, mapId: 'City_fresh_village' }, function() {
    process.updateTaskProcess('MainLine', process.id);
    process.next('dialogue/process5_1');
});