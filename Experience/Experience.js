import * as THREE from 'three';

import Size from './Utils/Size';
import Time from './Utils/Time';
import Resource from './Utils/Resource';
import assets from './Utils/assets';

import Camera from './Camera';
import Renderer from './Renderer';

import World from './World/World';

export default class Experience {
  static instance
  constructor(canvas) {
    if (Experience.instance) return Experience.instance
    Experience.instance = this

    this.canvas = canvas
    this.scene = new THREE.Scene()
    this.time = new Time()
    this.size = new Size()
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.resource = new Resource(assets)

    this.world = new World()

    this.size.on('resize', () => {
      this.resize()
    })
    this.time.on('update', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.world.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.world.update()
    this.renderer.update()
  }
}