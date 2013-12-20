window.socket = window.socket || {};

(function() {

    var client;
    var serverId;

    var requestKeeper = (function() {
        var keepedReqHash = {};
        var idPrefix = "socket_cb_";
        var idGen = 20;

        return {
            save: function (req) {
                var id = idGen++;
                req.id = id;
                keepedReqHash[idPrefix + id] = req;
                return req;
            },
            get: function (key) {
                return keepedReqHash[idPrefix + key];
            },
            remove: function (key) {
                delete keepedReqHash[idPrefix + key];
            },
            removeAll: function () {
                keepedReqHash = {};
            }
        }
    })();

    function send(id, route, msg) {
        var data = {
            id : id,
            route : route,
            body : msg
        };
        data = socket.protocol.encode(id, route, msg);
        client.send(data);
    }

    socket.state = 'disconnect';

    socket.CMD = {
        getUserInfo: 'connector.entryHandler.entry',
        acceptTask: 'area.taskHandler.startTask',
        commitTask: 'area.taskHandler.handOverTask',
        enterScene: 'area.playerHandler.enterScene',
        enterInstance : 'area.playerHandler.enterIndu',
        exitInstance : 'area.playerHandler.leaveIndu',
        triggerInstanceEvent : 'area.induHandler.triggerEvent',
        chat : 'chat.chatHandler.send'
    };

    socket.NOTIFY = {

    };

    socket.EVENT = {
        connect : 'connect',
        disconnect : 'disconnect',
        message : 'message',
        taskProgress : 'taskProgress'
    };

    socket.getServerList = function(tokenData, successCallback, failCallback) {
        socket.gate.getServerList(tokenData, successCallback, failCallback);
    };

    socket.connect = function(aServerId) {
        var url = socket.gate.getConnectorURLById(aServerId);
        console.log('## connecting ', url);
        if(url && socket.state === 'disconnect') {
            serverId = aServerId;
            socket.state = 'connecting';
            client = io.connect(url);
            client.on('connect', function() {
                socket.state = 'connect';
            });
            client.on('disconnect', function() {
                socket.state = 'disconnect';
            });
            client.on('message', function(data) {
                console.log('## receive message');
                var msg = JSON.parse(data);
                var req = requestKeeper.get(msg.id);
                if(req) {
                    msg.body.success = msg.body.code === 200;
                    req.callback && req.callback(msg.body);
                    requestKeeper.remove(msg.id);
                }
            });
        }
    };

    socket.request = function(command, data, callback) {
        if(typeof data === 'function') {
            callback = data;
            data = {};
        }
        var req = {
            id : null,
            cmd : command,
            data : data,
            callback : callback
        };
        data.token = socket.token;
        data.serverId = serverId;
        console.log('## request ', command);
        req = requestKeeper.save(req);
        //TODO
        send(req.id, req.cmd, req.data);
        return req.id;
    };

    socket.notify = function(command, data) {
        var req = {
            id : null,
            cmd : command,
            data : data
        };
        data.token = socket.token;
        data.serverId = serverId;
        console('## notify ', command, JSON.stringify(data));
        send(req.id, req.cmd, req.data);
    };

    socket.on = function(event, callback) {
        client.on(event, callback);
    };

    socket.once = function(event, callback) {
        client.once(event, callback);
    };

    socket.off = function(event, callback) {
        client.removeListener(event, callback);
    };

})();