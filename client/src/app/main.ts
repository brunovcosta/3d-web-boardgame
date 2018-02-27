import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls';
import Board from './entities/Board';
import GameContext from '../lib/GameContext';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene


let context = new GameContext();
function init() {

	context.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	context.camera.position.z = 400;
	context.camera.lookAt(new THREE.Vector3(0,0,0));

	context.control = new OrbitControls(context.camera);
	context.control.update();

	let board = new Board(context);
	context.scene = new THREE.Scene();



	context.renderer = new THREE.WebGLRenderer();
	context.renderer.setPixelRatio( window.devicePixelRatio );
	context.renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( context.renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	board.init();
}

function onWindowResize() {
	context.camera.aspect = window.innerWidth / window.innerHeight;
	context.camera.updateProjectionMatrix();
	context.renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
	requestAnimationFrame( animate );
	context.control.update();
	context.renderer.render( context.scene, context.camera );
}

init();
animate();
