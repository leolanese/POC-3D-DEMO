
THREE = __webpack_require__(/*! three */ "./node_modules/three/build/three.module.js");
__webpack_require__(/*! ./loaders/OBJLoader.js */ "./src/loaders/OBJLoader.js");
__webpack_require__(/*! ./controls/OrbitControls */ "./src/controls/OrbitControls.js");


var camera, scene, renderer, controls;
var geometry, material, ring;
var gemBackMaterial;

var ringColors = [
    {text: "Gold", value: "0xb19e0a"},
    {text: "Dark Gold", value: "0x916e0a"},
    {text: "Red Gold", value: "0x914e0a"},
    {text: "Silver", value: "0x607d8b"}
];

var gemColors = [
    {text: "Light blue", value: "0xffffff"},
    {text: "Blue", value: "0x0088ff"},
    {text: "Red", value: "0xff0000"},
    {text: "Orange", value: "0xff9900"},
    {text: "Green", value: "0x00ff00"},
    {text: "Purple", value: "0x9c27b0"},
    {text: "Yellow", value: "0xffeb3b"}
];

var modelList = [
    {text: "Ring 1", value: "../models/ring3/OBJ.obj"},
    {text: "Ring 2", value: "../models/ring1/OBJ.obj"},
    {text: "Ring 3", value: "../models/ring2/OBJ.obj"},
    {text: "Ring 4", value: "../models/ring4/OBJ.obj"},
    {text: "Necklace", value: "../models/pendalt/OBJ.obj"},
    {text: "Set", value: "../models/MINISET/OBJ.obj"},
    {text: "Earing", value: "../models/earing/OBJ.obj"},
    {text: "Single ring", value: "../models/ring5/ring5.obj"}
];

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );
    camera.position.z = 1;
    camera.position.y = 0.5;
    camera.lookAt(0, 0, 0);
    // Creating the scene
    scene = new THREE.Scene();
    // background top
    scene.background = new THREE.Color( 0xdddddd );
    // Lights
    var ambient = new THREE.AmbientLight( 0xdddddd );
    scene.add( ambient );

    // White directional light at half intensity shining from the top
    var dirLight = new THREE.DirectionalLight( 0xffffff );
    dirLight.name = 'Ring Light';
    dirLight.castShadow = true;
    dirLight.shadow.camera.near = 1;
    dirLight.shadow.camera.far = 8;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.left = - 2;
    dirLight.shadow.camera.top	= 2;
    dirLight.shadow.camera.bottom = - 2;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.position.set( 2, 2, 1 );
    dirLight.lookAt(0, 0, 0);
    scene.add( dirLight );

    var geometryg = new THREE.BoxGeometry( 100, 0.15, 100 );
    var materialg = new THREE.MeshPhongMaterial( {
        color: 0xa0adaf,
        shininess: 150,
        specular: 0x111111
    } );

    var ground = new THREE.Mesh( geometryg, materialg );
    ground.position.y = -0.94;
    ground.scale.multiplyScalar( 3 );
    ground.castShadow = false;
    ground.receiveShadow = true;
    scene.add( ground );


    var path = "../assets/textures/cube/";
    var format = '.jpg';
    var urls = [
        path + 'px' + format, path + 'nx' + format,
        path + 'py' + format, path + 'ny' + format,
        path + 'pz' + format, path + 'nz' + format
    ];
    // Textures
    var reflectionCube = new THREE.CubeTextureLoader().load( urls );
    reflectionCube.format = THREE.RGBFormat;

    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    material = new THREE.MeshStandardMaterial( {
        color: new THREE.Color( 0xb19e0a ),
        emissive: new THREE.Color( 0x9e9e9e ),
        emissiveIntensity: 0.6,
        envMap: reflectionCube,
        envMapIntensity: 2,
        metalness: 0.8,
        roughness: 0.2,
    } );

    gemBackMaterial = new THREE.MeshPhysicalMaterial( {
        map: null,
        color: null,
        metalness: 1.0,
        roughness: 0,
        opacity: 0.5,
        side: THREE.FrontSide,
        transparent: true,
        envMapIntensity: 6,
        premultipliedAlpha: true,
        envMap: reflectionCube,
    } );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enablePan = true;

    loadModel(modelList[0].value);

    document.body.appendChild( renderer.domElement );
    initColorChanging(ringColors, material, "Metal");
    initColorChanging(gemColors, gemBackMaterial, "Gem");
    initModelChanging(modelList);

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function loadModel(path) {
    var loader = new THREE.OBJLoader();

    if (ring) {
        scene.remove(ring);
    }

    loader.load(
        path,
        function ( object ) {
            scene.add( object );
            object.scale.set(0.025, 0.025, 0.025);
            object.traverse( function ( child ) {

                if ( child instanceof THREE.Mesh ) {

                    if (isGem(child)) {
                        child.material = gemBackMaterial;
                    } else {
                        child.material = material;
                    }


                    child.castShadow = true;
                    child.receiveShadow = true;
                }

            } );

            object.rotation.x = -Math.PI / 2.0;
            object.position.y = -0.7;

            controls.target = object.position;
            camera.lookAt(object.position);

            ring = object;
        },
        function ( xhr ) {},
        function ( error ) {}
    );
}

function isGem(object) {
    return object.name.search( /gem/i ) !== -1;
}

function initModelChanging(models) {
    var select = document.createElement("select");
    var label = document.createElement("label");
    models.forEach(model => {
        var opt = document.createElement("option");
        opt.value = model.value;
        opt.innerHTML = model.text;
        select.appendChild(opt);
    });

    label.innerText = "Model";
    document.body.appendChild(label);
    document.body.appendChild(select);

    select.onchange = () => {
        console.log(select.value)
        loadModel(select.value);
    }
}

function initColorChanging(colors, material, labelContent) {
    var select = document.createElement("select");
    var label = document.createElement("label");
    colors.forEach(color => {
        var opt = document.createElement("option");
        opt.value = color.value;
        opt.innerHTML = color.text;
        select.appendChild(opt);
    });

    label.innerText = labelContent;
    document.body.appendChild(label);
    document.body.appendChild(select);

    select.onchange = ()=>{
        if (material) {
            console.log('material',  material);
            // setting up color instead material?
            // remove select to empty
            material.color = new THREE.Color( parseInt(select.value) );

        }
    }
}

// Rendering the scene
function animate() {
    requestAnimationFrame( animate );
    if (ring) {
       // Animating the cube
       // ring.rotation.z += 0.01;
    }
    renderer.clear();
    renderer.render( scene, camera );
}

