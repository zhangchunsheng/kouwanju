if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.PointCollideEventDispatcher', []);
}

wozllajs.defineComponent('player.component.PointCollideEventDispatcher', {

    extend : 'Behaviour',

    alias : 'player.pointCollideEventDispatcher',

    update : function() {
        if(!this.gameObject.isActive(true) || !this.gameObject.isVisible(true)) {
            return;
        }
        var i, len, collider, obj;
        var children = this.gameObject.getParent().getChildren();
        var trans = this.gameObject.transform;
        var pos = trans.localToGlobal(trans.regX, trans.regY);
        for(i=0,len=children.length; i<len; i++) {
            obj = children[i];
            if(obj === this.gameObject) continue;
            collider = obj.getCollider();
            if(collider && collider.isPointIn && collider.isPointIn(pos.x, pos.y)) {
                this.notify('player.collide', {
                    target : obj,
                    playerPosition : pos
                });
            }
        }
    }

});