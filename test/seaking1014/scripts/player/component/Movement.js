if(window.IDE) {
    IDE.ComponentRegistry.register('player.component.Movement', [{
        name : 'moveSpeed',
        type : 'IDE_number',
        value : 4,
        required: true
    }]);
}

wozllajs.defineComponent('player.component.Movement', {

    extend : 'Behaviour',

    alias : 'player.movement',

    moveSpeed : 0.1,

    path : null,

    pathChanged : false,

    movementStopListener : null,

    nextPos : null,

    direction : 'Down',

    motionState : 'Stand',

    currentAnimation : null,

    cos225 : Math.cos(22.5 * Math.PI * 2 / 360),

    sqrt2 : Math.sqrt(2),

    vel : {
        x : 0,
        y : 0
    },

    accel : {
        x: 0,
        y: 0,
        normalize : function() {
            var len = Math.sqrt(this.x * this.x + this.y * this.y);
            if (len <= Number.MIN_VALUE) {
                return 0.0;
            }
            var invL = 1.0 / len;
            this.x *= invL;
            this.y *= invL;
            return len;
        }
    },

    allDirVec : {
        'Up'		: { x : 0,  y : -1 },
        'Down'		: { x : 0,  y : 1  },
        'Right'		: { x : 1,  y : 0  },
        'Left'		: { x : -1, y : 0  },
        'RightDown'	: { x : 1,  y : 1  },
        'LeftUp'	: { x : -1, y : -1 },
        'RightUp'	: { x : 1,  y : -1 },
        'LeftDown'	: { x : -1, y : 1  }
    },

    stop : function() {
        this.path = [];
        this.pathChanged = true;
    },

    moveByPath : function(path, listener) {
        this.pathFinishListener = listener;
        this.path = path || [];
        this.pathChanged = true;
        if(!path || path.length <= 0) {
            listener && listener();
        }
    },

    update : function() {
        var lastPos, dir, a, b, c, d, angle, nowAccel;
        var Time = wozllajs.Time;
        var transform = this.gameObject.transform;
        var animationSheet = this.gameObject.getRenderer();
        if(this.path && this.pathChanged) {
            this.pathChanged = false;
            lastPos = this.nextPos;
            this.nextPos = this.nextPos = this.path.shift();
            if(this.nextPos) {
//                nextPos.x -= footPoint.x;
//                nextPos.y -= footPoint.y;
                this.accel.x = (this.nextPos.x - transform.x) * 100;
                this.accel.y = (this.nextPos.y - transform.y) * 100;
                this.accel.normalize();

                this.motionState = 'Run';

                for(dir in this.allDirVec) {
                    a = this.accel.x;
                    b = this.accel.y;
                    c = this.allDirVec[dir].x;
                    d = this.allDirVec[dir].y;
                    angle = (a * c + b * d) / (Math.sqrt(a * a + b * b) * Math.sqrt(c * c + d * d));
                    if(angle <= 1 && angle >= this.cos225) {
                        this.direction = dir;
                        break;
                    }
                }
            } else {
                this.motionState = 'Stand';
            }
        }

        this.vel.x = this.motionState === 'Run' ? this.moveSpeed * this.accel.x * Time.delta : 0;
        this.vel.y = this.motionState === 'Run' ? this.moveSpeed * this.accel.y * Time.delta : 0;

        if(this.motionState === 'Run') {

            // try move
            transform.x += this.vel.x;
            transform.y += this.vel.y;

            // 检查目的是否到达nextPos
            nowAccel = { x: this.nextPos.x - transform.x, y: this.nextPos.y - transform.y };
            if((nowAccel.x*this.accel.x+nowAccel.y*this.accel.y) <= 0) {

                // 控制进入下一段
                this.pathChanged = true;
                if(!this.path || this.path.length === 0) {
                    this.path = null;
                    this.motionState = "Stand";
                    transform.x = this.nextPos.x;
                    transform.y = this.nextPos.y;
                    this.pathFinishListener && this.pathFinishListener();
                }
            }
        }
        // viewport follow
        if(animationSheet) {
            var playAni = this.motionState + this.direction;
            if(this.currentAnimation != playAni) {
                animationSheet.play(playAni, playAni);
                this.currentAnimation = playAni;
            }
        }
    }

});