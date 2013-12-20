if(window.IDE) {
    IDE.ComponentRegistry.register('base.Text', [{
        name : 'text',
        type : 'IDE_text',
        required: true
    }, {
        name : 'color',
        type : 'IDE_text',
        required: true,
        value : '#ffffff'
    }, {
        name : 'font',
        type : 'IDE_text',
        required: true,
        value : 'normal 20px STHeiti,黑体'
    }, {
        name : 'baseline',
        type : 'IDE_combobox',
        required: true,
        value : 'top',
        items : ['top', 'middle', 'bottom']
    }, {
        name : 'align',
        type : 'IDE_combobox',
        required: true,
        value : 'start',
        items : ['start', 'end', 'center']
    }, {
        name : 'password',
        type : 'IDE_checkbox',
        value : false
    }]);
}

wozllajs.defineComponent('base.Text', {

    extend : 'Renderer',

    alias : 'base.text',

    text : '{...}',

    color : '#ffffff',

    font : 'normal 20px STHeiti,黑体',

    baseline : 'top',

    align : 'start',

    password : false,

    draw : function(context, visibleRect) {
        var text = this.text;
        if(text) {
            if(this.password) {
                text = '**********';
            }
            context.fillStyle = this.color;
            context.font = this.font;
            context.textBaseline = this.baseline;
            context.textAlign = this.align;
            context.fillText(text, 0, 0);
        }
    }

});