import { EventEmitter } from 'events'
// import Experience from '../Experience'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export default class Resource extends EventEmitter {
  constructor(assets) {
    super()
    // this.experience = new Experience()
    // this.renderer = this.experience.renderer
    this.assets = assets
    this.item = {}
    this.queue = this.assets.length
    this.loaded = 0

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {
    this.loaders = {}
    this.loaders.gltfLoader = new GLTFLoader()
    this.loaders.dracoLoader = new DRACOLoader()
    this.loaders.dracoLoader.setDecoderPath('/draco/') //draco folder from public
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader) // pakai ini karena modelnya di compress dari blender
  }

  startLoading() {
    this.assets.forEach((asset) => {
      if (asset.type === 'glbModel') {
        this.loaders.gltfLoader.load(asset.path, (file) => {
          this.singleAssetLoaded(asset, file)
        })
      }
    })
  }

  singleAssetLoaded(asset, file) {
    this.item[asset.name] = file
    this.loaded++
    if (this.loaded === this.queue) {
      this.emit('ready')
    }
  }
} 