var worldmapControl = (function() {

    var EA = wozllajs.EventAdmin;

    var worldmapStage;

    EA.on('MiniMapBtn.click', function() {
        worldmapControl.open();
    });

    EA.on('WorldMapReturnBtn.click', function() {
        worldmapControl.close();
    });

    return {

        open : function(onComplete) {
            worldmapStage = game.initScene('main', 'UI_worldmap', function() {
                // TODO init chat content
                onComplete && onComplete();
            });
        },

        close : function() {
            worldmapStage && worldmapStage.destroy();
            worldmapStage = null;
        },

        tick : function() {
            worldmapStage && worldmapStage.tick();
        }
    }

})();