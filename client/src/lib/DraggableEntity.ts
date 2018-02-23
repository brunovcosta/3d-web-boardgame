import * as THREE from 'three';
import GameEntity from './GameEntity';
import GameContext from './GameContext';

export default class DraggableEntity extends GameEntity{
	public dragging: boolean;
	private mouseClicks: {[k :number]: boolean}= {
		0: false,
		1: false,
		2: false,
		3: false
	}
	private mouseStarts: {[k :number]: THREE.Vector3}= {
		0: null,
		1: null,
		2: null,
		3: null
	}
	public prevPos = {x: 0,y: 0};

	public setDraggable(){
		let renderer = this.context.renderer;

		renderer.domElement.addEventListener('mousemove',_=>this.mouseMove(_),false);
		renderer.domElement.addEventListener('mousedown',_=>this.mouseDown(_),false);
		renderer.domElement.addEventListener('mouseup',_=>this.mouseUp(_),false);
	}

	protected mouseDown(evt: MouseEvent){
		this.prevPos.x = this.mesh.position.x;
		this.prevPos.y = this.mesh.position.y;
		let pos = this.context.getMouse3D(evt);

		if(evt.which === 1 && this.contains(pos)){
			this.dragging=true;
		}
	}

	protected mouseUp(evt: MouseEvent){
		if(evt.which === 1){
			this.dragging=false;
		}
	}

	protected mouseMove(evt: MouseEvent){
		let pos = this.context.getMouse3D(evt);
		if(this.dragging){
			this.mesh.position.x = pos.x;
			this.mesh.position.y = pos.y;
		}
	}

	constructor(context: GameContext){
		super(context);
		this.dragging = false;

	}
}
