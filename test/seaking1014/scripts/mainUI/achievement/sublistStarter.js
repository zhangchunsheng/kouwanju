if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.sublistStarter', []);
}

wozllajs.defineComponent('mainUI.component.sublistStarter', {

    extend : 'Behaviour',

    alias : 'mainUI.sublistStarter',

    dist : 125,

    initComponent : function(){
        //TODO INIT
        this.on('instAchSwitch.click', this.instAchSwitch, this);
        this.on('srchAchSwitch.click', this.srchAchSwitch, this);
        this.on('eventAchSwitch.click', this.eventAchSwitch, this);
        this.on('socialAchSwitch.click', this.socialAchSwitch, this);
        this.update = false;
    },

    instAchSwitch : function(){
        this._move(0);
    },

    srchAchSwitch : function(){
        this._move(1);
    },

    eventAchSwitch : function(){
        this._move(2);
    },

    socialAchSwitch : function(){
        this._move(3);
    },

    _move : function(index){
        this.gameObject.transform.y = index*this.dist;
    },

    destroyComponent : function() {
        this.off('instAchSwitch.click', this.instAchSwitch, this);
        this.off('srchAchSwitch.click', this.srchAchSwitch, this);
        this.off('eventAchSwitch.click', this.eventAchSwitch, this);
        this.off('socialAchSwitch.click', this.socialAchSwitch, this);
    }
});