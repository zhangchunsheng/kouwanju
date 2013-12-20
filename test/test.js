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

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/register";
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
                loginInfo = data;
                console.log(data);
            }
        });
    });

    $("#autoRegister").bind("click", function() {
        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/autoRegister";
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
                loginInfo = data;
                console.log(data);
            }
        });
    });

    $("#relevance").bind("click", function() {
        var loginName = $("#loginName").val();
        var password = $("#password").val();
        var password_verify = $("#password_verify").val();

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/relevance";
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

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/login";
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

        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/multiLogin";
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
        var host = $("#ucenter_host").val();
        var port = $("#ucenter_port").val();
        var url = "http://" + host + ":" + port + "/hasSession";
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
        var url = "http://" + host + ":" + port + "/role/createMainPlayer";

        var data = {
            cId: 1,
            nickname: $("#nickname").val(),
            isRandom: 0
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
        var url = "http://" + host + ":" + port + "/role/getMainPlayer";

        var data = {

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

    $("#getMainPlayerWithCookie").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/getMainPlayer";

        var data = {

        };
        var params = "";
        for(var o in data) {
            params += o + "=" + data[o] + "&"
        }
        params = params.substr(0, params.length - 1);
        console.log(params);
        $.ajax({
            type: "get",
            url: url + "?" + params,
            beforeSend : function (xhr) {
                xhr.setRequestHeader('Cookie', "connect.sid=s%3AYcm7d4MODUTacVVyDk6r69Gq.eJrQ4paS43jjOvnSfB74he0R3mVeQZUcIhIO4x11tVw");
                xhr.setRequestHeader('test', "test");
            },
            success: function(data, status) {
                console.log(data);
            }
        });
    });

    $("#getNickname").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/getNickname";

        var data = {

        };
        request(url, data);
    });

    $("#removeMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/removeMainPlayer";

        var data = {

        };
        request(url, data);
    });

    $("#testCreateMainPlayer").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/role/testCreateMainPlayer";

        var data = {

        };
        request(url, data);
    });

    $("#battle").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/battle/battle";

        var data = {
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

    $("#changeArea").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/changeArea";

        var data = {
            currentScene: "city01",
            target: "city02"
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

    $("#changeAndGetSceneData").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/changeAndGetSceneData";

        var data = {
            currentScene: $("#currentScene").val(),
            target: $("#sceneId").val()
        };
        request(url, data);
    });

    $("#getAreaInfo").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/area/getAreaInfo";

        var data = {
            sceneId: $("#sceneId").val()
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

    $("#enterIndu").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/enterIndu";

        var data = {
            induId: "Ins10101"
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

    $("#leaveIndu").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/leaveIndu";

        var data = {
            induId: "Ins10101"
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

    $("#triggerEvent1").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
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

    $("#triggerEvent2").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/indu/triggerEvent";

        var data = {
            eid: "E101011"
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

    $("#changeFormation").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/formation/change";

        var data = {
            formation: encodeURIComponent(JSON.stringify([null,{playerId:"S1C7420"},null,null,null,null,null]))
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

    /**
     * 添加物品
     */
    $("#addItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/addItem";

        var data = {
            itemId: $("#itemId").val(),
            itemNum: 1,
            itemLevel: 1
        };
        request(url, data);
    });

    $("#wearWeapon").bind("click", function() {
        var index = $("#index").val();//1
        var weaponId = $("#weaponId").val();//W01011
        var playerId = $("#playerId").val();

        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/wearWeapon";

        var data = {
            index: index,
            weaponId: weaponId,
            playerId: playerId
        };
        request(url, data);
    });

    $("#unWearWeapon").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/unWearWeapon";

        var weaponId = $("#weaponId").val();//W01011
        var playerId = $("#playerId").val();
        var data = {
            weaponId: weaponId,
            playerId: playerId
        };
        request(url, data);
    });


    $("#equip").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/equip";

        var index = $("#index").val();//1
        var eqId = $("#eqId").val();//W01011
        var pkgType = $("#pkgType").val();//weapons
        var playerId = $("#playerId").val();
        var data = {
            index: index,
            eqId: eqId,
            pkgType: pkgType,
            playerId: playerId
        };
        request(url, data);
    });

    $("#unEquip").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/unEquip";

        var type = $("#type").val();//weapon armor
        var eqId = $("#eqId").val();//W01011 W901011
        var playerId = $("#playerId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId
        };
        request(url, data);
    });

    $("#upgrade").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/equip/upgrade";

        var type = $("#type").val();
        var eqId = $("#eqId").val();//W01011
        var playerId = $("#playerId").val();
        var data = {
            eqId: eqId,
            type: type,
            playerId: playerId
        };
        request(url, data);
    });

    $("#getPartner").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/getPartner";

        var data = {
            cId: $("#cId").val()
        };
        request(url, data);
    });

    $("#startTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/startTask";

        var data = {
            taskId: $("#taskId").val()
        };
        request(url, data);
    });

    $("#handOverTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/task/handOverTask";

        var data = {
            taskId: $("#taskId").val()
        };
        request(url, data);
    });

    $("#learnSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/learnSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });

    $("#upgradeSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/upgradeSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });

    $("#useSkill").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/player/useSkill";

        var data = {
            skillId: $("#skillId").val()
        };
        request(url, data);
    });

    $("#resetTask").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/resetTask";

        var data = {
            //type: 1,
            type: "currentMainTask",
            //taskId: "Task10102",
            taskId: "Task10101",
            nickname: "html5"
        };
        request(url, data);
    });

    $("#updateMoney").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/updateMoney";

        var data = {
            nickname: "html5",
            money: 100
        };
        request(url, data);
    });

    $("#updateExp").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/gm/updateExp";

        var data = {
            nickname: "html5",
            exp: 100
        };
        request(url, data);
    });

    $("#buyItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/shop/buyItem";

        var wid = $("#itemId").val();
        var num = $("#itemNum").val();
        var data = {
            wid: wid,
            num: num,
            currentScene: "city01"
        };
        request(url, data);
    });

    $("#sellItem").bind("click", function() {
        var host = $("#host").val();
        var port = $("#port").val();
        var url = "http://" + host + ":" + port + "/package/sellItem";

        var itemId = $("#itemId").val();
        var index = $("#index1").val();
        var itemNum = $("#itemNum").val();
        var type = $("#type1").val();
        var data = {
            itemId: itemId,
            index: index,
            itemNum: itemNum,
            type: type
        };
        request(url, data);
    });
});

function request(url, data) {
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
}