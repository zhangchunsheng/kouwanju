if(window.IDE) {
    IDE.ComponentRegistry.register('base.Float', [{
        name : 'float',
        type : 'IDE_combobox',
        value : 'none',
        items : ['none', 'right', 'bottom', 'right_bottom'],
        required : true
    }]);
}

wozllajs.defineComponent('base.Float', {

    extend : 'Layout',

    alias : 'layout.float',

    float : 'none',

    doLayout : function() {
        var trans = this.gameObject.transform;
        var stage = this.gameObject.getStage();
        switch (this.float) {
            case 'none' : break;
            case 'right' : trans.x += stage.width; break;
            case 'bottom' : trans.y += stage.height; break;
            case 'right_bottom' :
                trans.x += stage.width;
                trans.y += stage.height;
                break;
        }
    }

});