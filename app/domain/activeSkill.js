/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-06-28
 * Description: fightskill
 */

var util = require('util');
var dataApi = require('../utils/dataApi');
var formula = require('../consts/formula');
var consts = require('../consts/consts');
var buff = require('./buff');
var Skill = require('./skill');

/**
 * 计算技能攻击伤害
 *
 * @param attacker
 * @param target
 * @param skill
 */
var attack = function(formation, attacker, targets) {

};

/**
 * 计算攻击
 */
var calculateAttack = function() {

}

/**
 * 计算防御
 */
var calculateDefense = function() {

}

/**
 * 计算目标
 */
var calculateTarget = function() {

}

/**
 * 计算集中值
 */
var calculateFocus = function() {

}

/**
 * 计算速度
 */
var calculateSpeed = function() {

}

/**
 * 计算闪避
 */
var calculateDodge = function() {

}

/**
 * 计算暴击几率
 */
var calculateCriticalHit = function() {

}

/**
 * 计算暴击几率
 */
var calculateCritDamage = function() {

}

/**
 * 计算格挡
 */
var calculateBlock = function() {

}

/**
 * 计算反击
 */
var calculateCounter = function() {

}

/**
 *
 * @param attacker
 * @param target
 * @param buff
 * @returns {{result: *}}
 */
var addBuff = function(attacker, target, buff) {
    if (buff.target === 'attacker' && !attacker.died) {
        buff.use(attacker);
    } else if (buff.target === 'target' && !target.died) {
        buff.use(target);
    }
    return {
        result: consts.AttackResult.SUCCESS
    };
};

var removeBuff = function(attacker, target, buff) {

};

/**
 *
 * @param opts
 * @constructor
 */
var ActiveSkill = function(opts) {
    Skill.call(this, opts);
};

ActiveSkill.prototype.attack = function() {

}

ActiveSkill.create = function(opts) {

}

util.inherits(ActiveSkill, Skill);

module.exports = ActiveSkill;
