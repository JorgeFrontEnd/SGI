import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

/* cena... */
let cena = new THREE.Scene();

// criar uma camara...
let camara = new THREE.PerspectiveCamera(50, 1200 / 520, 0.01,100)
camara.position.set(3.40, 0.672, 0);
camara.lookAt(0, 0, 0);


var canvas = document.getElementById("display_content");
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(620, 500);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.7;
renderer.shadowMap.enabled = true;

//set lights
//Luminosidade
function luzes(cena) {
    const luzAmbiente = new THREE.AmbientLight("lightyellow");
    cena.add(luzAmbiente);

    const luzPonto = new THREE.PointLight("lightyellow");
    luzPonto.position.set(0, 2, 2);
    luzPonto.intensity = 3;
    cena.add(luzPonto)

    const luzDirecional = new THREE.DirectionalLight("lightyellow");
    luzDirecional.position.set(3, 2, 0);
    luzDirecional.intensity = 3;
    cena.add(luzDirecional);
}

luzes(cena)

var misturador = new THREE.AnimationMixer(cena)

function render() {
    renderer.render(cena, camara);
}

/***************************************ANIMAÇÕES******************************************************/

let loader = new GLTFLoader();
let model, model2;;
let CircleJoint,LongArm,AbajurJoint,ShortArm,ArmToAbajurJoint;
let move_CircleJoint,move_LongArm, move_AbajurJoint,move_ShortArm,move_ArmToAbajurJoint;
let loader2 = new GLTFLoader(); 
let clickCount2 = 0;
let clickCount3 = 0;

loadMainScenario()

function removeScenario(){
    clickCount2  += 1;
    switch (clickCount2 ) {
        case 1:
            loadSecondScenario();
                if (model) {
                    cena.remove(model);
                }
            document.getElementById("btn_remove_scenario").textContent="mostrar cenario";
            break;
        case 2:
                loadMainScenario();
                if (model2) {
                    
                    cena.remove(model2);
                }
                clickCount2 = 0;
            document.getElementById("btn_remove_scenario").textContent="remover cenario";
            break;    
    }
}   

function loadMainScenario(){
    loader.load('model/ApliqueArticuladoPecaUnica2.gltf',
        function (gltf) {
            model = gltf.scene
            cena.add(model)
            misturador = new THREE.AnimationMixer(model);
            model.traverse(function (x) {
                if (x.name === 'SupportJoint') {
                    CircleJoint = x;
                    let animOpenGB = THREE.AnimationClip.findByName(gltf.animations, 'SupportJointAction');
                    move_CircleJoint = misturador.clipAction(animOpenGB);
                }
                
                if (x.name === 'LongArm') {
                    LongArm = x;
                    let animOpenGM = THREE.AnimationClip.findByName(gltf.animations, 'LongArmAction');
                    move_LongArm = misturador.clipAction(animOpenGM);
                }
                if (x.name === 'AbajurJoint') {
                    AbajurJoint = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'AbajurJointAction');
                    move_AbajurJoint = misturador.clipAction(animOpenPM);
                }
                if (x.name === 'ShortArm') {
                    ShortArm = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'ShortArmAction');
                    move_ShortArm = misturador.clipAction(animOpenPM);
                }
                if (x.name === 'ArmToAbajurJoint') {
                    ArmToAbajurJoint = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'ArmToAbajurJointAction');
                    move_ArmToAbajurJoint = misturador.clipAction(animOpenPM);
                }
            })
        })
}

