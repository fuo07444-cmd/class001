let scene, camera, renderer;
let cube, cylinder, cone;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    65,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // ★ 影を有効化
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  document.body.appendChild(renderer.domElement);

  // --- ライト（影を落とす光） ---
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(5, 10, 5);
  light.castShadow = true;
  scene.add(light);

  // --- キューブ ---
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
  const cubeTexture = new THREE.TextureLoader().load("textures/renga.png");
  const cubeMaterial = new THREE.MeshStandardMaterial({ map: cubeTexture });
  cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.position.x = -3;
  cube.castShadow = true;
  scene.add(cube);

 

  window.addEventListener("resize", onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  cylinder.rotation.x += 0.01;
  cylinder.rotation.y += 0.01;

  cone.rotation.x += 0.01;
  cone.rotation.y += 0.01;

  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
animate();
