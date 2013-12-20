if(window.IDE) {
    IDE.ComponentRegistry.register('battle.inst.StarAnimation', []);
}

wozllajs.defineComponent('battle.inst.StarAnimation', {

    extend : 'Behaviour',

    alias : 'battle.inst.starAnimation',

    tween : null,

    animate : function() {
        var me = this;
        this.tween = createjs.Tween.get(this.gameObject.transform, null, null, true)
            .to({ scaleX: 1, scaleY: 1, alpha: 1 }, 400, createjs.Ease.quintIn).call(function() {
                me.tween = null;
                me.playEffect();
            });
    },

    playEffect : function() {
        var effectObj;
        if(this.gameObject.id === 'Star1') {
            effectObj = this.gameObject.getParent().getObjectById('Effect1');
        } else if(this.gameObject.id === 'Star2') {
            effectObj = this.gameObject.getParent().getObjectById('Effect2');
        }
        effectObj.setActive(true);
        effectObj.getRenderer().addEventListener('animationend', function() {
            effectObj.setActive(false);
        }, true);
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
    }

});