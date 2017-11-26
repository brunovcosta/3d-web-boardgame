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

