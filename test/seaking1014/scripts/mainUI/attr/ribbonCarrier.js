if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.ribbonCarrier', []);
}

wozllajs.defineComponent('mainUI.component.ribbonCarrier', {

    extend : 'Behaviour',

    alias : 'mainUI.ribbonCarrier',

    dist : 60,

    dest : 0,

    cur : 0,

    initComponent : function(){
        //TODO INIT
        this.on('sublist.select0', this.select0, this);
        this.on('sublist.select1', this.select1, this);
        this.on('sublist.select2', this.select2, this);
        this.on('sublist.select3', this.select3, this);
        this.on('sublist.select4', this.select4, this);
    },

    select0 : function(){
        this._move(0);
    },

    select1 : function(){
        this._move(1);
    },

    select2 : function(){
        this._move(2);
    },

    select3 : function(){
        this._move(3);
    },

    select4 : function(){
        this._move(4);
    },

    _move : function(index){
        this.dest = index*this.dist;
    },

    update : function(){
        var d = (this.dest - this.cur)*0.5;
        this.cur += d;
        this.gameObject.transform.y += d;
    },

    destroyComponent : function() {
        this.off('sublist.select0', this.select0, this);
        this.off('sublist.select1', this.select1, this);
        this.off('sublist.select2', this.select2, this);
        this.off('sublist.select3', this.select3, this);
        this.off('sublist.select4', this.select4, this);
    }
});