function loadSecondScenario(){
    loader2.load('model/ApliquePe.gltf',
        function (gltf) {
            model2 = gltf.scene
            cena.add(model2)
            misturador = new THREE.AnimationMixer(model2);
            //camara.lookAt(0, 0, 0);
            model2.traverse(function (x) {
                if (x.name === 'SupportJoint') {
                    CircleJoint = x;
                    let animOpenGB = THREE.AnimationClip.findByName(gltf.animations, 'SupportJointAction');
                    move_CircleJoint = misturador.clipAction(animOpenGB);
                }
                if (x.name === 'LongArm') {
                    LongArm = x;
                    let animOpenGM = THREE.AnimationClip.findByName(gltf.animations, 'LongArmAction');
                    move_LongArm = misturador.clipAction(animOpenGM);
                }
                if (x.name === 'AbajurJoint') {
                    AbajurJoint = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'AbajurJointAction');
                    move_AbajurJoint = misturador.clipAction(animOpenPM);
                }
                if (x.name === 'ShortArm') {
                    ShortArm = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'ShortArmAction');
                    move_ShortArm = misturador.clipAction(animOpenPM);
                }
                if (x.name === 'ArmToAbajurJoint') {
                    ArmToAbajurJoint = x;
                    let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'ArmToAbajurJointAction');
                    move_ArmToAbajurJoint = misturador.clipAction(animOpenPM);
                }
            })
        })
    }
// Criar o Raycaster
// Initialize Raycaster and Mouse Vector
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject = null;  

// Function to Update Mouse Position
function renderRaycaster(evento) {
    let limites = evento.target.getBoundingClientRect();
    const height = limites.bottom - limites.top;
    const width = limites.right - limites.left;

    // Calculate normalized device coordinates (NDC) for mouse
    mouse.x = ((evento.clientX - limites.left) / width) * 2 - 1;
    mouse.y = -((evento.clientY - limites.top) / height) * 2 + 1;

    // Update raycaster with mouse position
    raycaster.setFromCamera(mouse, camara);
}

// Add Mouse Move Event Listener
window.addEventListener('mousemove', renderRaycaster, false);

// Add Click Event Listener
window.addEventListener('click', () => {
    // Perform Raycaster Intersections
    const intersects = raycaster.intersectObjects(cena.children, true);

    if (intersects.length === 0) {
        return;
    }

    // Iterate over intersections
    for (let i = 0; i < intersects.length; i++) {
        const intersectedParentName = intersects[i].object.parent ? intersects[i].object.parent.name : null;

        // Call corresponding function based on the parent object's name
        switch (intersectedParentName) {
            case "SupportJoint":
                MoveCircleJoint();
                break;
            case "LongArm":
                MoveLongArm();
                break;
            case "AbajurJoint":
                move_AbajurJoint();
                break;
            case "ShortArm":
                MoveShortArm();
                break;
            case "ArmToAbajurJoint":
                MoveArmToAbajurJoint();
                break;
            default:
        }
    }
});

//Configuração inicial
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let activeAxis = null; // Armazena o eixo ativo (x ou y)
const cameraTarget2 = new THREE.Vector3(0, 0, 0); // Define o ponto inicial de destino

// Listener de eventos para começar a arrastar
window.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
    activeAxis = null; // Reseta o eixo ativo ao iniciar um novo arraste
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    activeAxis = null; // Reseta o eixo ativo ao terminar o arraste
});

// Listener para mover a câmera
window.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaX = event.clientX - previousMousePosition.x;
    const deltaY = event.clientY - previousMousePosition.y;

    // Define o eixo ativo se ainda não foi definido
    if (activeAxis === null) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            activeAxis = "horizontal"; // Movimento no eixo horizontal
        } else {
            activeAxis = "vertical"; // Movimento no eixo vertical
        }
    }

    // Ajusta o ponto de destino da câmera sutilmente
    const moveSpeed = 0.01; // Velocidade de movimento (valor pequeno para ser sutil)
    if (activeAxis === "horizontal") {
        cameraTarget2.x += deltaX * moveSpeed; // Ajusta no eixo X
        cameraTarget2.z += deltaX * moveSpeed; // Opcional: movimentação sutil no eixo Z
    } else if (activeAxis === "vertical") {
        cameraTarget2.y += deltaY * moveSpeed; // Ajusta no eixo Y
    }

    // Faz a câmera olhar para o novo ponto de destino
    camara.lookAt(cameraTarget2);

    // Atualiza a posição do mouse para o próximo movimento
    previousMousePosition = { x: event.clientX, y: event.clientY };
});

