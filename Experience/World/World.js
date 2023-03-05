import * as THREE from 'three'
import Experience from "../Experience";

import Kitchen from './Kitchen';
import Environment from './Environment';
import Control from './Control';

export default class World {
  constructor() {
    this.experience = new Experience()
    this.size = this.experience.size
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera
    this.resource = this.experience.resource

    this.resource.on('ready', () => {
      this.environment = new Environment()
      this.kitchen = new Kitchen()
      this.control = new Control()
    })
  }

  resize() {

  }
  update() {
    if (this.kitchen) {
      this.kitchen.update()
    }
    if (this.control) {
      this.control.update()
    }
  }
}