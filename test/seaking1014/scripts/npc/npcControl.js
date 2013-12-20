var npcControl = (function() {

    var EA = wozllajs.EventAdmin;

    EA.on('npc.click', function(e) {
        var npcId = e.npcId || e.gameObject.id;
        var pos = {
            x :e.gameObject.transform.x,
            y :e.gameObject.transform.y+30
        };
        if(npcId === 'NPC0101') {
            pos.x += 200;
            pos.y += 300;
        }
        playerControl.walkTo(pos, function() {
            EA.notify('npc.talk', {
                npcId : npcId
            });
        });
    });

    return {
        showNpc : function(npcId) {
            mapControl.getCurrentMapStage().findObjectById(npcId).setActive(true);
        },

        hideNpc : function(npcId) {
            mapControl.getCurrentMapStage().findObjectById(npcId).setActive(false);
        },
        symbolNpc : function(npcId, symbol) {
            mapControl.getCurrentMapStage().findObjectById(npcId)
                .getObjectById('Symbol').getRenderer().setSymbol(symbol);
        }
    };

})();