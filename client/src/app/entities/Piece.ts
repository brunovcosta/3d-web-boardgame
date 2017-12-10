import * as THREE from 'three';
import {GameEntity} from 'lib';

export default class Piece extends GameEntity{
	constructor(){
		super();
		this.geometry = new THREE.BoxBufferGeometry( 25, 25, 25 );
		this.material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
		this.mesh = new THREE.Mesh( this.geometry, this.material );
	}
}

