if(window.IDE) {
    IDE.ComponentRegistry.register('base.Watcher', [{
        name : 'door',
        type : 'IDE_text',
        required : true
    },{
        name : 'activeKey',
        type : 'IDE_text',
        required : true
    },{
        name : 'passiveKey',
        type : 'IDE_text',
        required : true
    },{
        name : 'rate',
        type : 'IDE_number',
        required : false
    },{
        name : 'max',
        type : 'IDE_number',
        required : false
    },{
        name : 'TP',
        type : 'IDE_text',
        required : false
    },{
        name : 'FP',
        type : 'IDE_text',
        required : false
    }]);
}

wozllajs.defineComponent('base.Watcher', {

    extend : 'Behaviour',

    alias : 'base.Watcher',

    door : "",

    activeKey : null,

    passiveKey : null,

    rate : 1/3,

    _active : false,

    //for door 'Appear'
    max : 1,

    _dest : -1,

    //for door 'ToAndFrom'

    TP : '0,0',//To Point

    FP : '0,0',//From Point

    _DP : {x:0,y:0},//Dest Point

    //put hand on Door
    initComponent : function() {
        //TODO INIT
        var door = this.door;
        var init = 'this.init'+this.door+'();';
        var push = 'this.push'+this.door;
        var pull = 'this.pull'+this.door;
        console.log(init);
        console.log(push);
        console.log(pull);

        eval(init);

        //Active Keys
        var as = this.activeKey.split(',');
        for(var i = 0, len = as.length; i < len; i++){
            this.on(as[i], eval(push), this);
        }
        
        //Passive Keys
        var ps = this.passiveKey.split(',');
        for(var i = 0, len = ps.length; i < len; i++){
            this.on(ps[i], eval(pull), this);
        }

        
    },

    //move door
    update : function() {
        if(!this._active){
            return;
        }
        if(this.door == 'Test'){
            console.log('updateTest');
            return;
        }
        if(this.door == 'Appear'){
            this.gameObject.transform.alpha = this.gameObject.transform.alpha*(1-this.rate) + this._dest*this.rate;
            if(this.gameObject.transform.alpha < 0.05){
                this._setActive(false);
            }
            
            return;
        }
        if(this.door == 'ToAndFrom'){
            this.gameObject.transform.x = this.gameObject.transform.x*(1-this.rate)+this._DP.x*this.rate;
            this.gameObject.transform.y = this.gameObject.transform.y*(1-this.rate)+this._DP.y*this.rate;
            return;
        }
    },


    /*
    *  for Door 'Test'
    */
    initTest : function(){
        //Security Data Init
        console.log('initTest');
    },

    pushTest : function(){
        this._on();

        console.log('pushTest');
    },

    pullTest : function(){
        this._on();

        console.log('pullTest');
    },


    /*
    *  for Door 'Appear'
    */
    initAppear : function(){
        //Security Data Init
        if(this.max*this.rate < 0.05){
            this.rate = 0.06/this.max;
        }
        this._dest = this.gameObject.transform.alpha;
    },

    pushAppear : function(){
        this._on();

        this._dest = this.max;
        this._setActive(true);
    },

    pullAppear : function(){
        this._on();

        this._dest = 0;
    },


    /*
    * for door 'ToAndFrom'
    */
    initToAndFrom : function(){
        //Security Data Init
        var p1 = this.TP.split(',');
        this.TP = {x:p1[0], y:p1[1]};

        var p2 = this.FP.split(',');
        this.FP = {x:p2[0], y:p2[1]};

        this._DP.x = this.gameObject.transform.x;
        this._DP.y = this.gameObject.transform.y;

        this.printToAndFrom();
    },

    printToAndFrom : function(){
        console.log('#TP# ');console.log(this.TP);console.log('#FP# ');console.log(this.FP);console.log('#_DP# ');console.log(this._DP);
    }, 

    pushToAndFrom : function(){
        this._on();
        this._DP.x = this.TP.x;
        this._DP.y = this.TP.y;
    },

    pullToAndFrom : function(){
        this._DP.x = this.FP.x;
        this._DP.y = this.FP.y;
    },



    //private functions
    _on : function(){
        this._active = true;
    },

    _setActive : function(bool){
        this.gameObject.setActive(bool);
        this.gameObject.setVisible(bool);
    },

    //reset door
    destroyComponent : function() {
        var door = this.door;

        var push = 'this.push'+this.door;
        var pull = 'this.pull'+this.door;

        // Active Keys
        var as = this.activeKey.split(',');
        for(var i = 0, len = as.length; i < len; i++){
            this.off(as[i], eval(push), this);
        }
        
        //Passive Keys
        var ps = this.passiveKey.split(',');
        for(var i = 0, len = ps.length; i < len; i++){
            this.off(ps[i], eval(pull), this);
        }
    }

});