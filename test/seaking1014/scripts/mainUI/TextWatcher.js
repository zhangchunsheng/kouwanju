if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.TextWatcher', [{
        name : 'activeKey',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    },{
        name : 'passiveKey',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    },{
        name : 'activeColor',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    },{
        name : 'passiveColor',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    }]);
}

wozllajs.defineComponent('mainUI.component.TextWatcher', {

    extend : 'Behaviour',

    alias : 'mainUI.TextWatcher',

    activeKey : '',

    passiveKey : '',

    activeColor : '',

    passiveColor : '',

    initComponent : function() {
        //TODO INIT

        //Active Keys
        var as = this.activeKey.split(',');
        for(var i = 0, len = as.length; i < len; i++){
            this.on(as[i], this.active, this);
        }
        
        //Passive Keys
        var ps = this.passiveKey.split(',');
        for(var i = 0, len = ps.length; i < len; i++){
            this.on(ps[i], this.passive, this);
        }

        this.update = false;
    },

    active : function(){
        this.gameObject.getRenderer().color = this.activeColor;
    },

    passive : function(){
        this.gameObject.getRenderer().color = this.passiveColor;
    },

    destroyComponent : function() {
        //Active Keys
        var as = this.activeKey.split(',');
        for(var i = 0, len = as.length; i < len; i++){
            this.off(as[i], this.active, this);
        }
        
        //Passive Keys
        var ps = this.passiveKey.split(',');
        for(var i = 0, len = ps.length; i < len; i++){
            this.off(ps[i], this.passive, this);
        }
    }
});