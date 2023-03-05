import * as THREE from 'three'
import Experience from "./Experience";

export default class Renderer {
  constructor() {
    this.experience = new Experience()
    this.size = this.experience.size
    this.scene = this.experience.scene
    this.canvas = this.experience.canvas
    this.camera = this.experience.camera

    this.setRenderer()
  }

  setRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true
    })

    this.renderer.useLegacyLights = true
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.toneMapping = THREE.CineonToneMapping
    this.renderer.toneMappingExposure = 1.5
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setPixelRatio(this.size.pixelRatio)
  }

  resize() {
    this.renderer.setSize(this.size.width, this.size.height)
    this.renderer.setPixelRatio(this.size.pixelRatio)
  }
  update() {
    this.renderer.render(this.scene, this.camera.perspectiveCamera)
  }
}