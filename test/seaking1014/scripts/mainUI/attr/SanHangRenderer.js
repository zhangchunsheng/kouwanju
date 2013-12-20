if(window.IDE) {
    IDE.ComponentRegistry.register('mainUI.component.SanHangRenderer', []);
}

wozllajs.defineComponent('mainUI.component.SanHangRenderer', {

    extend : 'Renderer',

    alias : 'mainUI.SanHangRenderer',

    lineOne : '第一行字要说大可脑残,',

    lineTwo : '第二行字要说锐锐不帅,',

    lineThree : '第三行字要说他们有感情。',

    initComponent : function(){
        //TODO INIT
    },

    draw : function(context){

        context.fillStyle = "#fce48f";
        context.font = "18px 宋体";
        context.textBaseline = "top";

        context.fillText(this.lineOne, 10, 0);
        context.fillText(this.lineTwo, 10, 25);
        context.fillText(this.lineThree, 10, 50);
    }
});