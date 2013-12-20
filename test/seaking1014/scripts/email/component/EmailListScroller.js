if(window.IDE) {
    IDE.ComponentRegistry.register('email.component.EmailListScroller', []);
}

wozllajs.defineComponent('email.component.EmailListScroller', {

    extend : 'Behaviour',

    alias : 'email.scroller',

    scrollY : 0,

    sY : 0,

    tY : 0,

    pressed : false,

    actionClick : false,

    initComponent : function() {
        this.gameObject.cache(0, 0, 400, 470);
        this.on('touchstart', this.onTouchStart, this);
        this.on('touchmove', this.onTouchMove, this);
        this.on('touchend', this.onTouchEnd, this);
        this.on('click', this.onClick, this);
    },

    onTouchStart : function(e){
        this.actionClick = true;
        this.pressed = true;
        this.sY = e.y;
        this.tY = e.y;
    },

    onTouchMove : function(e) {
        this.actionClick = false;
        this.tY = e.y;
    },

    onTouchEnd : function(e) {
        this.pressed = false;
    },

    onClick : function(e) {
        if(!this.actionClick) return;
        var localP = this.gameObject.transform.globalToLocal(e.x, e.y);
        var clickItemIndex = parseInt((localP.y - this.scrollY) / 80);
        var children = this.gameObject.getChildren();
        var i, len, child;
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            if(i === clickItemIndex) {
                child.getRenderer().changeFrameIndex(18);
            } else {
                child.getRenderer().changeFrameIndex(17);
            }
        }
        this.gameObject.updateCache();
        wozllajs.EventAdmin.notify('email.click', {
            index : clickItemIndex
        });
    },

    update : function() {
        var dY = this.tY - this.sY;
        var scrollableY = 80 * this.gameObject.getChildren().length - 470;
        if(scrollableY <= 0) return;
        dY = Math.abs(dY) > 0.1 ? dY : 0;
        if(true) {
            dY = dY/3;
            this.sY += dY;
            this.gameObject.translateCache(0, -dY);
            this.scrollY += dY;

            if(!this.pressed) {
                if(this.scrollY > 0) {
                    this.gameObject.translateCache(0, this.scrollY/3);
                    this.scrollY -= this.scrollY/3;
                }
                if(this.scrollY < -scrollableY){
                    this.gameObject.translateCache(0, (this.scrollY+scrollableY)/3);
                    this.scrollY -= (this.scrollY+scrollableY)/3;
                }
            } else {
                var judgementY = -scrollY;

                //TODO NOTIFY
            }
        }
    },

    destroyComponent : function() {
        this.off('touchstart', this.onTouchStart, this);
        this.off('touchmove', this.onTouchMove, this);
        this.off('touchend', this.onTouchEnd, this);
        this.off('click', this.onClick, this);
    }
});