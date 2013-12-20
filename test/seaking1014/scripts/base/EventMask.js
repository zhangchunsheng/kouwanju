if(window.IDE) {
    IDE.ComponentRegistry.register('base.EventMask', [{
        name : 'name',
        type : 'IDE_text',
        value : 'Undefined'
    }]);
}

wozllajs.defineComponent('base.EventMask', {

    extend : 'Behaviour',

    alias : 'base.eventMask',

    name : 'Undefined',

    initComponent : function() {
        this.on('touchstart', this.onTouchStart, this);
        this.on('click', this.onClick, this);
    },

    onTouchStart : function() {
    },

    onClick : function() {
        this.notify(this.name + '.click');
    },

    destroyComponent : function() {
        this.off('touchstart', this.onTouchStart, this);
        this.off('click', this.onClick, this);
    }

});