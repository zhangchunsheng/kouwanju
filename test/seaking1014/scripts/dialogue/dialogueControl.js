$import('dialogue/DialogueModel.js');

var dialogueControl = (function() {

    var RM = wozllajs.ResourceManager;
    var EA = wozllajs.EventAdmin;

    var dialogueStage;
    var contentRenderer;
    var bustRenderer;
    var headcutRenderer;

    var dialogueModel = new game.DialogueModel();

    wozllajs.EventAdmin.on('Dialogue.click', null, function() {
        if(contentRenderer.tryShowAll()) {
            return;
        }
        dialogueControl.next();
    });

    return {

        alert : function(id, dialogueData) {
            var canvas = document.getElementById('main');
            dialogueModel.setId(id);

            // for testing
            //dialogueData = [dialogueData[0]];
            dialogueModel.setDialogueData(dialogueData);
            dialogueStage = game.initScene('main', 'UI_dialogue', function() {
                bustRenderer = dialogueStage.findObjectById('Bust').getRenderer();
                headcutRenderer = dialogueStage.findObjectById('HeadCut').getRenderer();
                contentRenderer = dialogueStage.findObjectById('Content').getRenderer();
                dialogueControl.next();
            });
        },

        close : function() {
            dialogueStage && dialogueStage.destroy();
            dialogueStage = null;
            bustRenderer = null;
            headcutRenderer = null;
            contentRenderer = null;
            EA.notify('dialogue.close', dialogueModel.id);
        },

        next : function() {
            if(!dialogueModel.next()) {
                dialogueControl.close();
            }
            else {
                if(dialogueModel.current.bust) {
                    headcutRenderer.gameObject.getParent().setActive(false);
                    bustRenderer.gameObject.setActive(true);
                    bustRenderer.setBustSrc('resources/bust/' + dialogueModel.current.bust);
                } else if(dialogueModel.current.headcut) {
                    bustRenderer.gameObject.setActive(false);
                    headcutRenderer.gameObject.getParent().setActive(true);
                    headcutRenderer.setHeadCutSrc('resources/headcut/' + dialogueModel.current.headcut);
                }
                contentRenderer.setDialogue(dialogueModel.current);
            }
        },

        tick : function() {
            dialogueStage && dialogueStage.tick();
        }

    }

})();