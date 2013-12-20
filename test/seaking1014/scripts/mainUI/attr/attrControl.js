var attrControl = (function(){

    var EA = wozllajs.EventAdmin;

    EA.on('allModule.close', function(){
        attrControl.close();    
    });

    EA.on('attrModule.open', function(){
        attrControl.open();    
    });

    var module = null;

    var object = null;
    
    var renderer = null;

    var chSelectPart = null;

    var attack = 0;

    var defense = 0;

    var speed = 0;

    var focus = 0;

    var criticalHit = 0;

    var counter = 0;

    var block = 0;

    var dodge = 0;

    return {
        init : function() {
            module = mainUIControl.getMainUIStage().findObjectById('attrModule');
            attr = module.findObjectByPath('AttrInfo.Attributes');
            renderer = attr.getRenderer();
            chSelectPart = mainUIControl.getMainUIStage().findObjectById('chSelect');
            chInfoPart = mainUIControl.getMainUIStage().findObjectById('chInfo');
        },

        initAttr : function(model){
            //This function should be modified to add attributes of all players.
            attack = this.furnish(model.attack);
            defense = this.furnish(model.defense);
            speed = this.furnish(model.speed);
            focus = this.furnish(model.focus);
            criticalHit = this.furnish(model.criticalHit);
            counter = this.furnish(model.counter);
            block = this.furnish(model.block);
            dodge = this.furnish(model.dodge);
        },

        furnish: function(num){
            var result = ((num*100)-(num*100)%1)/100;
            return result;
        },

        setAttrToRenderer : function(){
        //This function should be executed according to the player selected.
            renderer.attack = attack;
            renderer.defense = defense;
            renderer.speed = speed;
            renderer.focus = focus;
            renderer.criticalHit = criticalHit;
            renderer.counter = counter;
            renderer.block = block;
            renderer.dodge = dodge;
        },

        open : function(){
            // module.setActive(true);
            // module.setVisible(true);
            // chSelectPart.setActive(true);
            // chSelectPart.setVisible(true);
            // chInfoPart.setActive(true);
            // chInfoPart.setVisible(true);
        },

        close : function(){
            // module.setActive(false);
            // module.setVisible(false);
            // chSelectPart.setActive(false);
            // chSelectPart.setVisible(false);
            // chInfoPart.setActive(false);
            // chInfoPart.setVisible(false);
        },

        getModule : function(){
            return module;
        }
    }
})();