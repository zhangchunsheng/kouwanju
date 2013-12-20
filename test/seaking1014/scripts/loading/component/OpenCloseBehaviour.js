if(window.IDE) {
    IDE.ComponentRegistry.register('loading.component.OpenCloseBehaviour', []);
}

wozllajs.defineComponent('loading.component.OpenCloseBehaviour', {

    extend : 'Behaviour',

    alias : 'loading.openClose',

    tween : null,

    working : false,

    leftDoor : null,

    rightDoor : null,

    logo : null,

    offset : null,

    opened : false,

    initComponent : function() {
        var stage = this.gameObject.getStage();
        this.leftDoor = this.gameObject.findObjectById('LeftDoor');
        this.rightDoor = this.gameObject.findObjectById('RightDoor');
        this.logo = this.gameObject.findObjectById('Logo');
        this.leftDoor.transform.x = -stage.width/2;
        this.rightDoor.transform.x = stage.width;
    },

    open : function(onOpen) {
        var me = this;
        var stage = this.gameObject.getStage();
        this.gameObject.setActive(true);
        this.offset = {
            lx : this.leftDoor.transform.x,
            rx : this.rightDoor.transform.x
        };
        this.tween = createjs.Tween.get(this.offset)
            .to({
                lx: -40,
                rx : stage.width/2 + 40
            }, 300, createjs.Ease.getBackOut(3))
            .wait(200)
            .to({
                lx: -stage.width/2,
                rx: stage.width
            }, 200).call(function() {
                onOpen && onOpen();
                me.working = false;
                me.opened = true;
                me.logo.setActive(false);
            });
        this.working = true;
    },

    close : function(onClose) {
        var me = this;
        var stage = this.gameObject.getStage();
        this.opened = false;
        this.gameObject.setActive(true);
        this.offset = {
            lx : this.leftDoor.transform.x,
            rx : this.rightDoor.transform.x
        };
        this.tween = createjs.Tween.get(this.offset)
            .to({
                lx: -40,
                rx : stage.width/2 + 40
            }, 300, createjs.Ease.getBackOut(1.5))
            .wait(200)
            .to({
                lx: 0,
                rx: stage.width/2
            }, 200).call(function() {
                me.working = false;
                me.tween = null;
                me.logo.setActive(true);
                onClose && onClose();
            });
        this.working = true;
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
        if(this.offset) {
            this.leftDoor.transform.x = this.offset.lx;
            this.rightDoor.transform.x = this.offset.rx;
        }
        if(!this.working) {
            this.tween = null;
            if(this.opened) {
                this.gameObject.setActive(false);
            } else {
//                this.offset.lx = 0;
//                this.offset.rx = stage.width/2;
            }
        }
    }

});