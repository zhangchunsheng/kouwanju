if(window.IDE) {
    IDE.ComponentRegistry.register('cityUI.component.TaskTips', []);
}

wozllajs.defineComponent('cityUI.component.TaskTips', {

    extend : 'Behaviour',

    alias : 'cityUI.taskTips',

    tween : null,

    hideTimer : null,

    tips : function(type, onComplete) {
        var me = this;
        var trans = this.gameObject.transform;
        if(type === 'accept') {
            this.gameObject.getObjectById('Text').getRenderer().changeFrameIndex(3);
            this.gameObject.getObjectById('Star').getRenderer().changeFrameIndex(1);
        }
        else if(type === 'finish') {
            this.gameObject.getObjectById('Text').getRenderer().changeFrameIndex(2);
            this.gameObject.getObjectById('Star').getRenderer().changeFrameIndex(0);
        }

        trans.scaleX = 0;
        this.gameObject.setActive(true);
        this.hideTimer && clearTimeout(this.hideTimer);
        this.tween = createjs.Tween.get(trans)
            .to({ scaleX : 1 }, 120).call(function() {
                me.hideTimer = setTimeout(function() {
                    me.hideTimer = null;
                    me.tween = createjs.Tween.get(trans)
                        .to({ scaleX : 0 }, 80).call(function() {
                            me.tween = null;
                            me.gameObject.setActive(false);
                        });
                }, 2000);
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});