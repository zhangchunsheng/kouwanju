if(window.IDE) {
    IDE.ComponentRegistry.register('npc.HighlightFilter', [{
        name : 'active',
        type : 'IDE_checkbox',
        value : false,
        required: true
    }]);
}

wozllajs.defineComponent('npc.HighlightFilter', {

    extend : 'Filter',

    alias : 'npc.highlightFilter',

    active : false,

    applyFilter : function(context, x, y, width, height) {
        if(!this.active) return;
        context.globalAlpha = 0.4;
        context.globalCompositeOperation = 'source-atop';
        context.fillStyle = '#fffd7d';
        context.fillRect(x, y, width, height);
    }


});