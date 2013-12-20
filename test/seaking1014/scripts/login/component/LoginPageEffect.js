if(window.IDE) {
    IDE.ComponentRegistry.register('login.component.LoginPageEffect', []);
}

wozllajs.defineComponent('login.component.LoginPageEffect', {

    extend : 'Behaviour',

    alias : 'login.loginPageEffect',

    tween : null,

    loginFormY : 0,

    buttonsY : 0,

    alpha : 1,

    initComponent : function() {
        this.loginFormY = this.gameObject.getObjectById('LoginForm').transform.y;
        this.buttonsY = this.gameObject.getObjectById('Buttons').transform.y;
    },

    fadeOut : function(onComplete) {
        this.tween = createjs.Tween.get(this)
            .to({ loginFormY : this.loginFormY-100, buttonsY : this.buttonsY+100, alpha : 0 }, 400, createjs.Ease.cubicOut)
            .call(function() {
                onComplete && onComplete();
            });
    },

    fadeIn : function(onComplete) {
        this.tween = createjs.Tween.get(this)
            .to({ loginFormY : this.loginFormY+100, buttonsY : this.buttonsY-100, alpha : 1 }, 400, createjs.Ease.cubicIn)
            .call(function() {
                onComplete && onComplete();
            });
    },

    update : function() {
        this.tween && this.tween.tick(wozllajs.Time.delta);
        this.gameObject.getObjectById('LoginForm').transform.y = this.loginFormY;
        this.gameObject.getObjectById('Buttons').transform.y = this.buttonsY;
        this.gameObject.transform.alpha = this.alpha;
    }

});