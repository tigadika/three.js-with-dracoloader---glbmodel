import * as THREE from 'three'
import Experience from "../Experience";
import GSAP from 'gsap'

export default class Control {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resource = this.experience.resource
    this.time = this.experience.time
    this.camera = this.experience.camera
    this.progress = 0
    this.dummyCurve = new THREE.Vector3(0, 0, 0)

    this.lerp = {
      currentVal: 0,
      targetVal: 0,
      ease: 0.1,
    }
    this.position = new THREE.Vector3(0, 0, 0)
    this.lookAtPosition = new THREE.Vector3(0, 0, 0)
    this.directionVector = new THREE.Vector3(0, 0, 0)
    this.staticVector = new THREE.Vector3(0, 1, 0)
    this.crossVector = new THREE.Vector3(0, 0, 0)

    this.setPath()
    this.onScrollWheel()
  }

  setPath() {
    //Create a closed wavey loop
    this.curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5, 0, 0),
      new THREE.Vector3(0, 0, -5),
      new THREE.Vector3(5, 0, 0),
      new THREE.Vector3(0, 0, 5),
    ], true);

    this.points = this.curve.getPoints(50);
    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);

    this.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

    // Create the final object to add to the scene
    this.curveObject = new THREE.Line(this.geometry, this.material);
    this.scene.add(this.curveObject)
  }

  onScrollWheel() {
    window.addEventListener('wheel', (event) => {
      if (event.deltaY > 0) {
        this.lerp.targetVal += 0.01
        // if (this.lerp.targetVal > 1) {
        //   this.lerp.targetVal = 0
        // }
      } else {
        this.lerp.targetVal -= 0.01
      }
    })
  }

  resize() { }
  update() {
    this.lerp.currentVal = GSAP.utils.interpolate(
      this.lerp.currentVal,
      this.lerp.targetVal,
      this.lerp.ease
    )
    this.lerp.targetVal = GSAP.utils.clamp(0, 1, this.lerp.targetVal)
    this.lerp.currentVal = GSAP.utils.clamp(0, 1, this.lerp.currentVal)
    this.curve.getPointAt(this.lerp.currentVal % 1, this.position)
    this.camera.orthographicCamera.position.copy(this.position)

    this.directionVector.subVectors(
      this.curve.getPointAt((this.lerp.currentVal % 1) + 0.0000001),
      this.position
    )
    this.directionVector.normalize()

    this.crossVector.crossVectors(this.directionVector, this.staticVector)
    this.crossVector.multiplyScalar(1000000)
    this.camera.orthographicCamera.lookAt(this.crossVector)
  }
}