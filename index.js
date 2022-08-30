import '../CSS/main.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// GLTF mesh loading
const loader = new GLTFLoader();


loader.load( '29tst.glb',  gltf => {

    model = gltf.scene
	scene.add( model )

    gui.add(model.rotation, 'y').min(5).max(9)
    gui.add(model.rotation, 'x').min(0).max(9)
    gui.add(model.rotation, 'z').min(0).max(9)

}, undefined, function ( error ) {

	console.error( error );

} );


// Canvas
const canvas = document.querySelector('#upperq')

// Scene
const scene = new THREE.Scene()

// Lights
const light = new THREE.DirectionalLight('white', 55)
light.position.set(0, 0.8, 1)

scene.add(light)

//Camera
var camera = new THREE.PerspectiveCamera( 105, window.innerWidth/window.innerHeight, 0.1, 1000 );
scene.add(camera);

camera.position.z = 0.25
camera.position.y = 0.2
camera.position.x = 0

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
	alpha: true
})

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {
    requestAnimationFrame( animate );

    model.rotation.y += 0.01;
    

    renderer.render( scene, camera );
};

animate();