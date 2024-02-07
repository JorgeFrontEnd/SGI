import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

/* cena... */
let cena = new THREE.Scene();
cena.background = new THREE.Color('whitesmoke');

// criar uma camara...
let camara = new THREE.PerspectiveCamera(50, 1920 / 1080, 0.01, 4000)
camara.position.set(0, 1, 3);
camara.lookAt(0, 0, 0);

/* renderer... */
var canvas = document.getElementById("display_content");
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
renderer.setSize(520, 460);
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.7;
renderer.shadowMap.enabled = true;
const controls = new OrbitControls(camara, renderer.domElement); // Use OrbitControls from examples

//set lights
let luzAmbiente = new THREE.AmbientLight(0xffffff, 0.2);
cena.add(luzAmbiente);
var pointLight = new THREE.DirectionalLight(0xffffff, 5);
pointLight.castShadow = true;
pointLight.position.set(0, 10, 10);
var lightHolder = new THREE.Group();
lightHolder.add(pointLight);
cena.add(lightHolder);

var misturador = new THREE.AnimationMixer(cena)

/*********************************************LOAD TEXTURES********************************************/
var wood_normal_texture = new THREE.TextureLoader().load('assets/materials/Wood_Normal_2K.png');
wood_normal_texture.wrapS = THREE.RepeatWrapping;
wood_normal_texture.wrapT = THREE.RepeatWrapping;
wood_normal_texture.magFilter = THREE.NearestFilter;
wood_normal_texture.rotation = 1.571;
wood_normal_texture.repeat.set(4, 4);
let wood_normal_material = new THREE.MeshBasicMaterial({
    map: wood_normal_texture,
    side: THREE.DoubleSide,
});

var wood_black_texture = new THREE.TextureLoader().load('assets/materials/Wood_Black_2K.png');
wood_black_texture.wrapS = THREE.RepeatWrapping;
wood_black_texture.wrapT = THREE.RepeatWrapping;
wood_black_texture.magFilter = THREE.NearestFilter;
wood_black_texture.rotation = 1.571;
wood_black_texture.repeat.set(4, 4);
let wood_black_material = new THREE.MeshBasicMaterial({
    map: wood_black_texture,
    side: THREE.DoubleSide,
});

var wood_gray_texture = new THREE.TextureLoader().load('assets/materials/Wood_Gray_2K.png');
wood_gray_texture.wrapS = THREE.RepeatWrapping;
wood_gray_texture.wrapT = THREE.RepeatWrapping;
wood_gray_texture.magFilter = THREE.NearestFilter;
wood_gray_texture.rotation = 1.571;
wood_gray_texture.repeat.set(4, 4);
let wood_gray_material = new THREE.MeshBasicMaterial({
    map: wood_gray_texture,
    side: THREE.DoubleSide,
});

var wood_blue_texture = new THREE.TextureLoader().load('assets/materials/Wood_Blue_2K.png');
wood_blue_texture.wrapS = THREE.RepeatWrapping;
wood_blue_texture.wrapT = THREE.RepeatWrapping;
wood_blue_texture.magFilter = THREE.NearestFilter;
wood_blue_texture.rotation = 1.571;
wood_blue_texture.repeat.set(4, 4);
let wood_blue_material = new THREE.MeshBasicMaterial({
    map: wood_blue_texture,
    side: THREE.DoubleSide,
});

var wood_red_texture = new THREE.TextureLoader().load('assets/materials/Wood_Red_2K.png');
wood_red_texture.wrapS = THREE.RepeatWrapping;
wood_red_texture.wrapT = THREE.RepeatWrapping;
wood_red_texture.magFilter = THREE.NearestFilter;
wood_red_texture.rotation = 1.571;
wood_red_texture.repeat.set(4, 4);
let wood_red_material = new THREE.MeshBasicMaterial({
    map: wood_red_texture,
    side: THREE.DoubleSide,
});

var wood_green_texture = new THREE.TextureLoader().load('assets/materials/Wood_Green_2K.png');
wood_green_texture.wrapS = THREE.RepeatWrapping;
wood_green_texture.wrapT = THREE.RepeatWrapping;
wood_green_texture.magFilter = THREE.NearestFilter;
wood_green_texture.rotation = 1.571;
wood_green_texture.repeat.set(4, 4);
let wood_green_material = new THREE.MeshBasicMaterial({
    map: wood_green_texture,
    side: THREE.DoubleSide,
});
/******************************************END LOAD TEXTURES********************************************/

function render() {
    renderer.render(cena, camara);
}

/***************************************ANIMAÇÕES******************************************************/

let loader = new GLTFLoader();
let model;
let gaveta_baixo,
    gaveta_meio,
    gaveta_cima,
    porta_direita,
    porta_meio,
    porta_esquerda;
