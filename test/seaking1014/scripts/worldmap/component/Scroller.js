if(window.IDE) {
    IDE.ComponentRegistry.register('worldmap.component.Scroller', []);
}

wozllajs.defineComponent('worldmap.component.Scroller', {

    extend : 'Behaviour',

    alias : 'worldmap.scroller',

    startX : 0,

    maxOffsetX : 0,

    initComponent : function() {
        //this.maxOffsetX = 1024 - this.gameObject.getStage().width;
        this.on('touchstart', this.onTouchStart);
        //this.on('touchmove', this.onTouchMove);
    },

    onTouchStart : function(e) {
        this.startX = e.x;
    },

    onTouchMove : function(e) {
        var x = e.x - this.startX;
        var trans = this.gameObject.transform;
        trans.x += x;
        if(trans.x < -this.maxOffsetX) {
            trans.x = -this.maxOffsetX;
        }
        if(trans.x > 0) {
            trans.x = 0;
        }
        this.startX = e.x;
    },

    destroyComponent : function() {
        //this.off('touchstart', this.onTouchStart, this);
        //this.off('touchmove', this.onTouchMove, this);
    }
});