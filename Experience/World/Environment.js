import * as THREE from 'three'
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resource = this.experience.resource

    this.setSunlight()
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 3)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 20
    this.sunlight.shadow.mapSize.set(2048, 2048)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(-2.5, 10, 4)

    this.scene.add(this.sunlight)

    this.ambientlight = new THREE.AmbientLight('#ffffff', 1)

    this.scene.add(this.ambientlight)
  }
  resize() { }
  update() { }
}