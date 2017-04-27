import { Container } from 'pixi.js'
import _ from 'lodash'

import Layer from './Layer'


/**
 * @class Map
 * @description A Map of the game
 */
class Map {
    /**
     * @constructor
     * @description constructor of a Map instance
     * @param {Object} data Data describing the map
     */
    constructor(data, game) {
        this.data = data
        this.game = game
        this.textures = this.game.textures
        this.layers = []
        this.container = new Container()
        this.setLayers()
        this.setMap()
    }
    /**
     * @method setLayers
     * @description set all layers for the map
     */
    setLayers() {
        this.layers = []
        _.each(this.data.layers, (layerData) => {
            this.layers.push(new Layer(layerData, this))
        })
    }
    /**
     * @method setMap
     * @description set the map container from data
     */
    setMap() {
        _.each(this.layers, (layer) => {
            this.container.addChild(layer.container)
        })
    }

}
export default Map
