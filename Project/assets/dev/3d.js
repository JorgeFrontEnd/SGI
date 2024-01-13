import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js' //novo
import * as THREE from 'three';
/* cena... */
let cena = new THREE.Scene()


/*************************************Load Materiais*************************************************/
const Wicker_Blue = new THREE.TextureLoader().load('model/materials/Wicker_Blue_1K.png');
const Wicker_Normal = new THREE.TextureLoader().load('model/materials/Wicker_Normal_1K.png');
const Wood_Blue = new THREE.TextureLoader().load('model/materials/Wood_Blue_2K.png');
const Wood_Normal = new THREE.TextureLoader().load('model/materials/Wood_Normal_2K.png');
/* camara.. */
let camara = new THREE.PerspectiveCamera(50, 1920 / 1080, 0.01, 1000)
camara.position.set(0, 2, 4)
//camara.lookAt(0,0,0)

/* renderer... */
var canvas = document.getElementById("display_content");
let renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true, clearColor: 0x000000 });
renderer.setSize(420, 300);

let grelha = new THREE.GridHelper()
cena.add(grelha)

let eixos = new THREE.AxesHelper(3)
cena.add(eixos)

new OrbitControls(camara, renderer.domElement) // sem o THREE.


// Renderizar e animar
let delta = 0;			  // tempo desde a última atualização
let relogio = new THREE.Clock(); // componente que obtém o delta
let latencia_minima = 1 / 60;    // tempo mínimo entre cada atualização
let misturador = new THREE.AnimationMixer(cena)

function animar() {
    requestAnimationFrame(animar);  // agendar animar para o próximo animation frame
    delta += relogio.getDelta();    // acumula tempo que passou desde a ultima chamada de getDelta

    if (delta < latencia_minima)   // não exceder a taxa de atualização máxima definida
        return;

    renderer.render(cena, camara)

    delta = delta % latencia_minima;// atualizar delta com o excedente
}
function animarLeftDoor(){
    delta += relogio.getDelta()
    if (delta < latencia_minima) 
     return;
    misturador.update(Math.floor(delta / latencia_minima)* latencia_minima)
    renderer.render(cena, camara)
    delta = delta % latencia_minima
    misturador.update(relogio.getDelta())
}

function luzes(cena) {
    const luzAmbiente = new THREE.AmbientLight("lightgreen")
    cena.add(luzAmbiente)

    const luzPonto = new THREE.PointLight("white")
    luzPonto.position.set(0, 2, 2)
    luzPonto.intensity = 15
    cena.add(luzPonto)

    // auxiliar visual
    const lightHelper1 = new THREE.PointLightHelper(luzPonto, 0.2)
    cena.add(lightHelper1)

    const luzDirecional = new THREE.DirectionalLight("white");
    luzDirecional.position.set(3, 2, 0); //aponta na direção de (0, 0, 0)
    luzDirecional.intensity = 30
    cena.add(luzDirecional);
    // auxiliar visual
    const lightHelper2 = new THREE.DirectionalLightHelper(luzDirecional, 0.2)
    cena.add(lightHelper2)
}


/***************************************ANIMAÇÕES******************************************************/
let Wicker_Blue_Material,
    Wicker_Normal_Material,
    Wood_Blue_Material,
    Wood_Normal_Material = {};
//OBJETOS INDIVIDUAIS
let Gaveta_L, Gaveta_R, Porta_L, Porta_R;

let loader = new GLTFLoader();
let model;
let open_left_door_clip;
let open_left_door_action;

loader.load('model/vintageDesk.gltf', function (gltf) {
    model = gltf.scene;

    Gaveta_L = model.getObjectByName('Gaveta_L');
    Gaveta_R = model.getObjectByName('Gaveta_R');
    Porta_L = model.getObjectByName('Porta_L');
    Porta_R = model.getObjectByName('Porta_R');

    // in this example we create the material when the texture is loaded
    Wicker_Blue_Material = new THREE.MeshBasicMaterial({
        map: Wicker_Blue,
    })
    Wicker_Normal_Material = new THREE.MeshBasicMaterial({
        map: Wicker_Normal,
    })
    Wood_Blue_Material = new THREE.MeshBasicMaterial({
        map: Wood_Blue,
    })
    Wood_Normal_Material = new THREE.MeshBasicMaterial({
        map: Wood_Normal,
    })

    //Start with the normal wood color
    model.traverse((child) => {
        if (child.isMesh) {
            child.material = Wood_Normal_Material;
        }
    });

    open_left_door_clip = THREE.AnimationClip.findByName(gltf.animations,'GavetaDirAbrir')
    open_left_door_action = misturador.clipAction(open_left_door_clip)
    open_left_door_action.play()

    cena.add(model);
});

function changeColor() {
    const colorSelector = document.getElementById('colorSelector');
    const selectedColor = colorSelector.value;

    switch (selectedColor) {
        case 'blue':
            if (Porta_L && Porta_L.isGroup || Porta_R && Porta_R.isGroup) {
                Porta_L.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wicker_Blue_Material;
                    }
                });
                Porta_R.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wicker_Blue_Material;
                    }
                });
            }
            if (Gaveta_R && Gaveta_R.isGroup || Gaveta_L && Gaveta_L.isGroup) {
                Gaveta_R.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wood_Blue_Material;
                    }
                });
                Gaveta_L.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wood_Blue_Material;
                    }
                });
            }
            break;
        case 'normal':
            if (Porta_L && Porta_L.isGroup || Porta_R && Porta_R.isGroup) {
                Porta_L.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wicker_Normal_Material;
                    }
                });
                Porta_R.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wicker_Normal_Material;
                    }
                });
            }
            if (Gaveta_L && Gaveta_L.isGroup || Gaveta_R && Porta_R.isGroup) {
                Gaveta_L.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wood_Normal_Material;
                    }
                });
                Gaveta_R.children.forEach((child) => {
                    if (child.isMesh) {
                        child.material = Wood_Normal_Material;
                    }
                });
            }
            break;
        default:
            break;
    }

    // Render the scene
    renderer.render(cena, camara);
}

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

document.getElementById('sizeSelector').addEventListener('change', changeSize)
document.getElementById('colorSelector').addEventListener('change', changeColor);
document.getElementById('btn_open_left').addEventListener('click', animarLeftDoor)

luzes(cena)
animar()