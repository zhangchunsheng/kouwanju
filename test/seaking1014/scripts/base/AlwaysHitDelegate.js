if(window.IDE) {
    IDE.ComponentRegistry.register('base.AlwaysHitDelegate', []);
}

wozllajs.defineComponent('base.AlwaysHitDelegate', {

    extend : 'HitTestDelegate',

    alias : 'base.alwaysHit',

    testHit : function() {
        var obj = this.gameObject;
        return obj.isActive(true) &&
               obj.isVisible(true);
    }

});