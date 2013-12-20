if(window.IDE) {
    IDE.ComponentRegistry.register('base.AlertEffect', []);
}

wozllajs.defineComponent('base.AlertEffect', {

    extend : 'Behaviour',

    alias : 'base.alert',

    alert : function(onComplete) {
        this.gameObject.setActive(true);
        this.tween = createjs.Tween.get(this.gameObject.transform, null, null, true)
            .to({scaleX: 1, scaleY: 1}, 400, createjs.Ease.getBackOut(1))
            .call(function() {
                onComplete && onComplete();
            });
    },

    close : function(onComplete) {
        var me = this;
        this.tween = createjs.Tween.get(this.gameObject.transform, null, null, true)
            .to({scaleX: 0, scaleY: 0}, 250, createjs.Ease.cubicIn)
            .call(function() {
                me.gameObject.setActive(false);
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});