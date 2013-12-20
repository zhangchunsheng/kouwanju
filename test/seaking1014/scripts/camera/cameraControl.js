/**
 * the camera of map
 */
var cameraControl = (function() {

    var tween;
    var working = false;

    return {

        move : function(param) {
            var stage = mapControl.getCurrentMapStage();
            param.x += -stage.transform.x;
            param.y += -stage.transform.y;
            cameraControl.moveTo(param);
        },

        moveTo : function(param) {
            var stage = mapControl.getCurrentMapStage();
            working = true;
            tween = createjs.Tween.get(stage.transform)
                .to({ x: -param.x, y: -param.y}, param.time || 500, param.ease)
                .call(function() {
                working = false;
                param.onComplete && param.onComplete();
            });
        },

        tick : function() {
            tween && tween.tick(wozllajs.Time.delta);
            if(working === false) {
                tween = null;
            }
        }
    }

})();