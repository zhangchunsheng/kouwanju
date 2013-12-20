if(window.IDE) {
    IDE.ComponentRegistry.register('base.NinePatchRenderer', [{
        name : 'texture',
        type : 'IDE_tt_file',
        required:true
    }, {
        name : 'index',
        type : 'IDE_selectTextureRegion',
        value : 0,
        required:true
    }, {
        name : 'width',
        type : 'IDE_text',
        value : 0,
        required: true
    }, {
        name : 'height',
        type : 'IDE_text',
        value : 0,
        required: true
    }, {
        name : 'patchTop',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'patchBottom',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'patchLeft',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'patchRight',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'cache',
        type : 'IDE_checkbox',
        value : false,
        required: true
    }]);
}

wozllajs.defineComponent('base.NinePatchRenderer', {

    extend : 'renderer.JSONTextureRenderer',

    alias : 'renderer.ninepatch',

    width : 0,
    height : 0,

    patchTop : 0,
    patchLeft : 0,
    patchRight : 0,
    patchBottom : 0,

    ninepatch : null,

    cache : false,

    initComponent : function() {
        var stage;
        this.JSONTextureRenderer_initComponent();
        if(this.image && this.width && this.height) {
            stage = this.gameObject.getStage();
            this.width = wozllajs.SizeParser.parse(this.width, stage);
            this.height = wozllajs.SizeParser.parse(this.height, stage);
            this.ninepatch = new wozllajs.NinePatch(0, 0, this.width, this.height,
                {
                    top : this.patchTop,
                    bottom : this.patchBottom,
                    left : this.patchLeft,
                    right : this.patchRight
                }, this.image, this.currentFrame);
            this.cache && this.ninepatch.cache();
        }
    },

    changeFrameIndex : function(index) {
        this.JSONTextureRenderer_changeFrameIndex(index);
        this.ninepatch.region = this.currentFrame;
        if(this.cache) {
            this.ninepatch.cache();
        }
    },

    draw : function(context, visibleRect) {
        this.ninepatch && this.ninepatch.draw(context);
    }


});