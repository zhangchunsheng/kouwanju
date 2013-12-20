if(window.IDE) {
    IDE.ComponentRegistry.register('login.component.ServerListLayout', []);
}

wozllajs.defineComponent('login.component.ServerListLayout', {

    extend : 'Layout',

    alias : 'login.serverlistLayout',

    doLayout : function() {
        var children, child, i, len;
        var start = 25;
        var itemHeight = 80;
        children = this.gameObject.getChildren();
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            child.transform.y = start + itemHeight * i;
        }
    }

});