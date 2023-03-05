import * as THREE from 'three'
import Experience from "../Experience";

export default class Kitchen {
  constructor() {
    this.experience = new Experience()
    this.scene = this.experience.scene
    this.resource = this.experience.resource
    this.time = this.experience.time
    this.kitchen = this.resource.item.kitchenRoom
    this.renderedKitchen = this.kitchen.scene

    this.setModel()
    this.setAnimation()
  }

  setModel() {
    this.renderedKitchen.children.forEach((child) => {
      child.castShadow = true
      child.receiveShadow = true
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true
          groupChild.receiveShadow = true
        })
      }
    })
    this.scene.add(this.renderedKitchen)
    this.renderedKitchen.scale.set(0.5, 0.5, 0.5)
  }

  setAnimation() {
    this.mixer = new THREE.AnimationMixer(this.renderedKitchen)
    this.animationDoor = this.mixer.clipAction(this.kitchen.animations[16])
    this.animationDoor.play()
  }

  resize() { }
  update() {
    this.mixer.update(this.time.delta * 0.0010)
  }
}