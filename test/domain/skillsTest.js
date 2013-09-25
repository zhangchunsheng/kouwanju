/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-25
 * Description: skillsTest
 */
var should = require('should');
var Skills = require('../../app/domain/skills');
var redis = require('../../app/dao/redis/redis');
var userService = require('../../app/services/userService');

describe('skills test', function() {
    it('should successully', function() {
        var skills = new Skills();
        skills.initSkills(1);
    });
});