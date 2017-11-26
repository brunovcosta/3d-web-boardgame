refreshUI();

socket.onmessage=function (msg){
	if(msg.data.startsWith("create")){
		var arr = msg.data.split(" ");
		var type = arr[1];
		var cell = oppositeCell(arr[2]);
		addPiece(cell,type,"black");
	}else if(msg.data.startsWith("move")){
		var arr = msg.data.split(" ");
		var from = oppositeCell(arr[1]);;
		var to = oppositeCell(arr[2]);
		movePiece(from,to);
	}else if(msg.data.startsWith("attack")){
		var arr = msg.data.split(" ");
		var from = oppositeCell(arr[1]);;
		var to = oppositeCell(arr[2]);
		attackPiece(from,to);
	}else if(msg.data.startsWith("enter")){
		$("#players_list").append("<li>teste");
	}else if(msg.data.startsWith("leave")){
		$("#players_list").empty();
	}
}
