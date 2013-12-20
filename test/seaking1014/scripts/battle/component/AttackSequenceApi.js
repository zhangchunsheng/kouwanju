if(window.IDE) {
    IDE.ComponentRegistry.register('battle.component.AttackSequenceApi', []);
}

wozllajs.defineComponent('battle.component.AttackSequenceApi', {

    extend : 'Behaviour',

    alias : 'battle.attackSeqApi',

    /**
     * queueUp params
     */
    targetTween : null,
    upTween : null,
    upChildren : null,
    upChildrenY : null,
    upY : 0,

    /**
     * replacePosition params
     */
    moveChildren : null,
    moveChildrenY : null,
    moveY : 0,
    moveTween : null,
    downTween : null,

    queueUpTo : function(index, onComplete) {
        if(index === 0) {
            onComplete && onComplete();
            return;
        }
        var itemHeight = this.gameObject.getLayout().itemHeight;
        var offsetOut = 60;
        var me = this;
        var queueTarget = this.gameObject.getChildren()[0];
        var i, len, child, children;
        queueTarget.remove();
        children = this.gameObject.getChildren();
        this.upChildrenY = {};
        for(i=0; i<index; i++) {
            child = children[i];
            this.upChildrenY[child.id] = child.transform.y;
        }
        this.gameObject.insertObject(queueTarget, index);
        this.upChildren = children.slice(0, index);
        this.targetTween = createjs.Tween.get(queueTarget.transform, null, null, true).to({
            x : queueTarget.transform.x + offsetOut
        }, 100).wait(50).to({
                y : queueTarget.transform.y + itemHeight * index
        }, 200).wait(50).to({
            x : queueTarget.transform.x
        }, 100).call(function() {
            me.targetTween = null;
            onComplete && onComplete();
        });
        setTimeout(function() {
            me.upY = 0;
            me.upTween = createjs.Tween.get(me, null, null, true).to({
                upY : -itemHeight
            }, 200).call(function() {
                    me.upTween = null;
                });
        }, 150);

    },

    down : function(downIndex, toIndex, onComplete) {
        var i, len, child;
        var me = this;
        var itemHeight = this.gameObject.getLayout().itemHeight;
        var children = this.gameObject.getChildren();
        var downObject = children[downIndex];
        this.moveChildrenY = {};
        this.moveChildren = children.slice(downIndex+1, toIndex+1);
        for(i=0, len=this.moveChildren.length; i<len; i++) {
            child = this.moveChildren[i];
            this.moveChildrenY[child.id] = child.transform.y;
        }
        this.moveY = 0;
        this.moveTween = createjs.Tween.get(this, null, null, true).to({
            moveY : -itemHeight
        }, 200).call(function() {
            me.moveTween = null;
        });
        console.log(downObject.transform.y, downObject.transform.y + itemHeight * (toIndex-downIndex));
        this.downTween = createjs.Tween.get(downObject.transform, null, null, true).to({
            y : downObject.transform.y + itemHeight * (toIndex-downIndex)
        }, 200).call(function() {
            me.downTween = null;
            downObject.remove();
            me.gameObject.insertObject(downObject, toIndex);
            onComplete && onComplete();
        });
    },

    update : function() {
        var i, len, child;
        var delta = wozllajs.Time.delta;

        // queueUpTo
        this.targetTween && this.targetTween.tick(delta);
        if(this.upTween && this.upChildren) {
            this.upTween.tick(delta);
            for(i=0,len=this.upChildren.length; i<len; i++) {
                child = this.upChildren[i];
                child.transform.y = this.upChildrenY[child.id] + this.upY;
            }
        }

        // down
        this.downTween && this.downTween.tick(delta);
        if(this.moveTween && this.moveChildren) {
            this.moveTween.tick(delta);
            for(i=0,len=this.moveChildren.length; i<len; i++) {
                child = this.moveChildren[i];
                child.transform.y = this.moveChildrenY[child.id] + this.moveY;
            }
        }
    }

});