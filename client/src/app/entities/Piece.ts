import * as THREE from 'three';
import DraggableEntity from '../../lib/DraggableEntity';
import GameContext from '../../lib/GameContext';
import * as ColladaLoader from 'three-collada-loader';

interface PieceDescriptor{
	team: string;
}

export default class Piece extends DraggableEntity{
	public width = 25;
	private selectedMaterial: THREE.Material;
	private unselectedMaterial: THREE.Material;
	private descriptor: PieceDescriptor;

	public position: THREE.Vector3;

	constructor(context: GameContext,descriptor: PieceDescriptor){
		super(context);

		this.position = new THREE.Vector3();
		this.descriptor = descriptor;
	}

	protected mouseDown(evt: MouseEvent){
		super.mouseDown(evt);

		let pos = this.context.getMouse3D(evt);

		if(evt.which === 1 && this.contains(pos))
			this.context.control.enableRotate=false;
	}

	protected mouseMove(evt: MouseEvent){
		let pos = this.context.getMouse3D(evt);
		if(this.contains(pos))
			this.mesh.material = this.selectedMaterial;
		else
			this.mesh.material = this.unselectedMaterial;
		super.mouseMove(evt);

	}

	protected mouseUp(evt: MouseEvent){
		if(this.dragging){
			this.context.control.enableRotate=true;
			this.snapToGrid(this.width);
			this.context.pubsub.publish("move",{
				piece: this,
				from: this.mesh.position,
				to: this.prevPos
			});
		}
		super.mouseUp(evt);
	}

	private resetRotation(){
		if(this.descriptor.team == "b")
			this.mesh.rotation.z=Math.PI;
		else
			this.mesh.rotation.z=0;
	}

	public async init(){
		let collada: any = await new Promise((resolve,reject)=>{
			console.log(THREE);
			let loader = new ColladaLoader();
			loader.load("models/robot.dae",resolve);
		});
		this.mesh = collada.scene;
		this.mesh.geometry = new THREE.BoxBufferGeometry(this.width,this.width,this.width);
		this.mesh.position.x = this.position.x;
		this.mesh.position.y = this.position.y;
		this.mesh.position.z = 20;
		this.selectedMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
		this.unselectedMaterial = new THREE.MeshPhysicalMaterial( { color: 0xababab } );
		this.setDraggable();
		this.resetRotation();

		await super.init();
	}
}

