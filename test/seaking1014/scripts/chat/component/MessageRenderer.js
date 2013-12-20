if(window.IDE) {
    IDE.ComponentRegistry.register('chat.component.MessageRenderer', []);
}

wozllajs.defineComponent('chat.component.MessageRenderer', {

    extend : 'Renderer',

    alias : 'chat.message',

    messages : null,

    lineHeight : 30,

    initComponent : function() {
        this.messages = [];
    },

    draw : function(context, visibleRect) {
        var i, len, msg;
        var lineHeight = this.lineHeight;
        context.fillStyle = "#ffffff";
        context.font = 'normal 18px STHeiti,黑体';
        context.textBaseline = 'top';
        for(i= 0,len=this.messages.length; i<len; i++) {
            msg = this.messages[i];
            context.fillText(msg.name + "：" + msg.text, 0, lineHeight * i);
        }
    },

    getMessageHeight : function() {
        return this.lineHeight * this.messages.length;
    },

    addMessages : function(msgs) {
        this.messages = this.messages.concat(msgs);
        if(this.messages.length > 100) {
            this.messages = this.messages.slice(this.length - 100);
        }
        this.gameObject.updateCache();
    },

    addMessage : function(msg) {
        this.messages.push(msg);
        if(this.messages.length > 100) {
            this.messages.shift();
        }
        this.gameObject.updateCache();
    }

});