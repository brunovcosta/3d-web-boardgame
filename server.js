var http = require('http');
var fs = require('fs');
var ws = require('ws');

var server = http.createServer(function(req, res) {
	try{
		res.end(fs.readFileSync("."+req.url));
	} catch(e) {
		res.end(fs.readFileSync('index.html'));
	}
	res.writeHead(200);
});

var wss = new ws.Server({server:server});

var connections = [];
var pairs = [];
var wait = null;
wss.on('connection', function(ws) {
	connections.push(ws);
	ws.on('message', function(jsonStr) {
		sendAll(ws,jsonStr);
	});
	ws.on('close', function() {
		connections = connections.filter(conn=>conn!==ws);
	});
});

function sendAll(from,msg){
	connections.forEach(function(con, i) {
		if (from != con) {
			try{
				con.send(msg);
			}catch(e){
			}
		}
	});
}

server.listen(3000);