let open_gaveta_baixo,
    open_gaveta_meio,
    open_gaveta_cima,
    open_porta_direita,
    open_porta_meio,
    open_porta_esquerda;

loader.load('model/aparador.gltf',
    function (gltf) {
        model = gltf.scene
        cena.add(model)
        misturador = new THREE.AnimationMixer(model);

        model.traverse(function (x) {
            if (x.name === 'gaveta_baixo') {
                gaveta_baixo = x;
                let animOpenGB = THREE.AnimationClip.findByName(gltf.animations, 'gaveta_baixoAction');
                open_gaveta_baixo = misturador.clipAction(animOpenGB);
            }
            if (x.name === 'gaveta_meio') {
                gaveta_meio = x;
                let animOpenGM = THREE.AnimationClip.findByName(gltf.animations, 'gaveta_meioAction');
                open_gaveta_meio = misturador.clipAction(animOpenGM);
            }
            if (x.name === 'gaveta_cima') {
                gaveta_cima = x;
                let animOpenGC = THREE.AnimationClip.findByName(gltf.animations, 'gaveta_cimaAction');
                open_gaveta_cima = misturador.clipAction(animOpenGC);
            }
            if (x.name === 'porta_direita') {
                porta_direita = x;
                let animOpenPD = THREE.AnimationClip.findByName(gltf.animations, 'porta_direitaAction');
                open_porta_direita = misturador.clipAction(animOpenPD);
            }
            if (x.name === 'porta_meio') {
                porta_meio = x;
                let animOpenPM = THREE.AnimationClip.findByName(gltf.animations, 'porta_meioAction');
                open_porta_meio = misturador.clipAction(animOpenPM);
            }
            if (x.name === 'porta_esquerda') {
                porta_esquerda = x;
                let animOpenPE = THREE.AnimationClip.findByName(gltf.animations, 'porta_esquerdaAction');
                open_porta_esquerda = misturador.clipAction(animOpenPE);
            }
        })
        setInitialColor()
    }
)


// Criar o Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function renderRaycaster(evento) {
    let limites = evento.target.getBoundingClientRect();
    const height = limites.bottom - limites.top;
    const width = limites.right - limites.left;

    mouse.x = ((evento.clientX - limites.left) / width) * 2 - 1;
    mouse.y = -((evento.clientY - limites.top) / height) * 2 + 1;

}


// Atualizar a posição do rato
window.addEventListener('mousemove', renderRaycaster, false);

window.addEventListener('click', () => {
    raycaster.setFromCamera(mouse, camara);
    const intersects = raycaster.intersectObjects(cena.children, true);

    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object.parent.name == "gaveta_baixo") {
            playGavetaBaixo();
        }
        if (intersects[i].object.parent.name == "gaveta_meio") {
            playGavetaMeio()
        }

        if (intersects[i].object.parent.name == "gaveta_cima") {
            playGavetaCima()
        }

        if (intersects[i].object.parent.name == "porta_direita") {
            playPortaDireita()
        }
        if (intersects[i].object.parent.name == "porta_meio") {
            playPortaMeio()
        }
        if (intersects[i].object.parent.name == "porta_esquerda") {
            playPortaEsquerda()
        }
    }
});

function playGavetaBaixo() {
    if (open_gaveta_baixo.paused == true) {
        open_gaveta_baixo.paused = false;
        open_gaveta_baixo.enabled = true;
        open_gaveta_baixo.timeScale *= -1;
    }
    open_gaveta_baixo.setLoop(THREE.LoopOnce);
    open_gaveta_baixo.play();
    open_gaveta_baixo.clampWhenFinished = true;
}

function playGavetaMeio() {
    if (open_gaveta_meio.paused == true) {
        open_gaveta_meio.paused = false;
        open_gaveta_meio.enabled = true;
        open_gaveta_meio.timeScale *= -1;
    }
    open_gaveta_meio.setLoop(THREE.LoopOnce);
    open_gaveta_meio.play();
    open_gaveta_meio.clampWhenFinished = true;
}

function playGavetaCima() {
    if (open_gaveta_cima.paused == true) {
        open_gaveta_cima.paused = false;
        open_gaveta_cima.enabled = true;
        open_gaveta_cima.timeScale *= -1;
    }
    open_gaveta_cima.setLoop(THREE.LoopOnce);
    open_gaveta_cima.play();
    open_gaveta_cima.clampWhenFinished = true;
}
//abrir gavetas

function playGavetas() {
    playGavetaBaixo()
    playGavetaMeio()
    playGavetaCima()
}

function playPortaDireita() {
    if (open_porta_direita.paused == true) {
        open_porta_direita.paused = false;
        open_porta_direita.enabled = true;
        open_porta_direita.timeScale *= -1;
    }
    open_porta_direita.setLoop(THREE.LoopOnce);
    open_porta_direita.play();
    open_porta_direita.clampWhenFinished = true;
}

