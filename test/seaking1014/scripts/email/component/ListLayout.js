if(window.IDE) {
    IDE.ComponentRegistry.register('email.component.ListLayout', []);
}

wozllajs.defineComponent('email.component.ListLayout', {

    extend : 'Layout',

    alias : 'email.listLayout',

    doLayout : function() {
        var children, child, i, len;
        var start = 6;
        var itemHeight = 80;
        children = this.gameObject.getChildren();
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            child.transform.y = start + itemHeight * i;
        }
    }

});