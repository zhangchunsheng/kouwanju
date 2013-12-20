if(window.IDE) {
    IDE.ComponentRegistry.register('base.TweenAnimation', [{
        name : 'property',
        type : 'IDE_combobox',
        items : ['', 'x', 'y', 'scaleX', 'scaleY', 'alpha'],
        value : '',
        required: true
    }, {
        name : 'startValue',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'endValue',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'time',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'func',
        type : 'IDE_combobox',
        value : 'none',
        items : ['none', 'linear', 'backOut', 'backIn'],
        required: true
    }]);
}

wozllajs.defineComponent('base.TweenAnimation', {

    extend : 'Behaviour',

    alias : 'base.tween',

    property : null,

    startValue : null,

    endValue : null,

    time : 0,

    func : 'none',

    tween : null,

    animate : function() {
        if(!this.property) return;
        var me = this;
        var toVal = {};
        toVal[this.property] = this.endValue;
        this.gameObject.transform[this.property] = this.startValue;
        this.tween = createjs.Tween.get(this.gameObject.transform, null, null, true)
            .to(toVal, this.time, createjs.Ease[this.func]).call(function() {
                me.tween = null;
            });
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
    }

});