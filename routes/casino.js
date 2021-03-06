/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: casino
 */
var casinoService = require('../app/services/casinoService');
var userService = require('../app/services/userService');
var Code = require('../shared/code');
var utils = require('../app/utils/utils');
var dataApi = require('../app/utils/dataApi');
exports.index = function(req, res) {
    res.send("index");
}

/**
 * 获得物品
 * @param req
 * @param res
 */
exports.getItems = function(req, res) {
    var msg = req.query;
    var session = req.session;

    var uid = session.uid
        , serverId = session.serverId
        , registerType = session.registerType
        , loginName = session.loginName;

    var playerId = session.playerId;
    var characterId = utils.getRealCharacterId(playerId);
   userService.getCharacterAllInfo(serverId, registerType, loginName, characterId, function(err, player){
        var items = prize(player.level);
        //是否进行海市次数判断
        player.casino = {
            index : 0,
            items : items
        };
    
        utils.send(msg, res, {
            code : Code.OK,
            items : items
        });
   });
}

/**
 * 下注
 * @param req
 * @param res
 */
//找个地方来存
exports.gambling = function(req, res) {
    var msg = req.query;
    var session = req.session;

    var playerId = session.get('playerId');
    var player = area.getPlayer(playerId);
    if (player.casino.index != msg.index) {
        next(null, {
            code : Code.FAIL
        });
        return;
    }
    var allPice = (msg.fill * player.casino.items[msg.index].price * 0.2);

    if (player.money < allPice) {
        next(null, {
            code : Code.FAIL
        });
        return;
    }
    player.money -= allPice;
    player.save();
    if (result(msg.fill)) {
        var item = player.casino.items[msg.index];
        item.itemNum = 1;
        var package = player.packageEntity.addItemWithNoType(player, item);
        player.packageEntity.save();
        utils.send(msg, res, {
            code : Code.OK,
            result : true,
            package : package
        });
    } else {
        utils.send(msg, res, {
            code : Code.OK,
            result : false
        });
    }
    player.casino.index++;
}

//随机物品
function prize(level) {
    var array = [];
    for (var o in dataApi.casino.data) {
        array.push(prizeItem(dataApi.casino.findById(o), level));
    }
    return array;
}

function prizeItem(casino, level) {
    var items = casino.itemData;
    var allPricen = casino.allPricen;
    var array = [];
    for (var i = 0; i < items.length; i++) {
        var probability = items[i].probability / allPricen;
        if (items[i].level > level) {
            probability *= level / items[i].level;
        } else {
            probability *= items[i].level / level;
        }
        array.push(probability);
    }
    return items[prizeIndex(array)];
}

function prizeIndex(array) {
    var k = 0;
    for (var i = 0; i < array.length; i++) {
        k += array[i];
    }
    var j = Math.random() * k;
    k = 0;
    var i;
    for (i = 0; i < array.length; i++) {
        k += array[i];
        if (j < k) {
            break;
        }
    }
    return i;
}

//随机是否成功
function result(num) {
    var grad = (35 / 100 + 0.1 * num);
    return Math.random() > grad;
}