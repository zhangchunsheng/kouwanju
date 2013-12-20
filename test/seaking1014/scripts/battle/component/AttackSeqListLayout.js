if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.AttackSeqListLayout', []);
}

wozllajs.defineComponent('battle.component.AttackSeqListLayout', {

    extend : 'Layout',

    alias : 'battle.layout.attackSeqList',

    startPos : 24,

    itemHeight : 56,

    initComponent : function() {
        var seqMap, i, len;
        var initSeq = battleControl.getInitSequence();
        if(initSeq) {
            seqMap = {};
            for(i=0,len=initSeq.length; i<len; i++) {
                seqMap[initSeq[i]] = i;
            }
            this.gameObject.sortChildren(function(a, b) {
                return seqMap[a.id] - seqMap[b.id];
            });
        }
        this.Layout_initComponent();
    },

    doLayout : function() {
        var i, len, child;
        var children = this.gameObject.getChildren();
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            child.transform.y = i * this.itemHeight + this.startPos;
        }
    }

});