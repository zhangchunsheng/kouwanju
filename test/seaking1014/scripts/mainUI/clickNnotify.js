if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.clickNnotify', [{
        name : 'name',
        type : 'IDE_text',
        required: true,
        value : 'undefined'
    }]);
}

wozllajs.defineComponent('mainUI.component.clickNnotify', {

    extend : 'Behaviour',

    alias : 'mainUI.clickNnotify',

    name : null,

    names : [],

    initComponent : function(){
        //TODO INIT
        this.on('click', this.onClick, this);
        this.names = this.name.split(',');
    },

    onClick : function(){
        var names = this.names;
        for(var i = 0, len = names.length; i < len; i++){
            this.notify(names[i]);
            console.log('#notify#'+names[i]);
        }
    },

    destroyComponent : function() {
        this.off('click', this.onClick, this);
    }
});