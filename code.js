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
			if(!pos.plus([i,i]).empty())
				break;
			possible.push([i,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([i,0]).empty())
				break;
			possible.push([i,0]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([0,i]).empty())
				break;
			possible.push([0,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([i,-i]).empty())
				break;
			possible.push([i,-i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,i]).empty())
				break;
			possible.push([-i,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,0]).empty())
				break;
			possible.push([-i,0]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([0,-i]).empty())
				break;
			possible.push([0,-i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,-i]).empty())
				break;
			possible.push([-i,-i]);
		}
		return possible;

	},
	rook: function(pos,color){
		var possible = [];
		for(var i=1;i<8;i++){
			if(!pos.plus([i,0]).empty())
				break;
			possible.push([i,0]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([0,i]).empty())
				break;
			possible.push([0,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,0]).empty())
				break;
			possible.push([-i,0]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([0,-i]).empty())
				break;
			possible.push([0,-i]);
		}
		return possible;

	},
	bishop: function(pos,color){
		var possible = [];
		for(var i=1;i<8;i++){
			if(!pos.plus([i,i]).empty())
				break;
			possible.push([i,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([i,-i]).empty())
				break;
			possible.push([i,-i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,i]).empty())
				break;
			possible.push([-i,i]);
		}
		for(var i=1;i<8;i++){
			if(!pos.plus([-i,-i]).empty())
				break;
			possible.push([-i,-i]);
		}
		return possible;

	},
	pawn: function(pos,color){
		if(pos.coords[1]===1 && color==="white" || pos.coords[1]===6 && color==="black"){
			return [
				[0,1],
				[0,2]
			];
		}else{
			return [
				[0,1]
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
	pawn: function(pos,color){
		return [
			[-1,1],
			[+1,1]
		];
	}
};

$('.piece').draggable({
	containment: "table",
	revert: 'invalid',
	start: function(ev,ui){
		$("td").droppable({disabled: true});
		for(var type in moveRules){
			if($(this).attr("class").split(" ").includes(type)){
				var initialPos = Position($(this).parent().attr("id"));
				var possibles = moveRules[type](initialPos,$(this).hasClass("black")?"black":"white");
				console.log(possibles);
				$(possibles.map(function(diff){
					return "td:empty#"+initialPos.plus(diff).code;
				}).join()).droppable({
					drop: onDrop,
					disabled: false
				}).addClass("highlight");
			}
		}
	},
	stop: function(){
		$(".highlight").removeClass("highlight");
	}
});

function onDrop(ev, ui) {
	var dropped = ui.draggable;
	var droppedOn = $(this);
	$(droppedOn).droppable("disable");
	$(dropped).parent().droppable("enable");
	$(dropped).detach().css({top: 0, left: 0}).appendTo(droppedOn);
}


