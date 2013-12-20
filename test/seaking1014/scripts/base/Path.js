(function() {

    function Path(collisionPaths, isTriangleData) {
        this.navMesh = null;
        if(isTriangleData) {
            this._createTriangleV(collisionPaths);
        } else {
            this._buildTriangleV(collisionPaths);
        }
        this._buildCellV();
        this._buildNavMesh();
    }

    Path.prototype = {
        find : function(from, to, findWalkable) {
            var path = null;
            var walkable = true;
            var iteraterCount = 0;
            var temp = { x: 0, y: 0};
            var end = { x : to.x, y : to.y };
            var dir = { x : end.x - from.x, y : end.y - from.y };
            var len = wozllajs.geom.vectorLength(dir);
            if(len <= 20) {
                return { walkable: true, path: null };
            }
            wozllajs.geom.vectorNomalize(dir);
            while(!path) {
                iteraterCount ++;
                if(iteraterCount > 100) return { walkable: false, path: null };
                path = this.navMesh.findPath(from, end);
                if(path) {
                    break;
                }
                walkable = false;
                end.x -= dir.x * 20;
                end.y -= dir.y * 20;
                temp.x = end.x - from.x;
                temp.y = end.y - from.y;
                len = wozllajs.geom.vectorLength(temp);
                if(len <= 20) {
                    break;
                }
            }
            return {
                path : path,
                walkable : walkable
            };
        },
        _buildNavMesh : function() {
            this.navMesh = new navmesh.NavMesh(this.cellV);
        },
        _buildTriangleV : function(collisionPaths) {
            this.triangleV = new game.Triangulation(collisionPaths).triangleV;
        },
        _createTriangleV : function(triangleData) {
            var i, len, trg;
            var triangleV = [];
            for(i=0,len=triangleData.length; i<len; i++) {
                trg = triangleData[i];
                triangleV.push(new navmesh.Triangle(
                    new navmesh.Vector2f(trg.a.x, trg.a.y),
                    new navmesh.Vector2f(trg.b.x, trg.b.y),
                    new navmesh.Vector2f(trg.c.x, trg.c.y)
                ));
            }
            this.triangleV = triangleV;
        },
        _buildCellV : function() {
            var triangleV = this.triangleV;
            var cellV = [];
            var trg;
            var cell;
            var i, j, len, len2;
            for (j=0, len=triangleV.length; j<len; j++) {
                trg = triangleV[j];
                cell = new navmesh.Cell(trg.getVertex(0), trg.getVertex(1), trg.getVertex(2));
                cell.index = j;
                cellV.push(cell);
            }

            for(i= 0, len=cellV.length; i<len; i++) {
                var pCellA = cellV[i];
                for(j= 0, len2=cellV.length; j<len2; j++) {
                    var pCellB = cellV[j];
                    if (pCellA != pCellB) {
                        pCellA.checkAndLink(pCellB);
                    }
                }
            }
            this.cellV = cellV;
            this.triangleV = null;
        },

        draw : function(context) {
            var triangleV = this.cellV;
            var i, len, trg;
            context.save();
            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = 'blue';
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
    };

    game.Path = Path;

})();