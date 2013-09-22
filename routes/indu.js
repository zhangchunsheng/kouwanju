/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: indu
 */
exports.index = function(req, res) {
    res.send("index");
}

/**
 * 触发副本事件
 * @param req
 * @param res
 */
exports.triggerEvent = function(req, res) {
    res.send("index");
}