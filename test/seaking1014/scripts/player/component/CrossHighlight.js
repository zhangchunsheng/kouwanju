if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.CrossHighlight', []);
}

wozllajs.defineComponent('player.component.CrossHighlight', {

    extend : 'Behaviour',

    alias : 'player.crossHighlight',

    update : function() {
        var trans = this.gameObject.transform;
        if(mapControl.isCross(trans.x, trans.y)) {
            trans.alpha = 0.5;
        } else {
            trans.alpha = 1;
        }
    }

});