function playPortaMeio() {

    if (open_porta_meio.paused == true) {
        open_porta_meio.paused = false;
        open_porta_meio.enabled = true;
        open_porta_meio.timeScale *= -1;
    }
    open_porta_meio.setLoop(THREE.LoopOnce);
    open_porta_meio.play();
    open_porta_meio.clampWhenFinished = true;
}

function playPortaEsquerda() {
    if (open_porta_esquerda.paused == true) {
        open_porta_esquerda.paused = false;
        open_porta_esquerda.enabled = true;
        open_porta_esquerda.timeScale *= -1;
    }
    open_porta_esquerda.setLoop(THREE.LoopOnce);
    open_porta_esquerda.play();
    open_porta_esquerda.clampWhenFinished = true;
}

function playPortas() {
    playPortaDireita()
    playPortaMeio()
    playPortaEsquerda()
}


let nodesToChange =
    ['Aparador', 'gaveta_baixo_material', 'gaveta_meio_material',
        'gaveta_cima_material', 'porta_esquerda_material', 'porta_meio_material',
        'porta_direita_material'];

function setInitialColor() {
    nodesToChange.forEach(nodeName => {
        const object = model.getObjectByName(nodeName, true);
        if (object) {
            object.traverse(child => {
                if (child.isMesh) {
                    // Set the initial material here
                    child.material = wood_normal_material;
                }
            });
        }
    });
    render(); // Assuming you have a render function
}

let select_secretary_img = document.getElementById('select_secretary_img')
function changeColor() {
    const colorSelector = document.getElementById('colorSelector');
    const selectedColor = colorSelector.value;
    switch (selectedColor) {
        case 'normal':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_normal_material;
                            select_secretary_img.src = "./assets/product-page/desk.png";
                        }
                    });
                }
            });
            break;
        case 'black':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_black_material;
                            select_secretary_img.src = "./assets/product-page/desk_black.png";
                        }
                    });
                }
            });
            break;
        case 'gray':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_gray_material;
                            select_secretary_img.src = "./assets/product-page/desk_gray.png";
                        }
                    });
                }
            });
            break;
        case 'blue':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_blue_material;
                            select_secretary_img.src = "./assets/product-page/desk_blue.png";
                        }
                    });
                }
            });
            break;
        case 'red':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_red_material;
                            select_secretary_img.src = "./assets/product-page/desk_red.png";
                        }
                    });
                }
            });
            break;
        case 'green':
            nodesToChange.forEach(nodeName => {
                const object = model.getObjectByName(nodeName, true); // Recursive search
                if (object) {
                    object.traverse(child => {
                        if (child.isMesh) {
                            child.material = wood_green_material;
                            select_secretary_img.src = "./assets/product-page/desk_green.png";
                        }
                    });
                }
            });
            break;
        default:
            break;
    }
    render()
}



function changeSize() {
    const sizeSelector = document.getElementById('sizeSelector');
    const selectedSize = sizeSelector.value;

    switch (selectedSize) {
        case 'size_M':
            model.scale.set(1.1, 1, 1);
            break;
        case 'size_L':
            model.scale.set(1.2, 1, 1);
            break;
        case 'size_XL':
            model.scale.set(1.3, 1, 1);
            break;
        default:
            model.scale.set(1, 1, 1);
            break;
    }
}

function move_model_y() {
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_y').value));
    model.rotation.y = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

function move_model_x() {
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_x').value));
    model.rotation.x = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

function move_model_z() {
    const rotationValue = THREE.MathUtils.degToRad(parseFloat(document.getElementById('move_model_z').value));
    model.rotation.z = rotationValue;
    camara.lookAt(0, 0, 0);
    render();
}

let isAnimatingCamera;
var cameraTarget = new THREE.Vector3(0, 0, 0);
var lerpValue = 0.05;
let clickCount = 0;

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
function change_camera() {
    clickCount += 1;
    switch (clickCount) {
        case 1:
            cameraTarget.set(3.40, 0.672, 0.000);
            isAnimatingCamera = true;
            animateCamera();
            break;
        case 2:
            cameraTarget.set(0.070, 0.672, -3.40);
            isAnimatingCamera = true;
            animateCamera();
            break;
        case 3:
            cameraTarget.set(-3.40, 0.672, 0.000);
            isAnimatingCamera = true;
            animateCamera();
            break;
        case 4:
            cameraTarget.set(0.009, 0.672, 3.40);
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
document.getElementById('btn_change_camera').addEventListener('click', change_camera);
document.getElementById("btn_open_drawers").addEventListener('click', playGavetas);
document.getElementById("btn_open_doors").addEventListener('click', playPortas);

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