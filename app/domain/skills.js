/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-25
 * Description: skills
 */
var heroSkills = require('../../config/data/heroSkills');

var Skills = function(opts) {
    this.currentSkill = opts.currentSkill;
    this.activeSkills = [];
    this.passiveSkills = [];
};

module.exports = Skills;

/**
 * getInfo
 */
Skills.prototype.getInfo = function() {

}

/**
 * strip
 */
Skills.prototype.strip = function() {

}

/**
 *
 * @param skillId
 * @param type
 */
Skills.prototype.addSkills = function(skillId, type) {

}

/**
 * 初始化技能
 * @param cId
 */
Skills.prototype.initSkills = function(cId) {

}