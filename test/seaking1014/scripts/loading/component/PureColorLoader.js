if(window.IDE) {
    IDE.ComponentRegistry.register('loading.component.PureColorLoader', []);
}

wozllajs.defineComponent('loading.component.PureColorLoader', {

    extend : 'Behaviour',

    alias : 'loading.pureColorLoader',

    tween : null,

    working : false,

    fade : false,

    open : function(param) {
        var me = this;
        this.gameObject.setActive(true);
        param = param || {};
        param.time = param.time || 1000;
        this.tween = createjs.Tween.get(this.gameObject.transform).to({alpha:0}, param.time).call(function() {
            me.working = false;
            me.fade = true;
            param.onComplete && param.onComplete();
        });
        this.working = true;
    },

    close : function(param) {
        var me = this;
        this.gameObject.setActive(true);
        param = param || {};
        param.time = param.time || 1000;
        param.color = param.color || '#000000';
        this.gameObject.getRenderer().color = param.color;
        this.tween = createjs.Tween.get(this.gameObject.transform).to({alpha:1}, param.time).call(function() {
            me.working = false;
            param.onComplete && param.onComplete();
        });
        this.working = true;
        this.fade = false;
    },

    update : function() {
        if(this.tween) {
            this.tween.tick(wozllajs.Time.delta);
        }
        if(!this.working) {
            if(this.fade) {
                this.gameObject.setActive(false);
            }
            this.tween = null;
        }
    }

});