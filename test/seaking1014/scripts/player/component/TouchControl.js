if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.TouchControl', []);
}

wozllajs.defineComponent('player.component.TouchControl', {

    extend : 'Behaviour',

    alias : 'player.control',

    limitTimer : null,

    initComponent : function() {
        this.on('touchstart', this.onClick, this);
        this.update = false;
    },

    onClick : function(e) {
        if(this.limitTimer) {
            return;
        }
        var me = this;
        var endPoint = this.gameObject.getStage().transform.globalToLocal(e.x, e.y);
        var startPoint = {
            x : this.gameObject.transform.x,
            y : this.gameObject.transform.y
        };
        var result = mapControl.findPath(startPoint, endPoint, true);
        var path = result.path;
        endPoint.x = Math.abs(endPoint.x);
        endPoint.y = Math.abs(endPoint.y);
        this.gameObject.getBehaviour('player.movement').moveByPath(path); // fix bug || [endPoint]);
        this.limitTimer = setTimeout(function() {
            me.limitTimer = null;
        }, 250);
        wozllajs.EventAdmin.notify('player.touchToMove', {
            event : e,
            start : startPoint,
            end : endPoint,
            walkable : result.walkable
        });
    }

});