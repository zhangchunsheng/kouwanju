if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.sublistButton', []);
}

wozllajs.defineComponent('mainUI.component.sublistButton', {

    extend : 'Behaviour',

    alias : 'mainUI.sublistButton',

    dist : 60,

    regY : 0,

    initComponent : function(){
        //TODO INIT
        this.on('click', this.onClick, this);
        var ty = this.gameObject.transform.y;
        this.regY = this.gameObject.transform.localToGlobal(ty, 0).y;
        this.update = false;
    },

    onClick : function(e){
        var y = e.y - this.regY - 40;
        var dist = this.dist;
        for(var i = 0; i < 5; i++){
            if((y>(dist*i)) && (y<(dist*(i+1)))){
                this.notify('sublist.select'+i);
                console.log('sublist.select'+i);
            }
        }
    },

    destroyComponent : function() {
        this.off('click', this.onClick, this);
    }
});