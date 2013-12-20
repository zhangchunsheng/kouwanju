if(window.IDE) {
    IDE.ComponentRegistry.register('dialogue.component.ContentRenderer', []);
}

wozllajs.defineComponent('dialogue.component.ContentRenderer', {

    extend : 'Renderer',

    alias : 'dialogue.content',

    dialogue : null,

    oneWordTime : 50,

    totalCount : 0,

    displayCount : 0,

    dialogueShowTime : 0,

    update : function() {
        this.dialogueShowTime += wozllajs.Time.delta;
        if(this.dialogueShowTime > 99999999) {
            this.dialogueShowTime = 99999999;
        }
        this.displayCount = parseInt(this.dialogueShowTime/this.oneWordTime);
    },

    tryShowAll : function() {
        if(this.displayCount < this.totalCount) {
            this.dialogueShowTime = 99999999;
            return true;
        }
        return false;
    },

    draw : function(context, visibleRect) {
        if(this.dialogue) {
            var line;
            var i, len, lineHeight = 38;
            var lines = this.dialogue.contentLines;
            var drawWordCount = 0;
            var restWorkCount;
            context.textBaseline = 'top';
            context.font = 'bold 24px STHeiti,黑体';
            context.fillStyle = "#edde4c";
            context.fillText(this.getSpeakerName(this.dialogue.speaker), 0, 0);
            if(!wozllajs.isArray(lines)) {
                lines = [lines];
            }
            //
            context.font = 'normal 20px STHeiti,黑体';
            context.fillStyle = "#fdeeb9";
            for(i=0,len=lines.length; i<len; i++) {
                line = lines[i];
                restWorkCount = this.displayCount - drawWordCount;
                if(line.length <= restWorkCount) {
                    context.fillText(line, 0, 60 + i* lineHeight);
                    drawWordCount += line.length;
                } else {
                    line = line.substr(0, restWorkCount);
                    context.fillText(line, 0, 60 + i* lineHeight);
                    break;
                }
            }
        }
    },

    setDialogue : function(dialogue) {
        var lines;
        this.dialogue = dialogue;
        this.displayCount = 0;
        this.dialogueShowTime = 0;
        this.totalCount = 0;
        lines = dialogue.contentLines;
        if(!wozllajs.isArray(lines)) {
            lines = [lines];
        }
        for(var i= 0,len=lines.length; i<len; i++) {
            this.totalCount += lines[i].length;
        }
    },

    getSpeakerName : function(speaker) {
        return speaker;
    }

});