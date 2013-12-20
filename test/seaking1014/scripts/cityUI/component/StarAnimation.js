if(window.IDE) {
    IDE.ComponentRegistry.register('cityUI.component.StarAnimation', []);
}

wozllajs.defineComponent('cityUI.component.StarAnimation', {

    extend : 'Behaviour',

    alias : 'cityUI.starAnimation',

    silent : true,

    tween : null,

    initComponent : function() {
        this.tween = createjs.Tween.get(this.gameObject.transform, {loop:true})
            .to({ scaleX : 0.5, scaleY : 0.5 }, 500)
            .to({ scaleX : 0.9,   scaleY : 0.9   }, 500);
    },

    update : function() {
        this.tween.tick(wozllajs.Time.delta);
    }

});