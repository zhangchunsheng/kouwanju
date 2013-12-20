var shopControl = (function() {

    var EA = wozllajs.EventAdmin;

    var shopStage;

    EA.on('npc.talk', function(e) {
        if(e.npcId === 'DaoJuShangRen') {
            shopControl.open();
        }
    });

    EA.on('ShopCloseBtn.click', function() {
        shopControl.close();
    });

    return {
        initShopStage : function(onComplete) {
            shopStage = game.initScene('main', 'UI_shop', onComplete);
        },

        open : function(onComplete) {
            shopControl.initShopStage(onComplete);
        },

        close : function() {
            shopStage && shopStage.destroy();
            shopStage = null;
        },

        tick : function() {
            shopStage && shopStage.tick();
        }
    };

})();