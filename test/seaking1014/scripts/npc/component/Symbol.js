if(window.IDE) {
    IDE.ComponentRegistry.register('npc.component.Symbol', [{
        name : 'symbol',
        type : 'IDE_text'
    }]);
}

wozllajs.defineComponent('npc.component.Symbol', {

    extend : 'Renderer',

    alias : 'npc.symbol',

    symbolFrames : {
        '!' : {
            sx : 0,
            sy : 0
        },
        '!.' : {
            sx : 49,
            sy : 0
        },
        '?' : {
            sx : 98,
            sy : 0
        },
        '?.' : {
            sx : 147,
            sy : 0
        }
    },

    width : 49,
    height : 68,

    symbol : null,

    currentFrame : null,

    src : 'resources/temp/symbol.png',

    image : null,

    offsetY : 0,

    tween : null,

    initComponent : function() {
        var offsetY = this.offsetY = this.gameObject.transform.y;
        this.tween = createjs.Tween.get(this, {loop:true})
            .to({offsetY : offsetY + 10 }, 500).to({ offsetY : offsetY}, 500);
        this.image = this.getResourceById(this.src);
        this.currentFrame = this.symbolFrames[this.symbol];
    },

    update : function() {
        if(this.currentFrame && this.image) {
            this.tween && this.tween.tick(wozllajs.Time.delta);
            this.gameObject.transform.y = this.offsetY;
        }
    },

    draw : function(context) {
        if(this.currentFrame && this.image) {
            context.drawImage(this.image, this.currentFrame.sx, this.currentFrame.sy,
                this.width, this.height,
                0, 0, this.width, this.height);
        }
    },

    setSymbol : function(symbol) {
        this.currentFrame = this.symbolFrames[symbol];
        this.symbol = symbol;
    },

    _collectResources : function(collection) {
        collection.push(this.src);
    }

});