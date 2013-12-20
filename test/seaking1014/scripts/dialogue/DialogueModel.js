(function() {

    var DialogueModel = function() {
        this.current = null;
        this.id = null;
        this.data = null;
    };

    DialogueModel.prototype = {

        setId : function(id) {
            this.id = id;
        },

        setDialogueData : function(dialogueData) {
            var i, len, dialogue;
            for(i=0,len=dialogueData.length; i<len; i++) {
                dialogue = dialogueData[i];
                if(npcData[dialogue.speakerID]) {
                    dialogue.bust = npcData[dialogue.speakerID].bust;
                    dialogue.headcut = npcData[dialogue.speakerID].headcut;
                } else {
                    dialogue.headcut = npcData['NPC_only_headcut'].headcut;
                }
            }
            this.data = dialogueData;
        },

        next : function() {
            return this.current = this.data.shift();
        }
    };

    game.DialogueModel = DialogueModel;

})();