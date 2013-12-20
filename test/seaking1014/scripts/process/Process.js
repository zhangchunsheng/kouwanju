(function() {

    var Ajax = wozllajs.Ajax;

    var Process = function(id, processData, tags) {
        this.UID = wozllajs.UniqueKeyGen ++;
        this.id = id;
        this.data = processData;
        this.tags = processData.tags || tags;
        this.nextProcess = processData.next;
        this.context = {};
    };

    Process.currentMap = {};

    Process.map = {};

    Process.register = function(type, config) {

        function DecorateProcess() {
            Process.apply(this, arguments);
        }

        var p = DecorateProcess.prototype = Object.create((Process.map[config.extend] || Process).prototype);

        for(var k in config) {
            if(p[k] && (typeof config[k] === 'function')) {
                p[config.extend + "_" + k] = p[k];
            }
            p[k] = config[k];
        }

        Process.map[type] = DecorateProcess;
    };

    Process.exec = function(id, tags) {
        if(Process.currentMap[id]) {
            Process.currentMap[id].execute();
            return;
        }
        if(id.indexOf('script/') === 0) {
            Ajax.get('datas/process/' + id, function(data) {
                var p = new Process.map['script'](id, data, tags);
                Process.currentMap[p.id] = p;
                p.execute();
            });
        } else {
            if(id.indexOf('.json') === -1) {
                id += '.json';
            }
            Ajax.getJSON('datas/process/' + id, function(data) {
                var ctor = Process.map[data.type];
                if(ctor) {
                    var p = new ctor(id, data, tags);
                    Process.currentMap[p.id] = p;
                    p.execute();
                }
            });
        }
    };

    Process.prototype = {

        UID : null,

        execute : function() {},

        dispose : function() {},

        on : function(type, listener, scope) {
            scope = this;
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.on(type, this, proxy, scope);
        },

        once : function(type, listener, scope) {
            scope = this;
            var proxy = listener[this._getSimpleProxyKey(scope, type)] = wozllajs.proxy(listener, scope);
            wozllajs.EventAdmin.once(type, this, proxy, scope);
        },

        off : function(type, listener, scope) {
            scope = this;
            wozllajs.EventAdmin.off(type, this, listener[this._getSimpleProxyKey(scope, type)]);
        },

        notify : function(type, params) {
            wozllajs.EventAdmin.notify(type, params);
        },

        next : function(nextProcess) {
            var next = nextProcess || this.nextProcess;
            delete Process.currentMap[this.id];
            this.dispose();
            if(next) {
                Process.exec(next, this.tags);
            }
        },

        _getSimpleProxyKey : function(scope, type) {
            return '_sp_' + scope.UID + '.' + type;
        }
    };

    game.Process = Process;

})();