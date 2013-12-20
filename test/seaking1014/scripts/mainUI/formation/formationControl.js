var formationControl = (function(){

    var EA = wozllajs.EventAdmin;

    EA.on('allModule.close', function(){
        formationControl.close();    
    });

    EA.on('formationModule.open', function(){
        formationControl.open();    
    });

    var module = null;

    return {
        init : function() {
            module = mainUIControl.getMainUIStage().findObjectById('formationModule');
            chSelectPart = mainUIControl.getMainUIStage().findObjectById('chSelect');
        },

        open : function(){
            // module.setActive(true);
            // module.setVisible(true);
            // chSelectPart.setActive(true);
            // chSelectPart.setVisible(true);
        },

        close : function(){
            // module.setActive(false);
            // module.setVisible(false);
            // chSelectPart.setActive(false);
            // chSelectPart.setVisible(false);
        },

        getModule : function(){
            return module;
        }
    }
})();