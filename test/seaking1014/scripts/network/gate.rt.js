window.socket = window.socket || {};

(function() {

    var serverList;

    var gateOk = false;
    var gateServerURL = 'http://192.168.1.22:6014';
    var gateTime = 20000;

    var internalRequestId = {
        queryEntry : 1
    };

    socket.gate = {
        getServerList : function(tokenData, successCallback, failCallback) {
            if(serverList) {
                successCallback && successCallback(serverList);
            } else {
                var gateClient = io.connect(gateServerURL);
                gateClient.on('connect', function() {
                    console.log('## gate connected');
                    var data = socket.protocol.encode(internalRequestId.queryEntry,
                        'gate.gateHandler.queryServerList', tokenData);
                    gateClient.send(data);
                });
                gateClient.on('message', function(data) {
                    var msg = JSON.parse(data);
                    serverList = msg.body.serverLists;
                    console.log('## success to get server list');
                    gateClient.disconnect();
                    gateOk = true;
                    successCallback && successCallback(serverList);
                });
                setTimeout(function() {
                    if(!gateOk) {
                        failCallback && failCallback();
                    }
                }, gateTime);
            }
        },

        getConnectorURLById : function(id) {
            for(var i=0,len=serverList.length; i<len; i++) {
                var server = serverList[i];
                if(server.id === id) {
                    return 'http://' + server.connectors.host + ':' + server.connectors.port;
                }
            }
            return null;
        }
    };

})();