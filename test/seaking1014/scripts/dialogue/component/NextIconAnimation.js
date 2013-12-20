if(window.IDE) {
    IDE.ComponentRegistry.register('dialogue.component.NextIconAnimation', []);
}

wozllajs.defineComponent('dialogue.component.NextIconAnimation', {

    extend : 'Behaviour',

    alias : 'dialogue.nextIconAnimation',

    silent : true,

    offsetY : 0,

    tween : null,

    initComponent : function() {
        var offsetY = this.offsetY = this.gameObject.transform.y;
        this.tween = createjs.Tween.get(this, {loop:true})
            .to({offsetY : offsetY + 10 }, 250).to({ offsetY : offsetY}, 500);
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
        this.gameObject.transform.y = this.offsetY;
    }

});