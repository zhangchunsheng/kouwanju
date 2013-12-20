$import('network/socket.rt.js');

window.socket = window.socket || {};

(function() {

    var req = socket.request;

    socket.request = function() {
        req.apply(socket, arguments);
    };

})();

