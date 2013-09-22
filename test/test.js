/**
 * Copyright(c)2013,Wozlla,www.wozlla.com
 * Version: 1.0
 * Author: Peter Zhang
 * Date: 2013-09-23
 * Description: test
 */
var loginInfo = {
    code: 200,
    loginName: "html5",
    registerType: "1",
    sessionId: "6ACEC8A00F404644330E05D0294885A5",
    token: "464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5",
    uid: "5"
};
$(document).ready(function() {
    $("#register").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var url = "http://192.168.1.99:8090/register";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password),
            password_verify: hex_md5(password_verify)
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#autoRegister").bind("click", function() {
        var url = "http://192.168.1.99:8090/autoRegister";
        var data = {
            registerType: 2
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#relevance").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var url = "http://192.168.1.99:8090/relevance";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password),
            password_verify: hex_md5(password_verify),
            bindRegisterType: 2,
            bindAccount: "w100001"
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#login").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();

        var url = "http://192.168.1.99:8090/login";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password)
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
                loginInfo = data;
            }
        });
    });

    $("#multiLogin").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();

        var url = "http://192.168.1.99:8090/multiLogin";
        var data = {
            registerType: 1,
            loginName: loginName,
            password: hex_md5(password)
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#hasSession").bind("click", function() {
        var url = "http://192.168.1.99:8090/hasSession";
        var data = {
            sessionId: ""
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#auth").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/auth";

        var data = {
            token: loginInfo.token
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#createMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/createMainPlayer";

        var data = {
            token: loginInfo.token
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#getMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/getMainPlayer";

        var data = {
            token: loginInfo.token
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#battle").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/battle/battle";

        var data = {
            token: loginInfo.token,
            eid: "MG101011"
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#enterScene").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/enterScene";

        var data = {
            token: loginInfo.token
        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            url: url + "?" + params,
            success: function(data, status) {
                console.log(data);
            }
        });
    });
});