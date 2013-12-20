if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.activeWatcher', [{
        name : 'category',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    },{
        name : 'trueName',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    },{
        name : 'falseName',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    }]);
}

wozllajs.defineComponent('mainUI.component.activeWatcher', {

    extend : 'Behaviour',

    alias : 'mainUI.activeWatcher',

    category : null,

    trueName : null,

    falseName : null,

    initComponent : function() {
        //TODO INIT
        this.on(this.category+'.'+this.trueName, this.executeTrue, this);
        this.on(this.category+'.'+this.falseName, this.executeFalse, this);
    },

    executeTrue : function(){
    	this.gameObject.setActive(true);
        this.gameObject.setVisible(true);
    },

    executeFalse : function(){
        this.gameObject.setActive(false);
        this.gameObject.setVisible(false);
    },

    destroyComponent : function() {
        this.off(this.category+'.'+this.trueName, this.executeTrue, this);
        this.off(this.category+'.'+this.falseName, this.executeFalse, this);
    }
});