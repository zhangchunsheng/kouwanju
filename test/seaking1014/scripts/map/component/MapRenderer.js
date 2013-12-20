if(window.IDE) {
    IDE.ComponentRegistry.register('map.component.MapRenderer', [{
        name : 'folder',
        type : 'IDE_text',
        required: true
    }, {
        name : 'rows',
        type : 'IDE_number',
        required: true
    }, {
        name : 'cols',
        type : 'IDE_number',
        required: true
    }]);
}

wozllajs.defineComponent('map.component.MapRenderer', {

    extend : 'Renderer',

    alias : 'renderer.map',

    folder : null,

    rows : null,
    cols : null,

    roundRows : null,
    roundCols : null,

    images : null,

    stage : null,

    initComponent : function() {
        var i, count;
        this.stage = this.gameObject.getStage();
        if(this.folder && this.rows && this.cols) {
            this.images = [];
            count = this.roundRows * this.roundCols;
            for(i=0; i<count; i++) {
                this.images.push(this.getResourceById(this.folder + '/' + i + '.jpg'));
            }
        }
    },

    draw : function(context, visibleRect) {
        var i,j;
        var x, y;
        var rectIntersection2 = wozllajs.geom.rectIntersection2;
        var stage = this.stage;
        var images = this.images;
        var renderWidth = 683;
        var renderHeight = 683;
        var rw, rh;
        var img;
        for(i=0; i<this.rows; i++) {
            for(j=0; j<this.cols; j++) {
                img = images[i*this.roundCols+j];
                if(img) {
                    x = j*renderWidth;
                    y = i*renderHeight;
                    if(rectIntersection2(x, y, renderWidth, renderHeight,
                        visibleRect.x, visibleRect.y, visibleRect.width, visibleRect.height)) {
                        if(img.width === 510) {
                            rw = 684;
                        } else {
                            rw = 342;
                        }
                        if(img.height === 510) {
                            rh = 684;
                        } else {
                            rh = 342;
                        }
                        context.drawImage(img, 0, 0, img.width, img.height, x, y, rw, rh);
                    }
                }
            }
        }
    },

    getSize : function() {
        var renderWidth = 683;
        var renderHeight = 683;
        return {
            width : parseInt(renderWidth * this.cols),
            height : parseInt(renderHeight * this.rows)
        };
    },

    _collectResources : function(collection) {
        var i, count;
        if(this.folder && this.rows && this.cols) {
            this.roundRows = Math.round(this.rows);
            this.roundCols = Math.round(this.cols);

            count = this.roundRows * this.roundCols;
            for(i=0; i<count; i++) {
                collection.push(this.folder + '/' + i + '.jpg');
            }
        }
    }

});