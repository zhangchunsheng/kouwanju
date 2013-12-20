var PORT = 8000;
var http = require('http');
var text = "h";
var i = 1;
var server = http.createServer(function (request, response) {
    // TODO
	//var pathname = url.parse(request.url).pathname;
	response.write("" + i);
	i++;
    response.end();
});
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");