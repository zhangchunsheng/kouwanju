var achievementControl = (function(){

    var EA = wozllajs.EventAdmin;

    EA.on('allModule.close', function(){
        achievementControl.close();    
    });

    EA.on('achievementModule.open', function(){
        achievementControl.open();    
    });

    var module = null;

    return {
        init : function() {
            module = mainUIControl.getMainUIStage().findObjectById('achievementModule');
        },

        open : function(){
            // module.setActive(true);
            // module.setVisible(true);
        },

        close : function(){
            // module.setActive(false);
            // module.setVisible(false);
        },

        getModule : function(){
            return module;
        }
    }
})();