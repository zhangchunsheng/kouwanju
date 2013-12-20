if(window.IDE) {
    IDE.ComponentRegistry.register('task.component.TaskListLayout', []);
}

wozllajs.defineComponent('task.component.TaskListLayout', {

    extend : 'Layout',

    alias : 'task.listLayout',

    doLayout : function() {
        var i, len;
        var child;
        var visibleCount = 0;
        var children = this.gameObject.getChildren();
        var itemY = 120;
        for(i=0,len=children.length; i<len; i++) {
            child = children[i];
            if(child.isActive() && child.isVisible() && child.isInLayer('taskLine')) {
                child.transform.y = itemY * visibleCount++
            }
        }

    }

});