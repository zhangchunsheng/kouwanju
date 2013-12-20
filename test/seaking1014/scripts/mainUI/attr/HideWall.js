if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.HideWall', []);
}

wozllajs.defineComponent('mainUI.component.HideWall', {

    extend : 'Behaviour',

    alias : 'mainUI.HideWall',

    startY : 0,

    endY : 340,

    curY : 0,

    _destY : 0,

    _active : false,

    initComponent : function(){
        //TODO INIT
        this.gameObject.cache(0, 0, 304, 340);
        this.on('sublist.open', this.getOut, this);
        this.on('sublist.close', this.getIn, this);
    },

    getOut : function(e){
        this._destY = this.endY;
    },

	getIn : function(e){
        this._destY = this.startY;
	},

    update : function(){
        var d = (this._destY-this.curY)*0.5;
        this.curY += d;
        this.gameObject.translateCache(0, -d);
    },

    destroyComponent : function() {
        this.off('sublist.open', this.getOut, this);
        this.off('sublist.close', this.getIn, this);
    }
});