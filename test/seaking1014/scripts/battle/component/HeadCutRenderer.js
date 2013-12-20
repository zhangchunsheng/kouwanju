if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.HeadCutRenderer', []);
}

wozllajs.defineComponent('battle.component.HeadCutRenderer', {

    extend : 'Renderer',

    alias : 'battle.headcut',

    x : 0,

    y : 0,

    headCutSrc : null,

    image : null,

    initComponent : function() {
        this.image = this.getResourceById(this.headCutSrc);
        if(this.image) {
            this.x = -this.image.width/2;
            this.y = -this.image.height;
        }
    },

    draw : function(context, visibleRect) {
        if(this.image) {
            context.drawImage(this.image, this.x, this.y);
        }
    },

    destroyComponent : function() {
        this.image && this.image.dispose && this.image.dispose();
    },

    _collectResources : function(collection) {
        var headCutSrc;
        var parent = this.gameObject.getParent();
        // TODO not good, refactory
        var id = battleControl.getIdForAttackSequence(parent.id);
        if(!id) {
            this.gameObject.getParent().delayRemove();
            return;
        }
        parent.setId(id);
        headCutSrc = battleControl.getAttackSequenceHeadCut(id);
        if(!headCutSrc) return;
        this.headCutSrc = headCutSrc;
        collection.push(headCutSrc);
    }

});