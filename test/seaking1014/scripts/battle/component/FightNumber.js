if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.FightNumber', []);
}

wozllajs.defineComponent('battle.component.FightNumber', {

    extend : 'Renderer',

    alias : 'battle.fightNumber',

    src : 'resources/texture/fight_font.tt.png',

    image : null,

    numberWidth : 20,

    types : {
        0 : 'normal'
    },

    frames : {
        font : {
        },
        normal : {
            '-' : { x: 170, y: 315, w: 38, h: 105 }
        }
    },

    numberIdGen : 0,
    numbers : {},

    initComponent : function() {
        var i, len;
        this.image = this.getResourceById(this.src);
        for(i=0; i<10; i++) {
            this.frames.normal[i+''] = {
                x : 208 + i*38,
                y : 105,
                w : 38,
                h : 105
            };
        }
    },

    bubble : function(type, number, pos, camp) {
        var me = this;
        var id = 'number_' + this.numberIdGen++;
        var frames = [];
        var definedFrames = this.frames[this.types[type]];
        var numberStr = number + '';
        var i, len;
        for(i=0,len=numberStr.length; i<len; i++) {
            frames.push(definedFrames[numberStr[i]]);
        }
        this.numbers[id] = {
            type : type,
            number : number,
            frames : frames,
            pos : pos,
            tween : createjs.Tween.get(pos, null, null, true).to({
                y : pos.y - 50,
                x : camp === 'player' ? pos.x - 30 : pos.x + 30
            }, 800, createjs.Ease.getPowOut(10)).call(function() {
                delete me.numbers[id];
            })
        };
    },

    update : function() {
        var delta = wozllajs.Time.delta;
        for(var id in this.numbers) {
            this.numbers[id].tween.tick(delta);
        }
    },

    draw : function(context, visibleRect) {
        if(this.image) {
            var i, len, id, pos, frames, f, ox = 0;
            for(id in this.numbers) {
                pos = this.numbers[id].pos;
                frames = this.numbers[id].frames;
                ox = 0;
                for(i=0,len=frames.length; i<len; i++) {
                    f = frames[i];
                    context.drawImage(this.image, f.x, f.y, f.w, f.h, pos.x + ox - 40, pos.y - 100, f.w, f.h);
                    ox += f.w-18;
                }
            }
        }
    },

    _collectResources : function(collection) {
        collection.push(this.src);
    }

});