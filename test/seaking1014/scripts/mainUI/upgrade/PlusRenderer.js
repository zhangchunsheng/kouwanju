if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.PlusRenderer', []);
}

wozllajs.defineComponent('mainUI.component.PlusRenderer', {

    extend : 'Renderer',

    alias : 'mainUI.PlusRenderer',

    attack : -10,

    defense : -10,

    speed : -10,

    focus : -10,

    criticalHit : -10,

    counter : -10,

    block : -10,

    dodge : -10,

    initComponent : function(){
        //TODO INIT
    },

    draw : function(context){

        context.fillStyle = "#3ce601";
        context.font = "18px arial";
        context.textBaseline = "top";

        context.fillText(this.attack, 64, 0);
        context.fillText(this.defense, 64, 25);
        context.fillText(this.speed, 64, 50);
        context.fillText(this.focus, 64, 75);

        context.fillText(this.criticalHit, 254, 0);
        context.fillText(this.counter, 254, 25);
        context.fillText(this.block, 254, 50);
        context.fillText(this.dodge, 254, 75);
        
    }
});