/**
 * 1. 怒气buff
 * 2. 头顶buff
 * 3. 攻击特效
 * 4. 技能特效
 * 5. 闪避特效
 */

if(window.IDE) {
    IDE.ComponentRegistry.register('battle.LongRangeBattleObject', []);
}

wozllajs.defineComponent('battle.LongRangeBattleObject', {

    extend : 'battle.BattleObject',

    alias : 'battle.object'

});