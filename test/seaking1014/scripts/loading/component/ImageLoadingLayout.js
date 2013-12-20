if(window.IDE) {
    IDE.ComponentRegistry.register('loading.component.ImageLoadingLayout', []);
}

wozllajs.defineComponent('loading.component.ImageLoadingLayout', {

    extend : 'Layout',

    alias : 'loading.layout.image',

    doLayout : function() {
        var gameObj = this.gameObject;
        var stageW = gameObj.getStage().width;
        gameObj.getObjectById('RightDoor').transform.x = stageW/2;
        gameObj.getObjectById('Logo').transform.x = stageW/2 - 103;
        // E97764C2
    }

});