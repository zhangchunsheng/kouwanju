if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.AttrRenderer', []);
}

wozllajs.defineComponent('mainUI.component.AttrRenderer', {

    extend : 'Renderer',

    alias : 'mainUI.AttrRenderer',

    attack : 0,

    defense : 0,

    speed : 0,

    focus : 0,

    criticalHit : 0,

    counter : 0,

    block : 0,

    dodge : 0,

    initComponent : function(){
        //TODO INIT
    },

    draw : function(context){

        context.fillStyle = "#fce48f";
        context.font = "18px STHeiti";
        context.textBaseline = "top";

        context.fillText('攻击：', 10, 0);
        context.fillText('防御：', 10, 25);
        context.fillText('速度：', 10, 50);
        context.fillText('幸运：', 10, 75);

        context.fillText('暴击：', 200, 0);
        context.fillText('反击：', 200, 25);
        context.fillText('格挡：', 200, 50);
        context.fillText('闪避：', 200, 75);

        context.fillText(this.attack, 64, 0);
        context.fillText(this.defense, 64, 25);
        context.fillText(this.speed, 64, 50);
        context.fillText(this.focus, 64, 75);

        context.fillText(this.criticalHit+" %", 254, 0);
        context.fillText(this.counter+" %", 254, 25);
        context.fillText(this.block, 254, 50);
        context.fillText(this.dodge, 254, 75);
        
    }
});