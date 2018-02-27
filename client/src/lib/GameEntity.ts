import * as THREE from 'three';
import GameContext from './GameContext';

export default class GameEntity{
	public mesh: THREE.Mesh;
	public context: GameContext;
	public children: GameEntity[];

	public constructor(context: GameContext){
		this.context = context;
		this.children = [];
	}

	public contains(point: THREE.Vector3){
		if(this.mesh.geometry){
			let w = (<THREE.BoxBufferGeometry> this.mesh.geometry).parameters.width;
			let h = (<THREE.BoxBufferGeometry> this.mesh.geometry).parameters.height;
			let x = this.mesh.position.x;
			let y = this.mesh.position.y;

			return x-w/2 < point.x && x+w/2 > point.x && y-h/2 < point.y && y+h/2 > point.y;
		}else{
			return false;
		}

	}

	public add(entiry: GameEntity){
		this.children.push(entiry)
	}

	public async init(){
		this.context.scene.add(this.mesh);
		this.bindEvents();
		for(let child of this.children){
			await child.init();
		}
	}

	protected mouseUp(evt: MouseEvent){}
	protected mouseDown(evt: MouseEvent){}
	protected mouseMove(evt: MouseEvent){}

	public bindEvents(){
		let renderer = this.context.renderer;

		renderer.domElement.addEventListener('mousemove',_=>this.mouseMove(_),false);
		renderer.domElement.addEventListener('mousedown',_=>this.mouseDown(_),false);
		renderer.domElement.addEventListener('mouseup',_=>this.mouseUp(_),false);
	}

	protected snapToGrid(gridSize: number){
		this.mesh.position.x=Math.round(this.mesh.position.x/gridSize)*gridSize;
		this.mesh.position.y=Math.round(this.mesh.position.y/gridSize)*gridSize;
	}

}

