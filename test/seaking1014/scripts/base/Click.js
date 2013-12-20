if(window.IDE) {
    IDE.ComponentRegistry.register('base.Click', [{
        name : 'name',
        type : 'IDE_text',
        value : 'Undefined',
        required: true
    }]);
}

wozllajs.defineComponent('base.Click', {

    extend : 'Behaviour',

    alias : 'base.click',

    name : 'Undefined',

    initComponent : function() {
        this.on('click', this.onClick, this);
    },

    onClick : function(e) {
        wozllajs.EventAdmin.notify(this.name + '.click', {
            localPoint : this.gameObject.transform.globalToLocal(e.x, e.y),
            screenPoint : e
        });
    },

    destroyComponent : function() {
        this.off('click', this.onClick, this);
    }


});