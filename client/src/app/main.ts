import * as THREE from 'three';
import {OrbitControls} from '../vendor/OrbitControls';
import Board from './entities/Board';
import Piece from './entities/Piece';
import GameContext from '../lib/GameContext';

let renderer: THREE.WebGLRenderer;
let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene

let control: OrbitControls;
let context = new GameContext(renderer,camera,scene);

let board = new Board(context);
let piece = new Piece(context);

function init() {

	context.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
	context.camera.position.z = 400;
	context.camera.lookAt(new THREE.Vector3(0,0,0));

	control = new OrbitControls(context.camera);
	control.update();

	context.scene = new THREE.Scene();

	context.scene.add( board.mesh );

	context.scene.add(piece.mesh);

	context.renderer = new THREE.WebGLRenderer();
	context.renderer.setPixelRatio( window.devicePixelRatio );
	context.renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( context.renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );

	piece.setDraggable();
}

function onWindowResize() {
	context.camera.aspect = window.innerWidth / window.innerHeight;
	context.camera.updateProjectionMatrix();
	context.renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
	requestAnimationFrame( animate );
	if(!board.contains(context.mouseStartWorldPosition)){
		control.update();
	}
	context.renderer.render( context.scene, context.camera );
}

window.onload = ()=>{
	init();
	animate();
}
