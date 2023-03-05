import * as THREE from 'three'
import Experience from "./Experience";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class Camera {
  constructor() {
    this.experience = new Experience()
    this.size = this.experience.size
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas

    this.createPerspectiveCamera()
    this.createOrthographicCamera()
    this.setOrbitControls()
  }

  createPerspectiveCamera() {
    this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.size.aspect, 0.1, 1000)

    this.scene.add(this.perspectiveCamera)
    this.perspectiveCamera.position.x = -0.05
    this.perspectiveCamera.position.y = 9
    this.perspectiveCamera.position.z = 13.5
  }

  createOrthographicCamera() {
    this.orthographicCamera = new THREE.OrthographicCamera(
      (-this.size.aspect * this.size.frustrum) / 2,
      (this.size.aspect * this.size.frustrum) / 2,
      this.size.frustrum / 2,
      -this.size.frustrum / 2,
      -10,
      10
    )

    this.scene.add(this.orthographicCamera)

    this.helper = new THREE.CameraHelper(this.orthographicCamera)
    this.scene.add(this.helper)

    const size = 20;
    const divisions = 20;

    const gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(10);
    this.scene.add(axesHelper);
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enableZoom = false
  }

  resize() {
    this.perspectiveCamera.aspect = this.size.aspect
    this.perspectiveCamera.updateProjectionMatrix()

    this.orthographicCamera.left = (-this.size.aspect * this.size.frustrum) / 2
    this.orthographicCamera.right = (this.size.aspect * this.size.frustrum) / 2
    this.orthographicCamera.top = this.size.frustrum / 2
    this.orthographicCamera.bottom = -this.size.frustrum / 2
    this.orthographicCamera.updateProjectionMatrix()
  }

  update() {
    this.controls.update()

    this.helper.matrixWorldNeedsUpdate = true
    this.helper.update()
    this.helper.position.copy(this.orthographicCamera.position)
    this.helper.rotation.copy(this.orthographicCamera.rotation)
  }
}