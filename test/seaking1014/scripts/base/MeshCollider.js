wozllajs.defineComponent('collider.MeshCollider', {

    extend : 'Collider',

    alias : 'collider.mesh',

    datas : null,

    trianglulations : null,

    initComponent : function() {
        var paths = [];
        var datas = this.datas;
        if(datas) {
            this.trianglulations = [];
            for(var i=0, len=datas.length; i<len; i++) {
                paths.push(datas[i]);
                if(datas[i] === game.Triangulation.COMBINE_ITEM) {
                    this.trianglulations.push(new game.Triangulation(paths));
                    paths = [];
                }
            }
        }
    },

    isPointIn : function(x, y) {
        if(this.trianglulations) {
            var trianglulations = this.trianglulations;
            var collided = false;
            var vp = new navmesh.Vector2f(x, y);
            for(var i=0, len=trianglulations.length; i<len; i++) {
                if(trianglulations[i].isPointIn(vp)) {
                    collided = true;
                    break;
                }
            }
            return collided;
        }
        return false;
    },

    draw : function(context) {
        for(var k= 0,len2=this.trianglulations.length; k<len2; k++) {
            var triangleV = this.trianglulations[k].triangleV;
            var i, len, trg;
            context.save();
            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = 'yellow';
            for (i=0, len=triangleV.length; i<len; i++) {
                trg = triangleV[i];
                context.moveTo(trg.pointA.x, trg.pointA.y);
                context.lineTo(trg.pointB.x, trg.pointB.y);
                context.lineTo(trg.pointC.x, trg.pointC.y);
                context.lineTo(trg.pointA.x, trg.pointA.y);
            }
            context.stroke();
            context.restore();
        }
    }

});