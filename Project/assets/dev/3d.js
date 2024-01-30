import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

/* cena... */
let cena = new THREE.Scene();
cena.background = new THREE.Color('whitesmoke');

// criar uma camara...
let camara = new THREE.PerspectiveCamera(50, 1920 / 1080, 0.01, 1000)
camara.position.set(0, 2, 4);
camara.lookAt(0, 0, 0);

/* renderer... */
var canvas = document.getElementById("display_content");
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(320, 200);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.7;
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camara, renderer.domElement); // Use OrbitControls from examples

//set lights
let luzAmbiente = new THREE.AmbientLight(0xffffff, 0.2);
cena.add(luzAmbiente);
var pointLight = new THREE.DirectionalLight( 0xffffff, 5 );
pointLight.castShadow = true;
pointLight.position.set(0, 10, 10);
var lightHolder = new THREE.Group();
lightHolder.add(pointLight);
cena.add(lightHolder);

var wood_normal_texture = new THREE.TextureLoader().load('assets/materials/Wood_Normal_2K.png');
wood_normal_texture.wrapS = THREE.RepeatWrapping;
wood_normal_texture.wrapT = THREE.RepeatWrapping;
wood_normal_texture.magFilter = THREE.NearestFilter;
wood_normal_texture.rotation = 1.571;
wood_normal_texture.repeat.set(4, 4);
const material = new THREE.MeshBasicMaterial({
    map: wood_normal_texture,
    side: THREE.DoubleSide,
});


/***************************************ANIMAÇÕES******************************************************/

// OBJETOS INDIVIDUAIS

let loader = new GLTFLoader();
let model;

loader.load('model/aparador.gltf', function (gltf) {
    model = gltf.scene;
    cena.add(model);
});

function changeSize() {
    const sizeSelector = document.getElementById('sizeSelector');
    const selectedSize = sizeSelector.value;

    switch (selectedSize) {
        case 'size_M':
            model.scale.set(1, 1, 1.1);
            break;
        case 'size_L':
            model.scale.set(1, 1, 1.2);
            break;
        case 'size_XL':
            model.scale.set(1, 1, 1.3);
            break;
        default:
            model.scale.set(1, 1, 1);
            break;
    }
}

function render() {
    renderer.render(cena, camara);
}

document.getElementById('sizeSelector').addEventListener('change', changeSize);

animate();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(cena, camara);
}
