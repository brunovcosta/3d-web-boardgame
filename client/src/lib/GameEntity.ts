import * as THREE from 'three';
import GameContext from './GameContext';

export default class GameEntity{
	public geometry: THREE.BoxBufferGeometry;
	public material: THREE.Material;
	public mesh: THREE.Mesh;
	public context: GameContext;

	public constructor(context: GameContext){
		this.context = context;
	}

	public contains(point: THREE.Vector3){
		let w = this.geometry.parameters.width;
		let h = this.geometry.parameters.height;
		let x = this.mesh.position.x;
		let y = this.mesh.position.y;

		return x-w/2 < point.x && x+w/2 > point.x && y-h/2 < point.y && y+h/2 > point.y;
	}
}

