/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nTHREE = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n__webpack_require__(/*! ./loaders/OBJLoader.js */ \"./src/loaders/OBJLoader.js\");\n__webpack_require__(/*! ./controls/OrbitControls */ \"./src/controls/OrbitControls.js\");\n\n\nvar camera, scene, renderer, controls;\nvar geometry, material, ring;\nvar gemBackMaterial;\n\nvar ringColors = [\n    {text: \"Gold\", value: \"0xb19e0a\"},\n    {text: \"Dark Gold\", value: \"0x916e0a\"},\n    {text: \"Red Gold\", value: \"0x914e0a\"},\n    {text: \"Silver\", value: \"0x607d8b\"}\n];\n\nvar gemColors = [\n    {text: \"Light blue\", value: \"0xffffff\"},\n    {text: \"Blue\", value: \"0x0088ff\"},\n    {text: \"Red\", value: \"0xff0000\"},\n    {text: \"Orange\", value: \"0xff9900\"},\n    {text: \"Green\", value: \"0x00ff00\"},\n    {text: \"Purple\", value: \"0x9c27b0\"},\n    {text: \"Yellow\", value: \"0xffeb3b\"}\n];\n\nvar modelList = [\n    {text: \"Ring 1\", value: \"../models/ring3/OBJ.obj\"},\n    {text: \"Ring 2\", value: \"../models/ring1/OBJ.obj\"},\n    {text: \"Ring 3\", value: \"../models/ring2/OBJ.obj\"},\n    {text: \"Ring 4\", value: \"../models/ring4/OBJ.obj\"},\n    {text: \"Necklace\", value: \"../models/pendalt/OBJ.obj\"},\n    {text: \"Set\", value: \"../models/MINISET/OBJ.obj\"},\n    {text: \"Earing\", value: \"../models/earing/OBJ.obj\"},\n    {text: \"Single ring\", value: \"../models/ring5/ring5.obj\"}\n];\n\ninit();\nanimate();\n\nfunction init() {\n\n    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 );\n    camera.position.z = 1;\n    camera.position.y = 0.5;\n    camera.lookAt(0, 0, 0);\n    // Creating the scene\n    scene = new THREE.Scene();\n    // background top\n    scene.background = new THREE.Color( 0xdddddd );\n    // Lights\n    var ambient = new THREE.AmbientLight( 0xdddddd );\n    scene.add( ambient );\n\n    // White directional light at half intensity shining from the top\n    var dirLight = new THREE.DirectionalLight( 0xffffff );\n    dirLight.name = 'Ring Light';\n    dirLight.castShadow = true;\n    dirLight.shadow.camera.near = 1;\n    dirLight.shadow.camera.far = 8;\n    dirLight.shadow.camera.right = 2;\n    dirLight.shadow.camera.left = - 2;\n    dirLight.shadow.camera.top\t= 2;\n    dirLight.shadow.camera.bottom = - 2;\n    dirLight.shadow.mapSize.width = 2048;\n    dirLight.shadow.mapSize.height = 2048;\n    dirLight.position.set( 2, 2, 1 );\n    dirLight.lookAt(0, 0, 0);\n    scene.add( dirLight );\n\n    var geometryg = new THREE.BoxGeometry( 100, 0.15, 100 );\n    var materialg = new THREE.MeshPhongMaterial( {\n        color: 0xa0adaf,\n        shininess: 150,\n        specular: 0x111111\n    } );\n\n    var ground = new THREE.Mesh( geometryg, materialg );\n    ground.position.y = -0.94;\n    ground.scale.multiplyScalar( 3 );\n    ground.castShadow = false;\n    ground.receiveShadow = true;\n    scene.add( ground );\n\n\n    var path = \"../assets/textures/cube/\";\n    var format = '.jpg';\n    var urls = [\n        path + 'px' + format, path + 'nx' + format,\n        path + 'py' + format, path + 'ny' + format,\n        path + 'pz' + format, path + 'nz' + format\n    ];\n    // Textures\n    var reflectionCube = new THREE.CubeTextureLoader().load( urls );\n    reflectionCube.format = THREE.RGBFormat;\n\n    geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );\n    material = new THREE.MeshStandardMaterial( {\n        color: new THREE.Color( 0xb19e0a ),\n        emissive: new THREE.Color( 0x9e9e9e ),\n        emissiveIntensity: 0.6,\n        envMap: reflectionCube,\n        envMapIntensity: 2,\n        metalness: 0.8,\n        roughness: 0.2,\n    } );\n\n    gemBackMaterial = new THREE.MeshPhysicalMaterial( {\n        map: null,\n        color: null,\n        metalness: 1.0,\n        roughness: 0,\n        opacity: 0.5,\n        side: THREE.FrontSide,\n        transparent: true,\n        envMapIntensity: 6,\n        premultipliedAlpha: true,\n        envMap: reflectionCube,\n    } );\n\n    renderer = new THREE.WebGLRenderer( { antialias: true } );\n    renderer.setSize( window.innerWidth, window.innerHeight );\n\n    renderer.shadowMap.enabled = true;\n    renderer.shadowMap.type = THREE.PCFSoftShadowMap;\n\n    controls = new THREE.OrbitControls( camera, renderer.domElement );\n    controls.enablePan = true;\n\n    loadModel(modelList[0].value);\n\n    document.body.appendChild( renderer.domElement );\n    initColorChanging(ringColors, material, \"Metal\");\n    initColorChanging(gemColors, gemBackMaterial, \"Gem\");\n    initModelChanging(modelList);\n\n    window.addEventListener( 'resize', onWindowResize, false );\n}\n\nfunction onWindowResize() {\n    camera.aspect = window.innerWidth / window.innerHeight;\n    camera.updateProjectionMatrix();\n    renderer.setSize( window.innerWidth, window.innerHeight );\n}\n\nfunction loadModel(path) {\n    var loader = new THREE.OBJLoader();\n\n    if (ring) {\n        scene.remove(ring);\n    }\n\n    loader.load(\n        path,\n        function ( object ) {\n            scene.add( object );\n            object.scale.set(0.025, 0.025, 0.025);\n            object.traverse( function ( child ) {\n\n                if ( child instanceof THREE.Mesh ) {\n\n                    if (isGem(child)) {\n                        child.material = gemBackMaterial;\n                    } else {\n                        child.material = material;\n                    }\n\n\n                    child.castShadow = true;\n                    child.receiveShadow = true;\n                }\n\n            } );\n\n            object.rotation.x = -Math.PI / 2.0;\n            object.position.y = -0.7;\n\n            controls.target = object.position;\n            camera.lookAt(object.position);\n\n            ring = object;\n        },\n        function ( xhr ) {},\n        function ( error ) {}\n    );\n}\n\nfunction isGem(object) {\n    return object.name.search( /gem/i ) !== -1;\n}\n\nfunction initModelChanging(models) {\n    var select = document.createElement(\"select\");\n    var label = document.createElement(\"label\");\n    models.forEach(model => {\n        var opt = document.createElement(\"option\");\n        opt.value = model.value;\n        opt.innerHTML = model.text;\n        select.appendChild(opt);\n    });\n\n    label.innerText = \"Model\";\n    document.body.appendChild(label);\n    document.body.appendChild(select);\n\n    select.onchange = () => {\n        console.log(select.value)\n        loadModel(select.value);\n    }\n}\n\nfunction initColorChanging(colors, material, labelContent) {\n    var select = document.createElement(\"select\");\n    var label = document.createElement(\"label\");\n    colors.forEach(color => {\n        var opt = document.createElement(\"option\");\n        opt.value = color.value;\n        opt.innerHTML = color.text;\n        select.appendChild(opt);\n    });\n\n    label.innerText = labelContent;\n    document.body.appendChild(label);\n    document.body.appendChild(select);\n\n    select.onchange = ()=>{\n        if (material) {\n            console.log('material',  material);\n            material.color = new THREE.Color( parseInt(select.value) );\n        }\n    }\n}\n\n// Rendering the scene\nfunction animate() {\n    requestAnimationFrame( animate );\n    if (ring) {\n       // Animating the cube\n       // ring.rotation.z += 0.01;\n    }\n    renderer.clear();\n    renderer.render( scene, camera );\n}\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/index.js */\"./src/index.js\");\n\n\n//# sourceURL=webpack:///multi_./src/index.js?");

/***/ })

/******/ });