if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.PKAnimation', []);
}

wozllajs.defineComponent('battle.component.PKAnimation', {

    extend : 'Behaviour',

    alias : 'battle.PKAnimation',

    working : false,

    left : null,
    maskL : null,
    right : null,
    maskR : null,
    effect : null,
    flash : null,

    offset : null,

    opened : false,

    initComponent : function() {
        var stage = this.gameObject.getStage();
        this.left = this.gameObject.findObjectById('Left');
        this.right = this.gameObject.findObjectById('Right');
        this.effect = this.gameObject.findObjectById('Effect');
        this.flash = this.gameObject.findObjectById('Flash');
        this.maskL = this.gameObject.findObjectById('MaskL');
        this.maskR = this.gameObject.findObjectById('MaskR');
        this.maskL.transform.x = this.left.transform.x = -stage.width/2;
        this.maskR.transform.x = this.right.transform.x = stage.width/2;
    },

    open : function(onOpen) {
        var me = this;
        var stage = this.gameObject.getStage();
        this.gameObject.setActive(true);
        this.offset = {
            lx : this.left.transform.x,
            rx : this.right.transform.x
        };
        this.tween = createjs.Tween.get(this.offset).to({
                lx: -stage.width/2,
                rx: stage.width/2
            }, 150).call(function() {
                onOpen && onOpen();
                me.working = false;
                me.opened = true;
            });
        this.working = true;
    },

    close : function(onClose) {
        var me = this;
        var stage = this.gameObject.getStage();
        me.opened = false;
        this.gameObject.setActive(true);
        this.offset = {
            lx : this.left.transform.x,
            rx : this.right.transform.x
        };
        this.tween = createjs.Tween.get(this.offset).to({
                lx: 0,
                rx: 0
            }, 150).call(function() {
                me.working = false;
                onClose && onClose();
            });
        this.working = true;
    },

    animate : function(onComplete) {
        var me = this;
        this.close(function() {
            me.effect.setActive(true);
            me.left.getObjectById('P').setActive(true);
            me.left.getObjectById('BlurP').setActive(false);
            me.right.getObjectById('K').setActive(true);
            me.right.getObjectById('BlurK').setActive(false);
            me.effect.getRenderer().addEventListener('animationend', function() {
                me.effect.setActive(false);
                me.flash.getBehaviour('battle.flashAnimation').animate(function() {
                    me.open(onComplete);
                });
            }, true);
        });
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
        if(this.offset) {
            this.maskL.transform.x = this.left.transform.x = this.offset.lx;
            this.maskR.transform.x = this.right.transform.x = this.offset.rx;
        }
        if(!this.working) {
            this.tween = null;
            if(this.opened) {
                this.gameObject.setActive(false);
            }
        }
    }

});