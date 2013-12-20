if(window.IDE) {
    IDE.ComponentRegistry.register('base.ColorLayer', [{
        name : 'color',
        type : 'IDE_text',
        required : true
    }]);
}

wozllajs.defineComponent('base.ColorLayer', {

    extend : 'Renderer',

    alias : 'base.colorLayer',

    color : null,

    draw : function(context, visibleRect) {
        if(this.color) {
            context.fillStyle = this.color;
            context.fillRect(-visibleRect.width, -visibleRect.height, 2*visibleRect.width, 2*visibleRect.height);
        }
    }

});