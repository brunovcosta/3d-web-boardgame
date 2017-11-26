function Position(param){
	var pos = [0,0];
	var letters = "ABCDEFGH";
	if(typeof(param)==="string"){
		pos = [letters.indexOf(param[0]),+param[1]-1];
	}else if(typeof(param)==="object" && param.constructor===Array){
		pos = param;
	}

	var code = letters[pos[0]]+(pos[1]+1);
	return {
		empty: function(){return $("#"+code).is(":empty");},
		valid: pos[0]>0 && pos[0]<8 && pos[1]>0 && pos[1]<8,
		code: code,
		coords: pos,
		plus: function(param){
			var ppos = Position(param).coords;
			return Position([
				pos[0]+ppos[0],
				pos[1]+ppos[1]
			]);
		}
	};
}

function enterDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}

function moveDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	$(droppedOn).droppable("disable");
	$(dropped).parent().droppable("enable");

	var from = $(dropped).parent().attr("id");
	var to = $(this).attr("id");
	socket.send("move "+from+" "+to);
	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}

function attackDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	droppedOn.empty();
	$(droppedOn).droppable("disable");
	$(dropped).parent().droppable("enable");

	var from = $(dropped).parent().attr("id");
	var to = $(this).attr("id");
	socket.send("attack "+from+" "+to);

	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}

function oppositeCell(cell){
	if(typeof(cell)==="string"){
		return cell[0]+(9- +cell[1])
	}
}

function addPiece(cell,type,color){
	var img = $("<img>");
	img.addClass("piece");
	img.addClass(type);
	img.addClass(color);
	img.attr("src","./pieces/"+type+"_"+color+".png");
	img.appendTo($("#"+cell));
	refreshUI();
}

function movePiece(from,to){
	$("#"+from+" .piece").appendTo($("#"+to));
}

function attackPiece(from,to){
	$("#"+to).empty();
	$("#"+from+" .piece").appendTo($("#"+to));
}

function getPieceType(element){
	for (var type in moveRules){
		if ($(element).hasClass(type))
			return type;
	}
}

function refreshUI(){
	$('#chess_board .piece').draggable({
		disabled: false,
		containment: "#chess_board",
		revert: 'invalid',
		start: function(ev,ui){
			$("#chess_board td").droppable({disabled: true});
			for(var type in moveRules){
				if($(this).attr("class").split(" ").includes(type)){
					var initialPos = Position($(this).parent().attr("id"));
					var color = $(this).hasClass("black")?"black":"white";
					var opposite = (color==="black"?"white":"black");
					var movePossibles = moveRules[type](initialPos,color);
					$(movePossibles.map(function(diff){
						return "#chess_board td:empty#"+initialPos.plus(diff).code;
					}).join()).droppable({
						drop: moveDrop,
						disabled: false
					}).addClass("move-highlight");

					var attackPossibles = attackRules[type](initialPos,color);
					$(attackPossibles.map(function(diff){
						return "#chess_board td:not(:empty):has(> ."+opposite+")#"+initialPos.plus(diff).code;
					}).join()).droppable({
						drop: attackDrop,
						disabled: false
					}).addClass("attack-highlight");
				}
			}
		},
		stop: function(ev,ui){
			$(".move-highlight").removeClass("move-highlight");
			$(".attack-highlight").removeClass("attack-highlight");
		}
	});

	$('#bag .piece').draggable({
		disabled: false,
		revert: 'invalid',
		start: function(ev,ui){
			$("#chess_board td:empty").droppable({
				disabled: false,
				drop: enterDrop

			});
		},
		stop: function(ev,ui){
			var cell = $(this).parent().attr("id");
			var type = getPieceType(this);
			socket.send("create "+type+" "+cell);
			refreshUI();
		}
	});
}

