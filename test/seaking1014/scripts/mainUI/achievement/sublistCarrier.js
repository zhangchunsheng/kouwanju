if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.sublistCarrier', []);
}

wozllajs.defineComponent('mainUI.component.sublistCarrier', {

    extend : 'Behaviour',

    alias : 'mainUI.sublistCarrier',

    dist : 125,

    dest : 0,

    cur : 0,

    initComponent : function(){
        //TODO INIT
        this.on('instAchSwitch.click', this.instAchSwitch, this);
        this.on('sublist.close', this.instAchSwitch, this);
        this.on('srchAchSwitch.click', this.srchAchSwitch, this);
        this.on('eventAchSwitch.click', this.eventAchSwitch, this);
        this.on('socialAchSwitch.click', this.socialAchSwitch, this);
        this.gameObject.cache(0, 0, 304, 512);
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
        this.dest = index*this.dist;
    },

    update : function(){
        var d = (this.dest - this.cur)*0.5;
        this.cur += d;
        this.gameObject.translateCache(0, d);
    },

    destroyComponent : function() {
        this.off('instAchSwitch.click', this.instAchSwitch, this);
        this.off('srchAchSwitch.click', this.srchAchSwitch, this);
        this.off('eventAchSwitch.click', this.eventAchSwitch, this);
        this.off('socialAchSwitch.click', this.socialAchSwitch, this);

        this.off('sublist.close', this.instAchSwitch, this);
    }
});