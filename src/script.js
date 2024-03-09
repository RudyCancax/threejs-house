import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

// Walls
const wallColorTexture = textureLoader.load('/textures/bricks/color.jpg')
wallColorTexture.colorSpace = THREE.SRGBColorSpace;
const wallAOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
wallAOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const wallNormalTexture = textureLoader.load('/textures/bricks/normal.jpg')
wallNormalTexture.colorSpace = THREE.SRGBColorSpace;
const wallRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg')
wallRoughnessTexture.colorSpace = THREE.SRGBColorSpace;


const wallX = 4;
const wallY = 3;
const wallZ = 4;
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(wallX, wallY, wallZ),
    new THREE.MeshStandardMaterial({
        map: wallColorTexture,
        transparent: true,
        aoMap: wallAOcclusionTexture,
        normalMap: wallNormalTexture,
        roughnessMap: wallRoughnessTexture
    })
);
walls.position.y = wallY/2;
house.add(walls)
    
// roof // techo
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.5, 1, 4),
    new THREE.MeshStandardMaterial({color: '#4f1900'})
);
roof.position.y = wallY + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof)

// door 
const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
doorAlphaTexture.colorSpace = THREE.SRGBColorSpace
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
doorAmbientOcclusionTexture.colorSpace = THREE.SRGBColorSpace
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
doorHeightTexture.colorSpace = THREE.SRGBColorSpace
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
doorNormalTexture.colorSpace = THREE.SRGBColorSpace
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
doorMetalnessTexture.colorSpace = THREE.SRGBColorSpace
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
doorRoughnessTexture.colorSpace = THREE.SRGBColorSpace

const doorY = 2.2;
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, doorY, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.1,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.position.y = doorY / 2;
door.position.z = (wallZ/2) + 0.01;
// door.rotation.y = Math.PI * 0.25;
house.add(door)

//bushes -> Arbustos
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({color: '#89c854'});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(2, 0, 2.5);
bush1.scale.set(0.5, 0.5, 0.5);
const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(2.6, 0, 3);
bush2.scale.set(0.2, 0.2, 0.2);
const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-2, 0.5, 3);
const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.2, 2.5);
bush4.scale.set(0.4, 0.4, 0.4);
house.add(bush1, bush2, bush3, bush4);

/**
 * GRAVES
 */
// Group
const graves = new THREE.Group()
scene.add(graves)

const graveGeometry = new THREE.BoxGeometry(1, 1, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color: '#b2b6b1'})

for(let i = 0; i< 30; i++){

    const angle = Math.random() * Math.PI * 2;
    const radious = Math.random() * 5 + 4.5;
    const x = Math.sin(angle) * radious;
    const z = Math.cos(angle) * radious;

    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.rotation.y = Math.random();
    grave.rotation.z = Math.random() - 0.2;
    grave.position.set(x, 0.5, z)
    graves.add(grave)
}

/**
 * LIGTHS
 */
const pointLight = new THREE.PointLight('#ffe628', 3);
pointLight.position.set(0, 2.2, 2.7);
scene.add(pointLight);


/**
 * FOG -> Neblina
 */
const fog = new THREE.Fog('#46474b', 2, 20);
scene.fog = fog;


// Floor 
const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace;
const grassAOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
grassAOcclusionTexture.colorSpace = THREE.SRGBColorSpace;
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
grassNormalTexture.colorSpace = THREE.SRGBColorSpace;
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
grassRoughnessTexture.colorSpace = THREE.SRGBColorSpace;

grassColorTexture.repeat.set(8, 8);
grassAOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grassColorTexture,
        aoMap: grassAOcclusionTexture,
        normalMap: grassNormalTexture,
        roughnessMap: grassRoughnessTexture,
    
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.1)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#ffffff', 0.3)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)


/**
 * GHOSTS 
 */
const ghost1 = new THREE.PointLight('#ff00ff', 6, 3);
scene.add(ghost1)
const ghost2 = new THREE.PointLight('#e1ba41', 6, 3);
scene.add(ghost2)
const ghost3 = new THREE.PointLight('#ff0000', 6, 3);
scene.add(ghost3)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#46474b');

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // GHOAST animations
    const ghoast1R = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghoast1R) * 5;
    ghost1.position.z = Math.sin(ghoast1R) * 5;
    ghost1.position.y = Math.sin(ghoast1R);

    const ghoast2R = -elapsedTime * 1.5;
    ghost2.position.x = Math.cos(ghoast2R) * 7;
    ghost2.position.z = Math.sin(ghoast2R) * 5;
    ghost2.position.y = Math.sin(ghoast2R * 3) * (Math.sin(ghoast2R));

    const ghoast3R = -elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghoast3R) * (7 + Math.sin(ghoast3R) * 3);
    ghost3.position.z = Math.sin(ghoast3R) * (10 + Math.sin(ghoast3R) * 7);
    ghost3.position.y = Math.sin(ghoast3R);

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()