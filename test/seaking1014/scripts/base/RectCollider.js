if(window.IDE) {
    IDE.ComponentRegistry.register('collider.RectCollider', [{
        name : 'x',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'y',
        type : 'IDE_number',
        value : 0,
        required: true
    }, {
        name : 'width',
        type : 'IDE_number',
        value : 0
    }, {
        name : 'height',
        type : 'IDE_number',
        value : 0
    }]);
}

wozllajs.defineComponent('collider.RectCollider', {

    extend : 'Collider',

    alias : 'collider.rect',

    x : 0,
    y : 0,
    width : 0,
    height : 0,

    isPointIn : function(x, y) {
        var p = this.gameObject.transform.globalToLocal(x, y);
        return wozllajs.geom.pointInRect(p, this);
    },

    draw : function(context) {
        context.beginPath();
        context.lineWidth = 2;
        context.strokeStyle = 'blue';
        context.rect(this.x, this.y, this.width, this.height);
        context.stroke();
    }


});