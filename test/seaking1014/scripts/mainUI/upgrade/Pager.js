if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.Pager', [{
        name : 'pageNumber',
        type : 'IDE_number',
        required: true,
        value : 0
    },{
        name : 'judgementX',
        type : 'IDE_number',
        required: true,
        value : 0
    },{
        name : 'pageWidth',
        type : 'IDE_number',
        required: true,
        value : 0
    },{
        name : 'cacheWidth',
        type : 'IDE_number',
        required: true,
        value : 0
    },{
        name : 'cacheHeight',
        type : 'IDE_number',
        required: true,
        value : 0
    },{
        name : 'category',
        type : 'IDE_text',
        required: true,
        value : 'Pager'
    }]);
}

wozllajs.defineComponent('mainUI.component.Pager', {

    extend : 'Behaviour',

    alias : 'mainUI.Pager',

    pageNumber : 0,

    judgementX : 0,

    pageWidth : 0,

    cacheWidth : 0,

    cacheHeight : 0,

    category : 'Pager',

    startX : 0,

    endX : 0,

    lastX : 0,

    currentX :0,

    fromX : 0,

    toX : 0,

    regX : 0,

    pageNo : 0,

    protect : false,

    initComponent : function(){
        //TODO INIT
        this.gameObject.cache(0, 0, this.cacheWidth, this.cacheHeight);
        this.on('touchstart', this.onTouchStart, this);
        this.on('touchmove', this.onTouchMove, this);
        this.on('touchend', this.onTouchEnd, this);

        var tx = this.gameObject.transform.x;
        this.regX = this.gameObject.transform.localToGlobal(tx, 0).x;
    },

    onTouchStart : function(e){
        var tx = e.x - this.regX;
        this.startX = tx;
        this.lastX = this.currentX = tx;
        this.toX = - this.pageNo*this.pageWidth;
        this.fromX = - this.pageNo*this.pageWidth;
    },

	onTouchMove : function(e){
        var tx = e.x - this.regX;
        this.currentX = tx;
        !this.protect && (this.toX += this.currentX - this.lastX);
        this.lastX = tx;
	},

    onTouchEnd : function(e){
        var tx = e.x - this.regX;
        this.endX = tx;

        if(this.startX - this.endX > this.judgementX){
            this.nextPage();
        }
        else if(this.endX - this.startX > this.judgementX){
            this.lastPage();
        }else{
            this.restorePage();
        }

        this.protect = true;
    },

    update : function(){
        var newX = this.fromX*1/3 + this.toX*2/3;
        if(Math.abs(this.fromX- this.toX) > 0.1){
            this.gameObject.updateCache(-newX, 0);
        }else{
            this.protect = false;
        }
        this.fromX = newX;
    },

    nextPage : function(){
        if(this.pageNo < this.pageNumber-1){
            this.pageNo++
        }
        this.notify(this.category+'.CP');
        this.restorePage();
    },

    lastPage : function(){
        if(this.pageNo > 0) {
            this.pageNo--
        }
        this.notify(this.category+'.CP');
        this.restorePage();
    },

    restorePage : function(){
        this.notify(this.category+'.P'+this.pageNo);
        this.toX = -this.pageNo*this.pageWidth;
    },

    destroyComponent : function() {
        this.off('touchstart', this.onTouchStart, this);
        this.off('touchmove', this.onTouchMove, this);
        this.off('touchend', this.onTouchEnd, this);
    }
});