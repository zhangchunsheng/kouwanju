if(window.IDE) {
    IDE.ComponentRegistry.register('dialogue.component.HeadCutRenderer', []);
}

wozllajs.defineComponent('dialogue.component.HeadCutRenderer', {

    extend : 'Renderer',

    alias : 'dialogue.headcut',

    src : null,

    image : null,

    x : 0,

    y : 0,

    draw : function(context, visibleRect) {
        if(this.image) {
            context.drawImage(this.image, this.x, this.y);
        }
    },

    setHeadCutSrc : function(src) {
        var image, me = this;
        if(this.src === src) return;
        this.src = src;
        this.image && this.image.dispose && this.image.dispose();
        this.image = null;
        if(src) {
            image = new Image();
            image.src = src;
            image.onload = function() {
                me.image = image;
                me.x = -me.image.width/2;
                me.y = -me.image.height;
            };
        }
    },

    destroyComponent : function() {
        this.image && this.image.dispose && this.image.dispose();
    }

});