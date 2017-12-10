import * as THREE from 'three';

export default class GameContext{
	public renderer: THREE.WebGLRenderer;
	public camera: THREE.PerspectiveCamera;
	public scene: THREE.Scene;

	constructor(renderer: THREE.WebGLRenderer,camera: THREE.PerspectiveCamera,scene: THREE.Scene){
		this.camera = camera;
		this.scene = scene;
		this.renderer = renderer;
	}

	public getMouse3D(mouseEvent: MouseEvent) {
		let x, y;
		//
		if (mouseEvent.offsetX !== undefined) {
			x = mouseEvent.offsetX;
			y = mouseEvent.offsetY;
		} else {
			x = mouseEvent.layerX;
			y = mouseEvent.layerY;
		}

		let pos = new THREE.Vector3(0, 0, 0);
		let pMouse = new THREE.Vector3(
			(x / this.renderer.domElement.width) * 2 - 1,
			-(y / this.renderer.domElement.height) * 2 + 1,
			1
		);
		//
		pMouse.unproject(this.camera);

		let cam = this.camera.position;
		let m = pMouse.z / ( pMouse.z - cam.z );

		pos.x = pMouse.x + ( cam.x - pMouse.x ) * m;
		pos.z = pMouse.z + ( cam.z - pMouse.z ) * m;
		pos.y = pMouse.y + ( cam.y - pMouse.y ) * m;

		return pos;
	}

	public mouseStartPosition = {x: 0,y: 0};
	public mouseStartWorldPosition = new THREE.Vector3;
	public mousePosition = {x: 0,y: 0};

	private mouseDown(mouseEvent: MouseEvent){
		let x,y;
		if (mouseEvent.offsetX !== undefined) {
			x = mouseEvent.offsetX;
			y = mouseEvent.offsetY;
		} else {
			x = mouseEvent.layerX;
			y = mouseEvent.layerY;
		}

		this.mouseStartPosition = {x: x,y: y};
		this.mouseStartWorldPosition = this.getMouse3D(mouseEvent);
	}

	private mouseMove(mouseEvent: MouseEvent){
		let x,y;
		if (mouseEvent.offsetX !== undefined) {
			x = mouseEvent.offsetX;
			y = mouseEvent.offsetY;
		} else {
			x = mouseEvent.layerX;
			y = mouseEvent.layerY;
		}

		this.mousePosition = {x: x,y: y};
	}

	public init(){
		this.renderer.domElement.addEventListener('mousemove',_=>this.mouseMove(_),false);
		this.renderer.domElement.addEventListener('mousedown',_=>this.mouseDown(_),false);
	}

}
