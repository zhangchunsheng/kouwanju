function collide(e) {
    if(e.target.id === 'process1009') {
        Player.stopMovement();
        process.off('player.collide', collide);
        Touch.disable();
        Player.setFollow(false);
        Camera.move({x : 280, y : -400, onComplete : function() {
            Touch.enable();
            process.next('dialogue/process8');
        }});
    }
}
process.on('player.collide', collide);

