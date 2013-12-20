var mainUIControl = (function(){
	var EA = wozllajs.EventAdmin;
	var mainUIStage;

	EA.on('MenuButton.click', null, function(){
		mainUIControl.openWindow();
	});

    EA.on('attrSwitch.click', null, function(){
        mainUIControl.switchTo('attrModule');
    });

    EA.on('skillSwitch.click', null, function(){
        mainUIControl.switchTo('skillModule');
    });

    EA.on('formationSwitch.click', null, function(){
        mainUIControl.switchTo('formationModule');
    });

    EA.on('upgradeSwitch.click', null, function(){
        mainUIControl.switchTo('upgradeModule');
    });

    EA.on('bagSwitch.click', null, function(){
        mainUIControl.switchTo('bagModule');
    });

    EA.on('achievementSwitch.click', null, function(){
        mainUIControl.switchTo('achievementModule');
    });

    EA.on('MainClose.click', null, function(){
        mainUIControl.closeWindow();
    });

	return {

		initWindow : function(onComplete){
            mainUIStage = game.initScene('main', 'UI_main', function() {
            	attrControl.init();
                skillControl.init();
                formationControl.init();
                upgradeControl.init();
                bagControl.init();
                achievementControl.init();


                //TODO OPEN
            	attrControl.setAttrToRenderer();
                
                onComplete && onComplete();
            });
		},

		openWindow : function() {
            // this.initWindow();
        },

        tick : function() {
            mainUIStage && mainUIStage.tick();
        },

        switchTo : function(moduleString){
            EA.notify('allModule.close');
            EA.notify(moduleString+'.open');
        },

        getMainUIStage : function(){
            return mainUIStage;
        },

        closeWindow : function() {
            mainUIStage && mainUIStage.destroy();
            mainUIStage = null;
        },

        //ALL FOR TEST
        _testOpen : function(moduleString){
            EA.notify(moduleString+'.open');
        },

        _testClose : function(){
            EA.notify('allModule.close');
        }
	}
})();