/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: auth
 */
var authService = require('../services/authService');

exports.index = function(req, res) {
    res.send("index");
}

/**
 * 认证
 * @param req
 * @param res
 */
exports.auth = function(req, res) {
    res.send("index");
}