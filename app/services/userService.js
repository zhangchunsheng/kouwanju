/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: userService
 */
var userDao = require('../dao/userDao');

var userService = module.exports;

userService.get = function() {

}

userService.createCharacter = function(serverId, userId, registerType, loginName, cId, nickname, cb) {
    userDao.createCharacter(serverId, userId, registerType, loginName, cId, nickname, cb);
}

userService.getCharactersByLoginName = function(serverId, registerType, loginName, cb) {
    userDao.getCharactersByLoginName(serverId, registerType, loginName, cb);
}

userService.getCharacterAllInfo = function(serverId, registerType, loginName, characterId, cb) {
    userDao.getCharacterAllInfo(serverId, registerType, loginName, characterId, cb);
}

userService.getUserByLoginName = function(serverId, registerType, loginName, cb) {
    userDao.getUserByLoginName(serverId, registerType, loginName, cb);
}

userService.updatePlayerInduInfo = function(character, eid, cb) {
    userDao.updatePlayerInduInfo(character, eid, cb);
}