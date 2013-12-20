/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Edwin Liu
 * Date: 2013-04-14
 * Description:
 */
window.socket = window.socket || {};

(function() {

var HEADER, Message, bt2Str;
HEADER = 5;
Message = function (id, route, body) {
	this.id = id;
	this.route = route;
	this.body = body;
};
/*

pomele client encode
id message id;
route message route
msg message body
socketio current support string

 */
var encode = function (id, route, msg) {
	var byteArray,
	i,
	index,
	msgStr;
	msgStr = JSON.stringify(msg);
	if (route.length > 255) {
		throw new Error("route maxlength is overflow");
	}
	byteArray = [];
	index = 0;
	byteArray[index++] = (id >> 24) & 0xFF;
	byteArray[index++] = (id >> 16) & 0xFF;
	byteArray[index++] = (id >> 8) & 0xFF;
	byteArray[index++] = id & 0xFF;
	byteArray[index++] = route.length & 0xFF;
	i = 0;
	while (i < route.length) {
		byteArray[index++] = route.charCodeAt(i);
		i++;
	}
	i = 0;
	while (i < msgStr.length) {
		byteArray[index++] = msgStr.charCodeAt(i);
		i++;
	}
	return bt2Str(byteArray, 0, byteArray.length);
};
/*
client decode
msg String data
return Message Object
 */
var decode = function (msg) {
	var arr,
	body,
	buf,
	id,
	idx,
	index,
	len,
	route,
	routeLen;
	idx = void 0;
	len = msg.length;
	arr = new Array(len);
	idx = 0;
	while (idx < len) {
		arr[idx] = msg.charCodeAt(idx);
		++idx;
	}
	index = 0;
	buf = [];
	id = ((buf[index++] << 24) | buf[index++] << 16 | buf[index++] << 8 | buf[index++]) >>> 0;
	routeLen = buf[HEADER - 1];
	route = bt2Str(buf, HEADER, routeLen + HEADER);
	body = bt2Str(buf, routeLen + HEADER, buf.length);
	return new Message(id, route, body);
};
var bt2Str = function (byteArray, start, end) {
	var i,
	result;
	result = "";
	i = start;
	while (i < byteArray.length && i < end) {
		if (i < 4 && byteArray[i] === 0) {
			result += String.fromCharCode(256);
		} else {
			result = result + String.fromCharCode(byteArray[i]);
		}
		i++;
	}
	return result;
};

var MSGSTATE = {
	OK: 200,
    FAIL: 500,
    ENTRY: {
        FA_TOKEN_INVALID: 1001,
        FA_TOKEN_EXPIRE: 1002,
        FA_USER_NOT_EXIST: 1003,
        FA_UNKNOWN_ERROR: 1004,
        FA_USER_EXIST: 1005
    },
    GATE: {
        FA_NO_SERVER_AVAILABLE: 2001
    },
    AREA: {
        a: 1
    },
    CHAT: {
        FA_CHANNEL_CREATE: 3001,
        FA_CHANNEL_NOT_EXIST: 3002,
        FA_UNKNOWN_CONNECTOR: 3003,
        FA_USER_NOT_ONLINE: 3004
    }
};

    socket.protocol = {
        encode : encode,
        decode : decode
    };

})();