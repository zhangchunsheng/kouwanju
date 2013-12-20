if(window.IDE) {
    IDE.ComponentRegistry.register('base.StretchTextureRenderer', [{
        name : 'texture',
        type : 'IDE_tt_file',
        required : true
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
    }]);
}

wozllajs.defineComponent('base.StretchTextureRenderer', {

    extend : 'renderer.JSONTextureRenderer',

    alias : 'renderer.stretchTexture',

    width : null,
    height : null,

    initComponent : function() {
        var stage = this.gameObject.getStage();
        this.JSONTextureRenderer_initComponent();
        if(this.width && this.height) {
            this.width = parseInt(wozllajs.SizeParser.parse(this.width, stage));
            this.height = parseInt(wozllajs.SizeParser.parse(this.height, stage));
        }
    },

    draw : function(context, visibleRect) {
        var w, h;
        var f = this.currentFrame;
        if(this.image && f && this.width && this.height) {
            w = f.w || f.width;
            h = f.h || f.height;
            context.drawImage(this.image, f.x, f.y, w, h, 0, 0, this.width || w, this.height || h);
        }
    }


});