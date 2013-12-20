if(window.IDE) {
    IDE.ComponentRegistry.register('login.component.CloudEffect', []);
}

wozllajs.defineComponent('login.component.CloudEffect', {

    extend : 'Behaviour',

    alias : 'login.cloudEffect',

    tween : null,

    zoomin : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({ scaleX:1, scaleY:1 }, 1500, createjs.Ease.quintOut)
            .call(function() {
                onComplete && onComplete();
            });
    },

    zoomout : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({ scaleX:0.25, scaleY:0.25 }, 1500, createjs.Ease.quintIn)
            .call(function() {
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});