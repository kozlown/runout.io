import * as PIXI from 'pixi.js'
import 'pixi-display'
import _ from 'lodash'

import Tile from './Tile'


/**
 * @class Layer
 * @description A layer of the map
 */
class Layer {
    /**
     * @constructor
     * @description constructor of a Layer instance
     */
    constructor(data, map) {
        this.data = data
        this.map = map
        this.textures = this.map.textures
        this.displayGroup = new PIXI.DisplayGroup(this.data.displayGroup, false)
        this.container = new PIXI.Container()
        this.container.displayGroup = this.displayGroup
        this.setTiles()
        this.applyTiles()
    }
    /**
     * @method setTiles
     * @description set all required tiles for the map
     */
    setTiles() {
        this.tiles = []
        _.each(this.data.tiles, (tileData) => {
            const tile = new Tile(tileData, this)
            this.tiles.push(tile)
        })
    }
    /**
     * @method applyTiles
     * @description apply all Tiles to the container
     */
    applyTiles() {
        _.each(this.tiles, (tile) => {
            this.container.addChild(tile.container)
        })
    }
}
export default Layer
