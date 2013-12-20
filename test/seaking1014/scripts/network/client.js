var client = {};

(function() {

    var isConnectServer = true;

    var token = '464363099bc522beb8aff5cf16bbcf019f8516f3bc58e4b2d585d9a40b8d2ac5';
    var gateURL = isConnectServer ? 'http://192.168.1.22:8090/' : 'server/';
    var serverURL;


    client.getJSON = function(url, data, onSuccess, onFail, onTimeout) {
        var debugURL = url.replace(serverURL, '').replace(gateURL, '');
        if(typeof data === 'function') {
            onSuccess = data;
            onFail = onSuccess;
            onTimeout = onFail;
            data = {};
        }
        data['_'] = Date.now();
        var queryString = url.indexOf('?') === -1 ? '?' : '';
        for(var key in data) {
            queryString += '&' + key + '=' + data[key];
        }
        url += queryString;

        var timeout;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            var data;
            if(4 === xhr.readyState) {
                if(xhr.status === 0 || xhr.status === 200) {
                    try {
                        data = JSON.parse(xhr.responseText);
                    } catch(e) {
                        clearTimeout(timeout);
                        console.log('## fail exception ', e, e.stack);
                        onFail && onFail({
                            success : false,
                            exception : e
                        });
                        return;
                    }
                    clearTimeout(timeout);
                    console.log('## code=' + data.code, debugURL);
                    onSuccess && onSuccess(data);
                } else {
                    console.log('## fail status ' + xhr.status);
                    onFail && onFail({
                        success : false,
                        status : xhr.status
                    });
                }
            }
        };

        timeout = setTimeout(function() {
            console.log('## timeout on requset ' + url);
            onTimeout && onTimeout({
                success : false,
                timeout : true
            });
        }, 10000);
    };

    client.setToken = function(atoken) {
        token = atoken;
    };

    client.autoRegister = function(onSuccess, onFail, onTimeout) {
        client.getJSON(gateURL + 'autoRegister', onSuccess, onFail, onTimeout);
    };

    client.login = function(data, onSuccess, onFail, onTimeout) {
        client.getJSON(gateURL + 'login', data, onSuccess, onFail, onTimeout);
    };

    client.register = function(data, onSuccess, onFail, onTimeout) {
        client.getJSON(gateURL + 'register', data, onSuccess, onFail, onTimeout);
    };

    client.getServerList = function(onSuccess, onFail, onTimeout) {
        client.getJSON(gateURL + 'getServerList', {
            token : token
        }, onSuccess, onFail, onTimeout);
    };

    client.setServerURL = function(aServerURL) {
        serverURL = aServerURL;
        if(!isConnectServer) {
            serverURL = 'server/';
        }
    };

    client.auth = function(onSuccess, onFail, onTimeout) {
        client.getJSON(serverURL + 'auth', {
            token : token
        }, onSuccess, onFail, onTimeout)
    };

    client.getMainPlayer = function(onSuccess) {
        client.getJSON(serverURL + 'role/getMainPlayer', onSuccess);
    };

    client.createMainPlayer = function(data, onSuccess, onFail, onTimeout) {
        client.getJSON(serverURL + 'role/createMainPlayer', data, onSuccess, onFail, onTimeout);
    };

    client.removeMainPlayer = function(onSuccess, onFail, onTimeout) {
        client.getJSON(serverURL + 'role/removeMainPlayer', onSuccess, onFail, onTimeout);
    };

    client.enterScene = function(data, onSuccess) {
        client.getJSON(serverURL + 'player/changeAndGetSceneData', data, onSuccess);
    };

    client.enterIndu = function(data, onSuccess) {
        client.getJSON(serverURL + 'player/enterIndu', data, onSuccess);
    };

    client.battle = function(data, onSuccess) {
        client.getJSON(serverURL + 'battle/battle2', data, onSuccess);
    };

})();