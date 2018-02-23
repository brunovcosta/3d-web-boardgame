import GameEntity from '../../lib/GameEntity';
import * as THREE from 'three';
import GameContext from '../../lib/GameContext';

export default class Selector extends GameEntity{
	public width = 25;
	constructor(context: GameContext){
		super(context);

		let geometry = new THREE.BoxBufferGeometry(this.width,this.width,this.width); 
		let material = new THREE.MeshBasicMaterial( { color: "#ffffff",wireframe: true} );
		this.mesh = new THREE.Mesh( geometry, material );
	}


	protected mouseMove(evt: MouseEvent){
		super.mouseMove(evt);
		this.mesh.position.x = this.context.getMouse3D(evt).x;
		this.mesh.position.y = this.context.getMouse3D(evt).y;
		this.snapToGrid(this.width);
	}
}
