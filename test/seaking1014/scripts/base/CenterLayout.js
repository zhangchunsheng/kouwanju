if(window.IDE) {
    IDE.ComponentRegistry.register('base.CenterLayout', [{
        name : 'horizontal',
        type : 'IDE_checkbox',
        value : true
    }, {
        name : 'vertical',
        type : 'IDE_checkbox',
        value : true
    }]);
}

wozllajs.defineComponent('base.CenterLayout', {

    extend : 'Layout',

    alias : 'base.center',

    horizontal : true,

    vertical : true,

    doLayout : function() {
        var trans = this.gameObject.transform;
        var stage = this.gameObject.getStage();
        if(this.horizontal) {
            trans.x = stage.width/2;
        }
        if(this.vertical) {
            trans.y = stage.height/2;
        }
    }

});