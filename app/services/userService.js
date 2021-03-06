/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: userService
 */
var userDao = require('../dao/userDao');
var utils = require('../utils/utils');
var eventManager = require('../domain/event/eventManager');

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
    userDao.getCharacterAllInfo(serverId, registerType, loginName, characterId, function(err, character) {
        if(!!err || !character) {
            console.log('Get user for userService failed! ' + err);
        } else {
            eventManager.addEvent(character);
        }
        utils.invokeCallback(cb, err, character);
    });
}

userService.getUserByLoginName = function(serverId, registerType, loginName, cb) {
    userDao.getUserByLoginName(serverId, registerType, loginName, cb);
}

userService.updatePlayerInduInfo = function(character, eid, cb) {
    userDao.updatePlayerInduInfo(character, eid, cb);
}

userService.enterIndu = function(serverId, registerType, loginName, induId, cb) {
    userDao.enterIndu(serverId, registerType, loginName, induId, cb);
}

userService.leaveIndu = function(serverId, registerType, loginName, induId, cb) {
    userDao.leaveIndu(serverId, registerType, loginName, induId, cb);
}

userService.getPlayerById = function(playerId, cb) {
    userDao.getPlayerById(playerId, cb);
}

userService.getRealCharacterId = function(characterId) {
    userDao.getRealCharacterId(characterId);
}

userService.updatePlayer = function(player, field, cb) {
    userDao.updatePlayer(player, field, cb);
}

userService.update = function(array, cb) {
    userDao.update(array, cb);
}

userService.updatePlayerAttribute = function(player, cb) {
    userDao.updatePlayerAttribute(player, cb);
}

userService.getUpdateArray = function() {

}