/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: casino
 */
var authService = require('../app/services/authService');

exports.index = function(req, res) {
    res.send("index");
}

/**
 * 获得物品
 * @param req
 * @param res
 */
exports.getItems = function(req, res) {
    res.send("index");
}

/**
 * 下注
 * @param req
 * @param res
 */
exports.gambling = function(req, res) {
    res.send("index");
}