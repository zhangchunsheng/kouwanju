if(window.IDE) {
    IDE.ComponentRegistry.register('base.InputField', [{
        name : 'eventSource',
        value : 'Undefined',
        type : 'IDE_text',
        required: true
    }, {
        name : 'textObjectPath',
        value : 'Text',
        type : 'IDE_text',
        required: true
    }, {
        name : 'title',
        type : 'IDE_text',
        value : 'Input',
        required: true
    }, {
        name : 'label',
        type : 'IDE_text',
        value : 'please input content',
        required:true
    }, {
        name : 'defaultText',
        type : 'IDE_text',
        value : '',
        required: true
    }, {
        name : 'keyboardType',
        type : 'IDE_combobox',
        items : ['text', 'num'],
        value : 'text',
        required: true
    }, {
        name : 'okButtonText',
        type : 'IDE_text',
        value : '确定',
        required: true
    }, {
        name : 'cancelButtonText',
        type : 'IDE_text',
        value : '取消',
        required: true
    }]);
}

wozllajs.defineComponent('base.InputField', {

    extend : 'Behaviour',

    alias : 'base.input',

    eventSource : '',

    textObjectPath : 'Text',

    title : '',

    label : 'please input content',

    keyboardType : 'text',

    defaultText : '',

    okButtonText : '确定',

    cancelButtonText : '取消',

    initComponent : function() {
        this.on('click', this.onClick);
    },

    onClick : function(e) {
        var me = this;

        function onTextInput(text) {
            var oldValue;
            CocoonJS.App.onTextDialogFinished.removeEventListener(onTextInput);
            me.gameObject.findObjectByPath(me.textObjectPath).getRenderer().text = text;
            me.notify(this.eventSource + '.changed', {
                oldVale : '',
                value : text
            });
        }

        CocoonJS.App.onTextDialogFinished.addEventListener(onTextInput);
        CocoonJS.App.showTextDialog(this.title, this.label, this.defaultText, this.keyboardType, this.cancelButtonText, this.okButtonText);
    },

    destroyComponent : function() {
        this.off('click', this.onClick);
    }


});