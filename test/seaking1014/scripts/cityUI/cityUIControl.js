var cityUIControl = (function() {

    var EA = wozllajs.EventAdmin;

    var cityUIStage;
    var working = true;

    var mainPlayerInfo = {
        level : 1,
        money : 1,
        gold : 1,
        hp : 1,
        maxHp : 1
    };

    EA.on('ChatBtn.click', function() {
        cityUIStage.findObjectById('ChatBtn').setActive(false);
        cityUIStage.findObjectById('ChatFrame').setActive(true);
    });

    EA.on('ChatCloseBtn.click', function() {
        cityUIStage.findObjectById('ChatBtn').setActive(true);
        cityUIStage.findObjectById('ChatFrame').setActive(false);
        cityUIControl.tipsChat(false);
    });

    EA.on('ChatFrame.click', function() {
        chatControl.open();
    });



    return {

        initMainPlayerInfo : function(playerInfo) {
            mainPlayerInfo = playerInfo
        },

        initCityStage : function(onComplete) {
            cityUIStage = game.initScene('main', 'UI_city', function() {
                cityUIControl.updateLevel(mainPlayerInfo.level+'');
                cityUIControl.updateGold(mainPlayerInfo.money+'');
                cityUIControl.updateMoney(mainPlayerInfo.money+'');
                cityUIControl.updateHP(mainPlayerInfo.hp, mainPlayerInfo.maxHp);
                cityUIControl.appendChatMessages(chatControl.getMessages());
                onComplete && onComplete();
            });
        },

        updateLevel : function(level) {
            cityUIStage.findObjectByPath('PlayerInfo.LevelBg.Text').getRenderer().text = level;
        },

        updateMoney : function(money) {
            cityUIStage.findObjectByPath('PlayerInfo.Ying').getRenderer().text = money;
        },

        updateGold : function(gold) {
            cityUIStage.findObjectByPath('PlayerInfo.Jing').getRenderer().text = gold;
        },

        updateHP : function(blood, maxBlood) {
            var hpObj = cityUIStage.findObjectByPath('PlayerInfo.HP');
            var hpRenderer = hpObj.getRenderer();
            var frame = hpRenderer.frames[hpRenderer.index];
            hpRenderer.currentFrame = frame;
            frame.sw = parseInt(frame.w * blood / maxBlood);
            cityUIStage.findObjectByPath('PlayerInfo.HP.Text').getRenderer().text = blood + '/' + maxBlood;
        },

        tipsAcceptTask : function(onComplete) {
            cityUIStage.findObjectByPath('UI_city.RightFloat.TaskBox.StatusTips')
                .getBehaviour('cityUI.taskTips').tips('accept', onComplete);
        },

        tipsFinishTask : function(onComplete) {
            cityUIStage.findObjectByPath('UI_city.RightFloat.TaskBox.StatusTips')
                .getBehaviour('cityUI.taskTips').tips('finish', onComplete);
        },

        tipsTask : function(flag) {
            cityUIStage.findObjectByPath('UI_city.RightFloat.TaskBox.BubbleTips').setActive(flag);
        },

        tipsEmail : function(flag) {
            cityUIStage.findObjectByPath('UI_city.RightFloat.MailBox.BubbleTips').setActive(flag);
        },

        tipsChat : function(flag) {
            cityUIStage.findObjectByPath('UI_city.ChatBtn.BubbleTips').setActive(flag);
        },

        appendChatMessages : function(msgs) {
            var msgRenderer = cityUIStage.findObjectByPath('UI_city.ChatFrame.Messages').getRenderer();
            msgRenderer.addMessages(msgs);
            cityUIControl.tipsChat(true);
            if(msgRenderer.messages.length > 3) {
                msgRenderer.messages = msgRenderer.messages.slice(msgRenderer.messages.length - 3);
            }
        },

        appendChatMessage : function(msg) {
            var msgRenderer = cityUIStage.findObjectByPath('UI_city.ChatFrame.Messages').getRenderer();
            msgRenderer.addMessage(msg);
            cityUIControl.tipsChat(true);
            if(msgRenderer.messages.length > 3) {
                msgRenderer.messages.shift();
            }
        },

        setWorking : function(flag) {
            working = flag;
        },

        tick : function() {
            working && cityUIStage && cityUIStage.tick();
        }
    }

})();