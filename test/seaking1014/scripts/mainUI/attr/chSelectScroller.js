if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.chSelectScroller', []);
}

wozllajs.defineComponent('mainUI.component.chSelectScroller', {

    extend : 'Behaviour',

    alias : 'mainUI.chSelectScroller',

    scrollY : 0,

    sY : 0,

    tY : 0,

    dY : 0,

    pressed : false,

    initComponent : function(){
        //TODO INIT
        this.gameObject.cache(0, 0, 160, 512);
        this.on('touchstart', this.onTouchStart, this);
        this.on('touchmove', this.onTouchMove, this);
        this.on('touchend', this.onTouchEnd, this);
    },

    onTouchStart : function(e){
        this.pressed = true;
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
        this.dY  = dY;
        if(Math.abs(dY) > 0.1){
            var dY = dY/3;
            this.sY += dY;
            this.gameObject.translateCache(0, -dY);
            this.scrollY += dY;

            if(!this.pressed){
                if(this.dY > 0.03){
                    this.gameObject.translateCache(0, -dY);
                    this.scrollY += dY;
                    this.dY = this.dY/3;
                }
                if(this.scrollY > 0){
                    this.gameObject.translateCache(0, this.scrollY/3);
                    this.scrollY -= this.scrollY/3;
                }
                if(this.scrollY < -900){
                    this.gameObject.translateCache(0, (this.scrollY+900)/3);
                    this.scrollY -= (this.scrollY+900)/3;
                }
            }else{
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