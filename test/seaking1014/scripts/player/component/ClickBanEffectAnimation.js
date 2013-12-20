if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.ClickBanEffectAnimation', []);

}

wozllajs.defineComponent('player.component.ClickBanEffectAnimation', {

    extend : 'Behaviour',

    alias : 'player.clickBanEffectAnimation',

    tween : null,

    play : function() {
        var me = this;
        var trans = this.gameObject.transform;
        this.gameObject.setActive(true);
        trans.scaleX = 0;
        trans.scaleY = 0;
        trans.alpha = 1;
        this.tween = createjs.Tween.get(trans)
            .to({
                scaleX : 1,
                scaleY : 1
            }, 80)
            .to({
                alpha : 0
            }, 600).call(function() {
                me.gameObject.setActive(false);
                me.tween = null;
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
    }

});