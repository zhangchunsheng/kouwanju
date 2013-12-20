if(window.IDE) {
    IDE.ComponentRegistry.register('email.component.ContentRenderer', []);
}

wozllajs.defineComponent('email.component.ContentRenderer', {

    extend : 'Renderer',

    alias : 'email.content',

    text : '这是一个超长字数的描述这是一个超长这是一个超长这是一个超长这是一个超长这是一个超长',

    color : '#ffffff',

    font : 'normal 16px STHeiti,黑体',

    baseline : 'top',

    align : 'start',

    lineHeight : 20,

    lineWordCount : 19,

    draw : function(context, visibleRect) {
        var i, len;
        if(this.text) {
            context.fillStyle = this.color;
            context.font = this.font;
            context.textBaseline = this.baseline;
            context.textAlign = this.align;

            len = this.text.length / this.lineWordCount;
            for(i=0; i<len; i++) {
                context.fillText(this.text.substr(i*this.lineWordCount, this.lineWordCount), 0, this.lineHeight * i);
            }
        }
    }

});