import * as THREE from 'three';
import GameEntity from '../../lib/GameEntity';
import GameContext from '../../lib/GameContext';

export default class Board extends GameEntity{
	public cellSize: number = 25;
	public rows: number = 8;
	public columns: number = 8;
	public height: number = 15;
	constructor(context: GameContext){
		super(context);
		this.geometry = new THREE.BoxBufferGeometry(
			200,//this.columns*this.cellSize,
			200,//this.rows*this.cellSize,
			this.height);

		this.material = new THREE.MeshBasicMaterial( { color: "#ff0000" } );
		this.mesh = new THREE.Mesh( this.geometry, this.material );
	}
}
