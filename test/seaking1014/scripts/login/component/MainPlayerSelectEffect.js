if(window.IDE) {
    IDE.ComponentRegistry.register('login.component.MainPlayerSelectEffect', []);
}

wozllajs.defineComponent('login.component.MainPlayerSelectEffect', {

    extend : 'Behaviour',

    alias : 'login.mainPlayerSelectEffect',

    tween : null,

    zoomin : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({ scaleX: 4, scaleY: 4, alpha: 0 }, 1500, createjs.Ease.quintOut)
            .call(function() {
                onComplete && onComplete();
            });
    },

    zoomout : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 1500, createjs.Ease.quintIn)
            .call(function() {
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});