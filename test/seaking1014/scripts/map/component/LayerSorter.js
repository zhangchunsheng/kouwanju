if(window.IDE) {
    IDE.ComponentRegistry.register('map.component.LayerSorter', []);
}

wozllajs.defineComponent('map.component.LayerSorter', {

    extend : 'Behaviour',

    alias : 'map.layer.sorter',

    update : function() {
        this.gameObject.sortChildren(function(a, b) {
            return a.transform.y - b.transform.y;
        });
    }

});