if(window.IDE) {
    IDE.ComponentRegistry.register('npc.Click', [{
        type : 'IDE_text',
        name : 'npcId',
        required: true
    }]);
}

wozllajs.defineComponent('npc.Click', {

    extend : 'Behaviour',

    alias : 'npc.click',

    npcId : null,

    initComponent : function() {
        this.on('click', this.onClick, this);
    },

    onClick : function() {
        // todo applyTo AllNPC
        var me = this;
        if(this.npcId) {
            this.gameObject.cache(0, 0, 256, 256);
            setTimeout(function() {
                me.gameObject.uncache();
            }, 200);
        }
        wozllajs.EventAdmin.notify('npc.click', {
            gameObject : this.npcId ? this.gameObject.getParent() : this.gameObject,
            npcId : this.npcId
        });
    },

    update : function() {
        this.gameObject.updateCache();
    },

    destroyComponent : function() {
        this.off('click', this.onClick, this);
    }


});