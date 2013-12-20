if(window.IDE) {
    IDE.ComponentRegistry.register('base.ActiveCheckbox', [{
        name : 'activeObjectPath',
        type : 'IDE_text',
        required:true,
        value : 'Checkbox'
    }]);
}

wozllajs.defineComponent('base.ActiveCheckbox', {

    extend : 'Behaviour',

    alias : 'base.activeCheckbox',

    activeObjectPath : 'Checkbox',

    initComponent : function() {
        this.on('click', this.onClick);
    },

    onClick : function() {
        var obj = this.gameObject;
        if(this.activeObjectPath) {
            obj = obj.findObjectByPath(this.activeObjectPath);
        }
        obj.setActive(!obj.isActive());
    },

    destroyComponent : function() {
        this.off('click', this.onClick);
    }

});