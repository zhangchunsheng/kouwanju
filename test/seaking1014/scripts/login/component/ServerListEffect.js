if(window.IDE) {
    IDE.ComponentRegistry.register('login.component.ServerListEffect', []);
}

wozllajs.defineComponent('login.component.ServerListEffect', {

    extend : 'Behaviour',

    alias : 'login.serverListEffect',

    alert : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({scaleX: 1, scaleY: 1}, 500, createjs.Ease.quintOut)
            .call(function() {
                onComplete && onComplete();
            });
    },

    close : function(onComplete) {
        this.tween = createjs.Tween.get(this.gameObject.transform)
            .to({scaleX: 0, scaleY: 0}, 500, createjs.Ease.quintIn)
            .call(function() {
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});