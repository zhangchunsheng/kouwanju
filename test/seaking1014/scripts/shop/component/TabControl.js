if(window.IDE) {
    IDE.ComponentRegistry.register('shop.component.TabControl', []);
}

wozllajs.defineComponent('shop.component.TabControl', {

    extend : 'Behaviour',

    alias : 'shop.tabControl',

    initComponent : function() {
        this.update = false;
        this.on('click', this.onTabClick);
    },

    onTabClick : function(e) {
        var focus;
        var tab1 = this.gameObject.getObjectById('Tab1');
        var tab2 = this.gameObject.getObjectById('Tab2');
        var tab3 = this.gameObject.getObjectById('Tab3');
        var localP = this.gameObject.transform.globalToLocal(e.x, e.y);
        if(localP.x <= 122) {
            focus = tab1;
        }
        else if(localP.x <= 244) {
            focus = tab2;
        }
        else if(localP.y <= 366) {
            focus = tab3;
        }
        if(!focus) {
            return;
        }
        tab1.transform.y = 8;
        tab1.getRenderer().changeFrameIndex(5);
        tab2.transform.y = 8;
        tab2.getRenderer().changeFrameIndex(5);
        tab3.transform.y = 8;
        tab3.getRenderer().changeFrameIndex(5);
        focus.transform.y = 0;
        focus.getRenderer().changeFrameIndex(6);
    },

    destroyComponent : function() {
        this.off('click', this.onTabClick);
    }

});