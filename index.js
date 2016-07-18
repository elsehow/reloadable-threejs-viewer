var udKefir = require('ud-kefir');
var THREE = require('three')
var OrbitControls = require('three-orbit-controls')(THREE)

var scene, camera, renderer, controls;
var geometry, material, mesh;

var initS = udKefir(module, function () {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;

  controls = new OrbitControls( camera );
  controls.addEventListener( 'change', render );

  geometry = new THREE.BoxGeometry( 300, 300, 300 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  document.body.appendChild( renderer.domElement );
  render()
  console.log('loaded!')

})

function animate() {

  requestAnimationFrame( animate );

  controls.update();
}

function render () {
  renderer.render( scene, camera );
}

initS.onValue(init => {
  document.body.innerHTML = ''
  init()
  animate()
})
