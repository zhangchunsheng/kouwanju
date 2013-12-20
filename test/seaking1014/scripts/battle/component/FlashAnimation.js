if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.FlashAnimation', []);
}

wozllajs.defineComponent('battle.component.FlashAnimation', {

    extend : 'Behaviour',

    alias : 'battle.flashAnimation',

    tween : null,

    animate : function(onComplete) {
        var me = this;
        this.gameObject.transform.x = -163;
        this.gameObject.transform.y = -512;
        this.tween = createjs.Tween.get(this.gameObject.transform, null, null, true)
            .to({ x: 183, y: 512 }, 200).call(function() {
                me.tween = null;
                onComplete && onComplete();
            });
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
    }

});