function MoveCircleJoint() {
    if (move_CircleJoint.paused == true) {
        move_CircleJoint.paused = false;
        move_CircleJoint.enabled = true;
        move_CircleJoint.timeScale *= -1;
    }
    move_CircleJoint.setLoop(THREE.LoopOnce);
    move_CircleJoint.play();
    move_CircleJoint.clampWhenFinished = true;
}

function MoveLongArm() {
    if (move_LongArm.paused == true) {
        move_LongArm.paused = false;
        move_LongArm.enabled = true;
        move_LongArm.timeScale *= -1;
    }
    move_LongArm.setLoop(THREE.LoopOnce);
    move_LongArm.play();
    move_LongArm.clampWhenFinished = true;
}

function MoveAbajurJoint() {
    if (move_AbajurJoint.paused == true) {
        move_AbajurJoint.paused = false;
        move_AbajurJoint.enabled = true;
        move_AbajurJoint.timeScale *= -1;
    }
    move_AbajurJoint.setLoop(THREE.LoopOnce);
    move_AbajurJoint.play();
    move_AbajurJoint.clampWhenFinished = true;
}

function MoveShortArm() {
    if (move_ShortArm.paused == true) {
        move_ShortArm.paused = false;
        move_ShortArm.enabled = true;
        move_ShortArm.timeScale *= -1;
    }
    move_ShortArm.setLoop(THREE.LoopOnce);
    move_ShortArm.play();
    move_ShortArm.clampWhenFinished = true;
}
    
function MoveArmToAbajurJoint() {
    if (move_ArmToAbajurJoint.paused == true) {
        move_ArmToAbajurJoint.paused = false;
        move_ArmToAbajurJoint.enabled = true;
        move_ArmToAbajurJoint.timeScale *= -1;
    }
    move_ArmToAbajurJoint.setLoop(THREE.LoopOnce);
    move_ArmToAbajurJoint.play();
    move_ArmToAbajurJoint.clampWhenFinished = true;
}


function changeColor() {
    // Get the selected color from the dropdown
    const colorSelector = document.getElementById('colorSelector');
    const selectedColor = colorSelector.value;

    // Get the Abajur object by name
    let abajur = model.getObjectByName('Abajur'); // 'Abajur' should be the actual object name

    // Ensure Abajur exists
    if (!abajur) {
        console.error('Abajur object not found in the model.');
        return;
    }

    // Define materials for each color
    var amethist = '#9b59b6';
    var emerald = '#2ecc71'
    var blue = '#3498db'
    var carrot = '#e67e22'
    var sunflower = '#f1c40f'
    var black = '#34495e'
    const materials = {
        normal: new THREE.MeshStandardMaterial({ color: amethist }), // Replace with your desired color/material
        amethist: new THREE.MeshStandardMaterial({ color: emerald }),
        emerald: new THREE.MeshStandardMaterial({ color: blue }),
        blue: new THREE.MeshStandardMaterial({ color: carrot }),
        carrot: new THREE.MeshStandardMaterial({ color: sunflower }),
        sunflower: new THREE.MeshStandardMaterial({ color: black }),
    };

    // Assign the material based on the selected color
    if (materials[selectedColor]) {
        console.log('entrei')
        abajur.material = materials[selectedColor];
    } else {
        console.warn('Selected color not recognized. No material change applied.');
    }

    render();
}

