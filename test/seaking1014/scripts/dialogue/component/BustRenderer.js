if(window.IDE) {
    IDE.ComponentRegistry.register('dialogue.component.BustRenderer', []);
}

wozllajs.defineComponent('dialogue.component.BustRenderer', {

    extend : 'Renderer',

    alias : 'dialogue.bust',

    x : 0,

    y : 0,

    src : null,

    image : null,

    draw : function(context, visibleRect) {
        if(this.image) {
            context.drawImage(this.image, this.x, this.y);
        }
    },

    setBustSrc : function(src) {
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
                me.x = -parseInt(me.image.width/2);
                me.y = -me.image.height;
            };
        }
    },

    destroyComponent : function() {
        this.image && this.image.dispose && this.image.dispose();
    }

});