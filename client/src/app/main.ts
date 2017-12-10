import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls';

let camera: THREE.PerspectiveCamera;
let control: OrbitControls;
let scene: THREE.Scene
let renderer: THREE.WebGLRenderer;
let mesh: THREE.Mesh;

function init() {
	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.z = 400;
	camera.lookAt(new THREE.Vector3(0,0,0));

	control = new OrbitControls(camera);
	control.update();

	scene = new THREE.Scene();
	let geometry = new THREE.BoxBufferGeometry( 200, 200, 1 );
	let material = new THREE.MeshBasicMaterial( { color: "#ff0000" } );
	mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
function animate() {
	requestAnimationFrame( animate );
	control.update();
	renderer.render( scene, camera );
}

window.onload=()=>{
	init();
	animate();
}
