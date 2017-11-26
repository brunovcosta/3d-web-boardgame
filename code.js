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

var moveRules = {
	king: function(pos,color){
		return [
			[-1,-1],
			[-1, 0],
			[-1,+1],

			[ 0,-1],
			[ 0,+1],

			[+1,-1],
			[+1, 0],
			[+1,+1]
		];

	},
	queen: function(pos,color){
		var possible = [];
		for(var i=1;i<8;i++){
			possible.push([i,i]);
			if(!pos.plus([i,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([i,0]);
			if(!pos.plus([i,0]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([0,i]);
			if(!pos.plus([0,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([i,-i]);
			if(!pos.plus([i,-i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,i]);
			if(!pos.plus([-i,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,0]);
			if(!pos.plus([-i,0]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([0,-i]);
			if(!pos.plus([0,-i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,-i]);
			if(!pos.plus([-i,-i]).empty())
				break;
		}
		return possible;

	},
	rook: function(pos,color){
		var possible = [];
		for(var i=1;i<8;i++){
			possible.push([i,0]);
			if(!pos.plus([i,0]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([0,i]);
			if(!pos.plus([0,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,0]);
			if(!pos.plus([-i,0]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([0,-i]);
			if(!pos.plus([0,-i]).empty())
				break;
		}
		return possible;

	},
	bishop: function(pos,color){
		var possible = [];
		for(var i=1;i<8;i++){
			possible.push([i,i]);
			if(!pos.plus([i,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([i,-i]);
			if(!pos.plus([i,-i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,i]);
			if(!pos.plus([-i,i]).empty())
				break;
		}
		for(var i=1;i<8;i++){
			possible.push([-i,-i]);
			if(!pos.plus([-i,-i]).empty())
				break;
		}
		return possible;

	},
	pawn: function(pos,color){
		if(pos.coords[1]===1 && color==="white" || pos.coords[1]===6 && color==="black"){
			return [
				[0,color==="white"?1:-1],
				[0,color==="white"?2:-2]
			];
		}else{
			return [
				[0,color==="white"?1:-1]
			];
		}
	},
	knight: function(pos,color){
		return [
			[1,2],
			[1,-2],
			[2,1],
			[2,-1],
			[-1,2],
			[-1,-2],
			[-2,1],
			[-2,-1]
		]
	}
};

var attackRules = {
	king: moveRules.king,
	queen: moveRules.queen,
	bishop: moveRules.bishop,
	rook: moveRules.rook,
	knight: moveRules.knight,
	pawn: function(pos,color){
		return [
			[ 1,color==="white"?1:-1],
			[-1,color==="white"?1:-1]
		];
	}
};

(function turn(turnColor){
	$('.piece.'+(turnColor==="white"?"black":"white")).draggable({
		disabled: true
	});
	$('.piece.'+turnColor).draggable({
		disabled: false,
		containment: "table",
		revert: 'invalid',
		start: function(ev,ui){
			$("td").droppable({disabled: true});
			for(var type in moveRules){
				if($(this).attr("class").split(" ").includes(type)){
					var initialPos = Position($(this).parent().attr("id"));
					var color = $(this).hasClass("black")?"black":"white";
					var opposite = (color==="black"?"white":"black");
					var movePossibles = moveRules[type](initialPos,color);
					$(movePossibles.map(function(diff){
						return "td:empty#"+initialPos.plus(diff).code;
					}).join()).droppable({
						drop: moveDrop,
						disabled: false
					}).addClass("move-highlight");

					var attackPossibles = attackRules[type](initialPos,color);
					$(attackPossibles.map(function(diff){
						return "td:not(:empty):has(> ."+opposite+")#"+initialPos.plus(diff).code;
					}).join()).droppable({
						drop: attackDrop,
						disabled: false
					}).addClass("attack-highlight");
				}
			}
		},
		stop: function(){
			$(".move-highlight").removeClass("move-highlight");
			$(".attack-highlight").removeClass("attack-highlight");

			turn(turnColor==="white"?"black":"white");
		}
	});
})("white");

function moveDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	$(droppedOn).droppable("disable");
	$(dropped).parent().droppable("enable");
	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}

function attackDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	droppedOn.empty();
	$(droppedOn).droppable("disable");
	$(dropped).parent().droppable("enable");
	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}
