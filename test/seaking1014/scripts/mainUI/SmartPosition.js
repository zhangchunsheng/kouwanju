if(window.IDE) {
    IDE.ComponentRegistry.register('base.SmartPosition', [{
        name : 'x',
        type : 'IDE_text',
        required : true
    },{
        name : 'y',
        type : 'IDE_text',
        required : true
    }]);
}

wozllajs.defineComponent('base.SmartPosition', {

    extend : 'Layout',

    alias : 'base.SPS',

    x : '',

    y : '',

    doLayout : function() {
        //TODO INIT
        console.log('smartLayout');
        var trans = this.gameObject.transform;
        var stage = this.gameObject.getStage();
        trans.x = parseInt(wozllajs.SizeParser.parse(this.x, stage));
        trans.y = parseInt(wozllajs.SizeParser.parse(this.y, stage));
    }

});