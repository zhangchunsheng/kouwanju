/**
 * 1. 怒气buff
 * 2. 头顶buff
 * 3. 攻击特效
 * 4. 技能特效
 * 5. 闪避特效
 */

if(window.IDE) {
    IDE.ComponentRegistry.register('battle.BattleObject', []);
}

wozllajs.defineComponent('battle.BattleObject', {

    extend : 'Behaviour',

    alias : 'battle.object',

    sqrt3 : Math.sqrt(3),

    hp : 100,
    maxHP : 100,

    anger : 0,
    maxAnger : 100,

    formation : 1,

    camp : null,

    currentAnimation : 'stand',

    effectObject : null,

    currentEffect : null,

    hitTween : null,

    initComponent : function() {
        this.effectObject = this.gameObject.getObjectById('Effect');
    },

    initBattleData : function(basicInfo) {
        this.hp = basicInfo.HP;
        this.maxHP = basicInfo.maxHP;
        this.anger = basicInfo.anger;
        this.formation = basicInfo.formation;
        this.camp = basicInfo.camp;

        this.updateHP(0);
        this.updateAnger(this.anger);
    },

    getGameObject : function() {
        return this.gameObject;
    },

    getStandPosition : function() {
        var parentTransform = this.gameObject.transform;
        return {
            x : parentTransform.x,
            y : parentTransform.y
        };
    },

    setPosition : function(x, y) {
        var parentTransform = this.gameObject.transform;
        if(typeof x === 'object') {
            y = x.y;
            x = x.x;
        }
        parentTransform.x = x;
        parentTransform.y = y;
    },

    playEffectAt : function(effectName, pos, onComplete) {
        pos = pos || this.thisPos;
        this.effectObject.transform.x = pos.x;
        this.effectObject.transform.y = pos.y;
        var effectObj = this.effectObject.getObjectById(effectName);
        var effect = effectObj.getRenderer();
        effect.play();
        effectObj.setActive(true);
        effect.addEventListener('animationend', function() {
            effectObj.setActive(false);
            onComplete && onComplete();
        }, true);
    },

    playAnimation : function(animationName, onComplete, defaultAnimation) {
        var me = this;
        var animation = this.getAnimation(animationName);
        animation.play(animationName, defaultAnimation);
        this.gameObject.getObjectById(this.currentAnimation).setActive(false);
        this.currentAnimation = animationName;
        this.gameObject.getObjectById(animationName).setActive(true);
        animation.addEventListener('animationend', function() {
            !defaultAnimation && animation.stop();
            onComplete && onComplete();
        }, true);
        if(animationName === 'stand') {
            this.gameObject.getObjectById('Values').setActive(true);
        } else {
            this.gameObject.getObjectById('Values').setActive(false);
        }
    },

    getAnimationObject : function(animationName) {
        return this.gameObject.getObjectById(animationName);
    },

    getAnimation : function(animationName) {
        return this.gameObject.getObjectById(animationName).getRenderer();
    },

    addAnimationListener : function(animationName, type, listener, once) {
        var proxy = function(e) {
            if(e.animation === animationName) {
                listener(e);
            }
        };
        listener['_proxy_animation_' + this.UID] = proxy;
        this.getAnimation(animationName).addEventListener(type, proxy, once);
    },

    removeAnimationListener : function(animationName, type, listener) {
        this.getAnimation(animationName).removeEventListener(type, listener['_proxy_animation_' + this.UID]);
    },

    getEffect : function(effectName) {
        return this.effectObject[effectName].getRenderer();
    },

    getEffectObject : function(effectName) {
        return this.effectObject[effectName];
    },

    addEffectListener : function(effectName, type, listener, once) {
        var proxy = function(e) {
            if(e.animation === effectName) {
                listener(e);
            }
        };
        listener['_proxy_effect_' + this.UID] = proxy;
        this.getEffect(effectName).addEventListener(type, proxy, once);
    },

    removeEffectListener : function(effectName, type, listener) {
        this.getEffect(effectName).removeEventListener(type, listener['_proxy_effect_' + this.UID]);
    },

    updateHP : function(hpDelta) {
        var percentage, frame;
        var textureRenderer;
        // update HP
        if(this.camp === 'player') {
            textureRenderer = battleControl.getMyTeamCharacterObject(this.gameObject.id).getObjectById('HP').getRenderer();
        } else {
            textureRenderer = this.gameObject.findObjectByPath('Values.HP.Current').getRenderer();
        }
        this.hp += hpDelta;
        if(this.hp < 0) {
            this.hp = 0;
        }
        percentage = this.hp / this.maxHP;
        frame = textureRenderer.frames[textureRenderer.index];
        frame.sw = parseInt(frame.w * percentage);
        textureRenderer.currentFrame = frame;
    },

    updateAnger : function(anger) {
        var percentage, frame;
        var textureRenderer;
        // update HP
        if(this.camp === 'player') {
            textureRenderer = battleControl.getMyTeamCharacterObject(this.gameObject.id).getObjectById('Anger').getRenderer();
        } else {
            textureRenderer = this.gameObject.findObjectByPath('Values.Anger.Current').getRenderer();
        }
        this.anger = anger;
        percentage = this.anger / this.maxAnger;
        frame = textureRenderer.frames[textureRenderer.index];
        frame.sw = parseInt(frame.w * percentage);
        textureRenderer.currentFrame = frame;
    },

    attack : function(targetBattleObject, battleUnit, onComplete) {
        if(battleUnit.attackType == 0) {
            this.normalAttack(targetBattleObject, battleUnit, onComplete);
        } else {
            this.skillAttack(targetBattleObject, battleUnit, onComplete);
        }
    },

    normalAttack : function(targetBattleObject, battleUnit, onComplete) {

    },

    skillAttack : function(targetBattleObject, battleUnit, onComplete) {

    },

    death : function(onComplete) {
        var me = this;
        this.playAnimation('death', function() {
            me.gameObject.setActive(false);
            onComplete && onComplete();
        });
    },

    hit : function(battleUnit, demage, onComplete, hitBack) {
        var me = this;
        var trans = this.gameObject.transform;
        this.playAnimation('hit', function() {
            me.playAnimation('stand', null, 'stand');
            onComplete && onComplete();
        });
        if(hitBack) {
            if(this.camp === 'player') {
                this.hitTween = createjs.Tween.get(trans).to({
                    x : trans.x - parseInt(10 * this.sqrt3),
                    y : trans.y + 10
                }, 100, createjs.Ease.cubicOut).wait(50).to({
                    x : trans.x,
                    y : trans.y
                }, 100, createjs.Ease.cubicIn).call(function() {
                    me.hitTween = null;
                });
            } else {
                this.hitTween = createjs.Tween.get(trans).to({
                    x : trans.x + parseInt(10 * this.sqrt3),
                    y : trans.y - 10
                }, 100, createjs.Ease.cubicOut).wait(50).to({
                        x : trans.x,
                        y : trans.y
                }, 100, createjs.Ease.cubicIn).call(function() {
                    me.hitTween = null;
                });
            }
        } else {
            this.hitTween = null;
        }
        this.notify('battle.hit', {
            battleUnit : battleUnit,
            damage : demage,
            pos : this.getStandPosition(),
            camp : this.camp
        });
    },

    update : function() {
        var delta = wozllajs.Time.delta;
        this.hitTween && this.hitTween.tick(delta);
    }

});