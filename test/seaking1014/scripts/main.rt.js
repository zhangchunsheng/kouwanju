$import('_libs/cocoonjs/CocoonJS.js');
$import('_libs/cocoonjs/CocoonJS_App.js');
$import('_libs/cocoonjs/CocoonJS_App_ForCocoonJS.js');
$import('_libs/navmesh.js');
$import('_libs/state-machine.js');
$import('config.js');
$import('gameControl.js');

// create canvas
(function() {
    var canvas = wozllajs.createCanvas(Math.round(window.innerWidth*640/window.innerHeight), 640);
    canvas.id = 'main';
    document.body.appendChild(canvas);
})();


window.addEventListener('load', function() {

    wozllajs.Touch.init(document.getElementById('main'));

    wozllajs.LayerManager.init({
        'map' : 1,
        'player' : 5,
        'NPC' : 10,
        'cityUI' : 15,
        'uiMask' : 20,
        'battleResultUI' : 22,
        'dialogueUI' : 25,
        'uiWorldmap' : 30,
        'uiWorldmapBtn' : 32,
        'taskUI' : 35,
        'mainUI' : 45,
        'mainUIPop' : 46,
        'shopUI' : 56,
        'chatUI' : 67,
        'loginUI' : 70,
        'registerUIMask' : 75,
        'registerBG' : 80,
        'reigsterUI' : 85,
        'serverlistMask' : 90,
        'serverlistUI' : 95,

        'noticeMask' : 100,
        'noticeUI' : 105,

        'loadingUI' : 200
    });

    wozllajs.Engine.addListener(function() {
        gameControl.tick();
    });

    wozllajs.Engine.start();
    gameControl.login();

//    CocoonJS.App.loadInTheWebView('webview.html');
//    CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function() {
//        console.log('webview');
//        CocoonJS.App.forwardAsync("CocoonJS.App.show(0, 0, " + window.innerWidth + "," + window.innerHeight + ");");
//    });

});