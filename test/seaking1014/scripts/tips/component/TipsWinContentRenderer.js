if(window.IDE) {
    IDE.ComponentRegistry.register('tips.component.TipsWinContentRenderer', []);
}

wozllajs.defineComponent('tips.component.TipsWinContentRenderer', {

    extend : 'Renderer',

    alias : 'tips.win.content',

    content : null,

    draw : function(context, visibleRect) {
        if(this.content) {
            context.fillText(this.content.text, 0, 0);
        }
    },

    setContent : function(content) {
        this.content = content;
    },

    destroyComponent : function() {
        this.image && this.image.dispose && this.image.dispose();
    }

});