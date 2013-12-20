if(window.IDE) {
    IDE.ComponentRegistry.register('base.RichText', [{
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
        value : 'normal 20px 黑体'
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
        name : 'lineHeight',
        type : 'IDE_number',
        required: true,
        value : 20
    }]);
}

wozllajs.defineComponent('base.RichText', {

    extend : 'Renderer',

    alias : 'base.richText',

    color : '#ffffff',

    font : 'normal 20px 黑体',

    baseline : 'top',

    align : 'start',

    text : '<red>政明</red> 小心翼翼地打开了 <red>[冰封宝箱]</red>, 轻松获得了 <blue>[无象神功]</blue> !!!',

    regex : /([\s\S]*?)<(.*?)>([\s\S]*?)<\/(.*?)>/ig,

    specialQuotRegex : /<.*?>|<\/.*?>/ig,

    height : 0,

    width : 0,

    setText : function(text) {
        var i, len, line, lines, width;
        var ctx = this.gameObject.getStage().stageContext;
        this.text = text;
        lines = text;
        if(!wozllajs.isArray(text)) {
            lines = [text];
        }
        this.height = this.lineHeight * lines.length;
        for(i= 0,len=lines.length; i<len; i++) {
            line = lines[i].replace(this.specialQuotRegex, '');
            width = ctx.measureText(line).width;
            if(width > this.width) {
                this.width = width;
            }
        }
    },

    draw : function(context, visibleRect) {
        var i, len, j, len2, result, result2;
        var text = this.text;
        var lines = text;
        if(text) {
            if(!wozllajs.isArray(text)) {
                lines = [text];
            }
            context.fillStyle = this.color;
            context.font = this.font;
            context.textBaseline = this.baseline;
            context.textAlign = this.align;

            for(i= 0,len=lines.length; i<len; i++) {
                result = lines[i].match(this.regex);
                if(!result || result.length === 0) {
                    context.fillText(lines[i], 0, this.lineHeight*i);
                } else {
                    for(j=0,len2=result.length; j<len2; j++) {
                        result2 = result[j];
                    }
                }
            }
        }
    }

});