function lightup(){
    clickCount3 += 1;
    let spot,spot2,point,point2;

    if(model){
        spot = model.getObjectByName('Spot');
        point = model.getObjectByName('Point');
    }
    
    if(model2){
        spot2 = model2.getObjectByName('Spot');
        point2 = model2.getObjectByName('Point');
    }

    switch (clickCount3) {
        case 1:
            if(model2){
                console.log('entrei no if model2')
                spot2.intensity = 1000;
                point2.intensity = 50;
            }
            spot.intensity = 500;
            point.intensity = 0.3;
            break;
        case 2:
            if(model2){
                spot2.intensity = 0;
                point2.intensity = 0;
            }
            point.intensity = 0;
            spot.intensity = 0;
            clickCount3 = 0;
            break;
    }
}


function changeSize() {
    const sizeSelector = document.getElementById('sizeSelector');
    const selectedSize = sizeSelector.value;
    if(model){
        sizeSelector.disabled = true;
    }
    if(model2){
        sizeSelector.disabled = false;
    }
    switch (selectedSize) {
        case 'size_M':
            console.log('teste')
            model2.scale.set(1, 1, 1);
            break;
        case 'size_L':
            model2.scale.set(1.2, 1.2, 1);
            break;
        case 'size_XL':
            model2.scale.set(1.4, 1.4, 1);
            break;
        default:
            model2.scale.set(1, 1, 1);
            break;
    }
}

function move_model_y() {
    if(model2){
        document.getElementById('move_model_y').disabled = true;
    }
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_y').value));
    model.rotation.y = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

function move_model_x() {
    if(model2){
        document.getElementById('move_model_x').disabled = true;
    }
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_x').value));
    model.rotation.x = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

function move_model_z() {
    if(model2){
        document.getElementById('move_model_z').disabled = true;
    }
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_z').value));
    model.rotation.z = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

let isAnimatingCamera;
var cameraTarget = new THREE.Vector3(0, 0, 0);
var lerpValue = 0.05;

function animateCamera() {
    if (!isAnimatingCamera) return;
    requestAnimationFrame(animateCamera);
    if (camara.position.distanceTo(cameraTarget) > 0.01) {
        camara.position.lerp(cameraTarget, lerpValue);
        camara.lookAt(new THREE.Vector3(0, 0, 0));
    } else {
        isAnimatingCamera = false;
    }
}
let clickCount = 0;
function change_camera() {
    clickCount += 1;
    switch (clickCount) {
        case 1:
            cameraTarget.set(0.009, 3, 3.40);
            isAnimatingCamera = true;
            animateCamera();
            break;
        case 2:
            cameraTarget.set(3.40, 3, 0.000);
            isAnimatingCamera = true;
            animateCamera();
            clickCount = 0;
            break;
    }
}


document.getElementById('colorSelector').addEventListener('change', changeColor);
document.getElementById('sizeSelector').addEventListener('change', changeSize);
document.getElementById('move_model_y').addEventListener('input', move_model_y);
document.getElementById('move_model_x').addEventListener('input', move_model_x);
document.getElementById('move_model_z').addEventListener('input', move_model_z);
document.getElementById('btn_light').addEventListener('click',lightup);
document.getElementById('btn_change_camera').addEventListener('click', change_camera);
document.getElementById("btn_move_circle_joint").addEventListener('click', MoveCircleJoint);
document.getElementById("btn_move_long_arm").addEventListener('click', MoveLongArm);
document.getElementById("btn_move_abajur_joint").addEventListener('click', MoveAbajurJoint);
document.getElementById("btn_move_short_arm").addEventListener('click',MoveShortArm)
document.getElementById("btn_move_arm_abajur_joint").addEventListener('click',MoveArmToAbajurJoint)
document.getElementById("btn_remove_scenario").addEventListener('click', removeScenario);
let delta = 0;
let relogio = new THREE.Clock();
let latencia_minima = 1 / 60;
function animate() {
    requestAnimationFrame(animate);
    delta += relogio.getDelta();

    if (delta < latencia_minima)
        return;
    if (misturador) {
        misturador.update(delta);
    }
    delta = delta % latencia_minima;
    render()
}
animate();