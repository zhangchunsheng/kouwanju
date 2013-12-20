Touch.disable();

Player.walkTo({ x: 2620, y: 408 }, function() {
    Touch.enable();
    process.next('dialogue/process5');
});
