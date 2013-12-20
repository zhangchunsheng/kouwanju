if(window.IDE) {
    IDE.ComponentRegistry.register('base.RectHitDelegate', [{
        name : 'x',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'y',
        type : 'IDE_number',
        value : 0,
        required: true
    },{
        name : 'width',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'height',
        type : 'IDE_number',
        value : 0,
        required: true
    }]);
}

wozllajs.defineComponent('base.RectHitDelegate', {

    extend : 'HitTestDelegate',

    alias : 'base.rectHit',

    x : 0,
    y : 0,

    width : 0,

    height : 0,

    testHit : function(x, y) {
        return wozllajs.geom.pointInRect2(x, y, this.x, this.y, this.width, this.height);
    },

    draw : function(context) {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();

    }

});