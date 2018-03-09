import * as THREE from 'three';
import GameEntity from '../../lib/GameEntity';
import GameContext from '../../lib/GameContext';
import Piece from './Piece';
import Selector from './Selector';


interface PieceMoveEvent{
	piece: Piece;
	from: THREE.Vector3;
	to: THREE.Vector3;
}

let cells: string[] = [
	"b_b_b_b_",
	"_b_b_b_b",
	"________",
	"________",
	"________",
	"________",
	"w_w_w_w_",
	"_w_w_w_w"
];

export default class Board extends GameEntity{
	public cellSize: number = 25;
	public rows: number = cells.length;
	public columns: number = cells[0].length;
	public height: number = 15;
	constructor(context: GameContext){
		super(context);
		let geometry = new THREE.BoxBufferGeometry(
			200,//this.columns*this.cellSize,
			200,//this.rows*this.cellSize,
			this.height);

		let texture = new THREE.TextureLoader().load('tex/board.jpg');
		let material = new THREE.MeshBasicMaterial( {
			map: texture,
			side: THREE.DoubleSide
		});
		this.mesh = new THREE.Mesh( geometry, material );
		this.mesh.name = "Board";
		this.mesh.position.x = this.cellSize/2;
		this.mesh.position.y = this.cellSize/2;

		this.context.pubsub.subscribe("move",_=>this.pieceMove(_));

	}

	private pieceMove(evt: PieceMoveEvent){
		console.log(evt);
	}

	private addSelector(){
		let selector = new Selector(this.context);
		this.add(selector);
	}

	private async addPieces(){

		for(let row in cells){
			for(let column in cells){
				let cell = cells[row][column];
				if(cell!=="_"){
					let piece = new Piece(this.context,{
						team: cell,
					});
					console.log(row,column);
					piece.position.x = piece.width*(+column) - this.rows*this.cellSize/2 + this.cellSize;
					piece.position.y = piece.width*(+row) - this.rows*this.cellSize/2 + this.cellSize;
					await piece.init();
				}
			}
		}
	}

	private placePieces(){
	}

	private addLight(){
		this.context.scene.add( new THREE.AmbientLight( 0xffffff) );
		let light = new THREE.PointLight( 0xffffff, 1, 5000 );
		light.position.set( 500, 500, 500 );
		this.context.scene.add(light);
	}

	public async init(){
		await this.addPieces();
		this.addSelector();
		this.addLight();
		await super.init();
	}
}
