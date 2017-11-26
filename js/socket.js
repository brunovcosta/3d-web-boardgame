var socket = new WebSocket("ws://"+location.host);
socket.onopen = function(){
	socket.send("enter");
}
