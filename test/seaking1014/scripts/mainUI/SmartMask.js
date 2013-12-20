if(window.IDE) {
    IDE.ComponentRegistry.register('base.SmartMask', [{
        name : 'width',
        type : 'IDE_text',
        required : true
    },{
        name : 'height',
        type : 'IDE_text',
        required : true
    },{
        name : 'color',
        type : 'IDE_text',
        required : true
    }]);
}

wozllajs.defineComponent('base.SmartMask', {

    extend : 'Renderer',

    alias : 'base.SM',

    width : '',

    height : '',

    color : null,

    initComponent : function() {
        //TODO INIT
        var stage = this.gameObject.getStage();

        this.width = parseInt(wozllajs.SizeParser.parse(this.width, stage));
        this.height = parseInt(wozllajs.SizeParser.parse(this.height, stage));
    },

    draw : function(context, visibleRect) {
        if(this.color) {
            context.fillStyle = this.color;
            context.fillRect(0, 0, this.width, this.height);
        }
    }
});