if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.CameraFollow', []);
}

wozllajs.defineComponent('player.component.CameraFollow', {

    extend : 'Behaviour',

    alias : 'player.cameraFollow',

    follow : true,

    setFollow : function(follow) {
        this.follow = follow;
    },

    update : function() {
        var x, y, mapStage, mapTrans, mapSize, playerTrans;
        if(this.follow) {
            mapStage = mapControl.getCurrentMapStage();
            if(mapStage) {
                playerTrans = this.gameObject.transform;
                mapSize = mapControl.getSize();
                mapTrans = mapStage.transform;
                x = playerTrans.x - mapStage.width/2;
                y = playerTrans.y - mapStage.height/2;
                if(x < 0) x = 0;
                if(x > mapSize.width-mapStage.width) x = mapSize.width-mapStage.width;
                if(y < 0) y = 0;
                if(y > mapSize.height-mapStage.height) y = mapSize.height-mapStage.height;
                mapTrans.x = -x;
                mapTrans.y = -y;
            }
        }
    }

});