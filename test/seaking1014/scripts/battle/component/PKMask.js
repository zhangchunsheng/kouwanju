if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.PKMask', [{
        name : 'direction',
        type : 'IDE_combobox',
        items : ['left', 'right'],
        required : true
    }]);
}

wozllajs.defineComponent('battle.component.PKMask', {

    extend : 'Renderer',

    alias : 'battle.PKMask',

    direction : null,

    stage : null,

    x : 0,

    initComponent : function() {
        this.stage = this.gameObject.getStage();
        if(this.direction === 'left') {
            this.x = -this.stage.width;
        }
    },

    draw : function(context, visibleRect) {
        context.fillStyle = '#000000';
        context.fillRect(this.x, 0, visibleRect.width, visibleRect.height);
    }

});