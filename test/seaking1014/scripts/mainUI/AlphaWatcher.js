if(window.IDE) {
    IDE.ComponentRegistry.register('base.AlphaWatcher', [{
        name : 'appearKey',
        type : 'IDE_text',
        required : true
    },{
        name : 'disappearKey',
        type : 'IDE_text',
        required : true
    },{
        name : 'max',
        type : 'IDE_number',
        required : true
    },{
        name : 'rate',
        type : 'IDE_number',
        required : false
    }]);
}

wozllajs.defineComponent('base.AlphaWatcher', {

    extend : 'Behaviour',

    alias : 'base.AW',

    appearKey : null,

    disappearKey : null,

    max : 1,

    dest : -1,

    rate : 1/3,

    initComponent : function() {
        //TODO INIT
        var appears = this.appearKey.split(',');
        for(var i = 0, len = appears.length; i < len; i++){
            this.on(appears[i], this.appear, this);
        }
        
        var disappears = this.disappearKey.split(',');
        for(var i = 0, len = disappears.length; i < len; i++){
            this.on(disappears[i], this.disappear, this);
        }

        //Security Data Init
        if(this.max*this.rate < 0.05){
            this.rate = 0.06/this.max;
        }
        this.dest = this.gameObject.transform.alpha;
    },

    update : function() {
        this.gameObject.transform.alpha = this.gameObject.transform.alpha*(1-this.rate) + this.dest*this.rate;
        if(this.gameObject.transform.alpha < 0.05){
            this.setActive(false);
        }
    },

    appear : function(){
        this.dest = this.max;
        this.setActive(true);
    },

    disappear : function(){
        this.dest = 0;
    },

    setActive : function(bool){
        this.gameObject.setActive(bool);
        this.gameObject.setVisible(bool);
    },

    destroyComponent : function() {
        var appears = this.appearKey.split(',');
        for(var i = 0, len = appears.length; i < len; i++){
            this.off(appears[i], this.appear, this);
        }
        
        var disappears = this.disappearKey.split(',');
        for(var i = 0, len = disappears.length; i < len; i++){
            this.off(disappears[i], this.disappear, this);
        }
    }

});