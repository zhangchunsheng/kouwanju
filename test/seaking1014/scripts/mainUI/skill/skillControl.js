var skillControl = (function(){

    var EA = wozllajs.EventAdmin;

    EA.on('allModule.close', function(){
        skillControl.close();    
    });

    EA.on('skillModule.open', function(){
        skillControl.open();    
    });

    var module = null;

    var chSelectPart = null;

    return {
        init : function() {
            module = mainUIControl.getMainUIStage().findObjectById('skillModule');
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