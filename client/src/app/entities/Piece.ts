import * as THREE from 'three';
import DraggableEntity from '../../lib/DraggableEntity';
import GameContext from '../../lib/GameContext';

export default class Piece extends DraggableEntity{
	constructor(context: GameContext){
		super(context);
		this.geometry = new THREE.BoxBufferGeometry( 25, 25, 25 );
		this.material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
		this.mesh = new THREE.Mesh( this.geometry, this.material );
	}
}

