/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: task
 */
var taskService = require('../app/services/taskService');

exports.index = function(req, res) {
    res.send("index");
}

/**
 * 接任务
 * @param req
 * @param res
 */
exports.startTask = function(req, res) {
    res.send("index");
}

/**
 * 交任务
 * @param req
 * @param res
 */
exports.handOverTask = function(req, res) {
    res.send("index");
}