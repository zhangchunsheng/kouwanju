/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-22
 * Description: mail
 */
var mailService = require('../app/services/mailService');

exports.index = function(req, res) {
    res.send("index");
}

/**
 * 系统发邮件
 * @param req
 * @param res
 */
exports.systemSendMail = function(req, res) {
    res.send("index");
}

/**
 * 发邮件
 * @param req
 * @param res
 */
exports.sendMail = function(req, res) {
    res.send("index");
}

/**
 * 收件箱
 * @param req
 * @param res
 */
exports.getInbox = function(req, res) {
    res.send("index");
}

/**
 * 发件箱
 * @param req
 * @param res
 */
exports.getOutbox = function(req, res) {
    res.send("index");
}

/**
 * 读邮件
 * @param req
 * @param res
 */
exports.readMail = function(req, res) {
    res.send("index");
}

/**
 * 删除邮件
 * @param req
 * @param res
 */
exports.delMail = function(req, res) {
    res.send("index");
}

/**
 * 有新邮件
 * @param req
 * @param res
 */
exports.hasNewMail = function(req, res) {
    res.send("index");
}

/**
 * 获得物品
 * @param req
 * @param res
 */
exports.collectItem = function(req, res) {
    res.send("index");
}