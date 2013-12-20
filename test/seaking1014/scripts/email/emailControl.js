var emailControl = (function() {

    var EA = wozllajs.EventAdmin;

    var currentPanel = 'inbox';

    var inboxEmails = [{
        id : wozllajs.UniqueKeyGen++ + '',
        sender : '发件人名',
        content : '邮件内容很重要邮件内容很重要邮件内容很重要邮件内容很重要邮件内容很重要邮件内容很重要邮件内容很重要',
        time : Date.now(),
        system : false
    }, {
        id : wozllajs.UniqueKeyGen++ + '',
        sender : '系统邮件',
        content : '节日礼物',
        time : Date.now(),
        system : true,
        items : []
    }];

    var emailStage;

    EA.on('EmailBtn.click', function(e) {
        emailControl.open();
    });

    EA.on('EmailCloseBtn.click', function() {
        emailControl.close();
        cityUIControl.tipsEmail(false);
    });

    EA.on('email.click', function(e) {
        // TODO
        var email;
        if(currentPanel === 'inbox') {
            email = inboxEmails[e.index];
        }
        emailControl.showEmailDetail(email);
    });

    function createEmailGameObject(email) {
        var gameObject, date, time;
        emailObject.gid = email.id;
        gameObject = wozllajs.StageBuilder.buildGameObject(emailObject);
        gameObject.init();
        gameObject.getObjectById('SenderName').getRenderer().text = email.sender;
        date = new Date(email.time);
        time = date.getYear() + '年' + (date.getMonth()+1) + '月' + date.getDay() + '日 ' +
            date.getHours() + ':' + date.getMinutes();
        gameObject.getObjectById('Time').getRenderer().text = time;
        return gameObject;
    }

    return {

        initEmailStage : function(onComplete) {
            emailStage = game.initScene('main', 'UI_email', function() {
                emailControl.appendEmails('inbox', inboxEmails);
                var list = emailStage.findObjectByPath('UI_email.ListPanel.List');
                list.getChildren()[0].getRenderer().changeFrameIndex(18);
                list.layout();
                emailControl.showEmailDetail(inboxEmails[0]);
                onComplete && onComplete();
            });
        },

        open : function(onComplete) {
            //emailControl.initEmailStage(onComplete);
        },

        close : function() {
            emailStage && emailStage.destroy();
            emailStage = null;
        },

        appendEmails : function(type, emails) {
            for(var i= 0, len=emails.length; i<len; i++) {
                emailControl.appendEmail(type, emails[i]);
            }
        },

        appendEmail : function(type, email) {
            var obj = createEmailGameObject(email);
            emailStage.findObjectByPath('UI_email.ListPanel.List').addObject(obj);
        },

        showEmailDetail : function(email) {
            emailStage.findObjectByPath('UI_email.DetailPanel.TitleBG.SenderName').getRenderer().text = email.sender;
            emailStage.findObjectByPath('UI_email.DetailPanel.ContentBG.Content').getRenderer().text = email.content;
            // TODO update button
        },

        tick : function() {
            emailStage && emailStage.tick();
        }
    };

})();