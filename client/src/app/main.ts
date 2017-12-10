import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls';
import {Board,Piece} from './entities';

let camera: THREE.PerspectiveCamera;
let control: OrbitControls;
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer;
let tableMesh: THREE.Mesh;

let table = new Board();
let piece = new Piece();




function mouseMove(evt: MouseEvent){
	let pos = getMouse3D(evt);
	piece.mesh.position.x = pos.x;
	piece.mesh.position.y = pos.y;
	piece.mesh.position.z = 0;
}

function init() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;
	camera.lookAt(new THREE.Vector3(0,0,0));

	control = new OrbitControls(camera);
	control.update();

	scene = new THREE.Scene();

	scene.add( table.mesh );

	scene.add(piece.mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.domElement.addEventListener('mousemove',mouseMove,false);

	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function getMouse3D(mouseEvent: MouseEvent) {
	var x, y;
	//
	if (mouseEvent.offsetX !== undefined) {
		x = mouseEvent.offsetX;
		y = mouseEvent.offsetY;
	} else {
		x = mouseEvent.layerX;
		y = mouseEvent.layerY;
	}

	var pos = new THREE.Vector3(0, 0, 0);
	var pMouse = new THREE.Vector3(
		(x / renderer.domElement.width) * 2 - 1,
		-(y / renderer.domElement.height) * 2 + 1,
		1
	);
	//
	pMouse.unproject(camera);

	var cam = camera.position;
	var m = pMouse.z / ( pMouse.z - cam.z );

	pos.x = pMouse.x + ( cam.x - pMouse.x ) * m;
	pos.z = pMouse.z + ( cam.z - pMouse.z ) * m;
	pos.y = pMouse.y + ( cam.y - pMouse.y ) * m;

	return pos;
}

function animate() {
	requestAnimationFrame( animate );
	control.update();
	renderer.render( scene, camera );
}

export default function main(){
	init();
	animate();
}
