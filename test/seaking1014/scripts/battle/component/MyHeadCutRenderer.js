if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.MyHeadCutRenderer', []);
}

wozllajs.defineComponent('battle.component.MyHeadCutRenderer', {

    extend : 'Renderer',

    alias : 'battle.myheadcut',

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
        var id = battleControl.getIdForMyTeamInfo(parent.id);
        if(!id) {
            parent.delayRemove();
            return;
        }
        parent.setId(id);
        // TODO not good, refactory
        headCutSrc = battleControl.getMyTeamInfoHeadCut(id);
        if(!headCutSrc) return;
        this.headCutSrc = headCutSrc;
        collection.push(headCutSrc);
    }

});