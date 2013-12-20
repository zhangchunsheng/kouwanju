var upgradeControl = (function(){

    var EA = wozllajs.EventAdmin;

    EA.on('allModule.close', function(){
        upgradeControl.close();    
    });

    EA.on('upgradeModule.open', function(){
        upgradeControl.open();    
    });

    var module = null;

    return {
        init : function() {
            module = mainUIControl.getMainUIStage().findObjectById('upgradeModule');
            chSelectPart = mainUIControl.getMainUIStage().findObjectById('chSelect');
            chInfoPart = mainUIControl.getMainUIStage().findObjectById('chInfo');
            itemsPart = mainUIControl.getMainUIStage().findObjectById('items');
        },

        open : function(){
            // module.setActive(true);
            // module.setVisible(true);
            // chSelectPart.setActive(true);
            // chSelectPart.setVisible(true);
            // chInfoPart.setActive(true);
            // chInfoPart.setVisible(true);
            // itemsPart.setActive(true);
            // itemsPart.setActive(true);
        },

        close : function(){
            // module.setActive(false);
            // module.setVisible(false);
            // chSelectPart.setActive(false);
            // chSelectPart.setVisible(false);
            // chInfoPart.setActive(false);
            // chInfoPart.setVisible(false);
            // itemsPart.setActive(false);
            // itemsPart.setActive(false);
        },

        getModule : function(){
            return module;
        }
    }
})();