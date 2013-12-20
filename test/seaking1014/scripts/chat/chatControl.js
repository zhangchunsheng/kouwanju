var chatControl = (function() {

    var EA = wozllajs.EventAdmin;

    var chatStage;

    var messages = [{
        name : 'name',
        text : 'text'
    }, {
        name : 'name',
        text : 'text'
    }, {
        name : 'name',
        text : 'text'
    }];

    EA.on('ChatPanelCloseBtn.click', function() {
        chatControl.close();
    });

    EA.on('ChatSendBtn.click', function() {
        chatControl.sendText();
    });

    EA.on('chat.msg.new', function(msg) {
        messages.push(msg);
        cityUIControl.appendChatMessage(msg);
        chatControl.appendChatMessage(msg)
    });

    return {

        open : function(onComplete) {
            chatStage = game.initScene('main', 'UI_chat', function() {
                // TODO init chat content
                chatControl.appendChatMessages(messages);
                onComplete && onComplete();
            });
        },

        close : function() {
            chatStage && chatStage.destroy();
            chatStage = null;
        },

        sendText : function() {
            var text = chatStage.findObjectByPath('Input.Text').getRenderer().text;
            if(text) {
                EA.notify('chat.msg.new', {
                    name : 'NickName',
                    text : '这个游戏真好玩!'
                });
            }
        },

        appendChatMessages : function(msgs) {
            chatStage.findObjectById('Messages').getRenderer().addMessages(msgs);
        },

        appendChatMessage : function(msg) {
            chatStage.findObjectById('Messages').getRenderer().addMessage(msg);
        },

        getMessages : function() {
            return messages;
        },

        tick : function() {
            chatStage && chatStage.tick();
        }
    }

})();