if(window.IDE) {
    IDE.ComponentRegistry.register('chat.component.MessageScroller', []);
}

wozllajs.defineComponent('chat.component.MessageScroller', {

    extend : 'Behaviour',

    alias : 'chat.msgScroller',

    scrollY : 0,

    sY : 0,

    tY : 0,

    pressed : false,

    initComponent : function(){
        //TODO INIT
        this.gameObject.cache(0, 0, 776, 452);
        this.on('touchstart', this.onTouchStart, this);
        this.on('touchmove', this.onTouchMove, this);
        this.on('touchend', this.onTouchEnd, this);
    },

    onTouchStart : function(e){
        pressed = true;
        this.sY = e.y;
        this.tY = e.y;
    },

    onTouchMove : function(e){
        this.tY = e.y;
    },

    onTouchEnd : function(e){
        this.pressed = false;
    },

    update : function(){
        var dY = this.tY - this.sY;
        var contentHeight = this.gameObject.getRenderer().getMessageHeight() - 462;
        if(contentHeight <= 0) {
            return;
        }
        if(Math.abs(dY) > 0.1){
            var dY = dY/3;
            this.sY += dY;
            this.gameObject.translateCache(0, -dY);
            this.scrollY += dY;

            if(!this.pressed){
                if(this.scrollY > 0){
                    this.gameObject.translateCache(0, this.scrollY/3);
                    this.scrollY -= this.scrollY/3;
                }
                if(this.scrollY < -contentHeight){
                    this.gameObject.translateCache(0, (this.scrollY+contentHeight)/3);
                    this.scrollY -= (this.scrollY+contentHeight)/3;
                }
            }else{
                var judgementY = -scrollY;

                //TODO NOTIFY
            }
        }
    },

    destroyComponent : function() {
        this.off('touchstart', this.onTouchStart, this);
        this.off('touchmove', this.onTouchMove, this);
        this.off('touchend', this.onTouchEnd, this);
    }

});