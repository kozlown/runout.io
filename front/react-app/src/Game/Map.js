import { Container, Texture, extras, Point } from 'pixi.js'
import _ from 'lodash'

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
    constructor(data) {
        this.data = data
        this.container = new Container()
        this.setMap()
    }
    /**
     * @method setMap
     * @description set the map container from data
     */
    setMap() {
        this.setTextures()
        this.setTiles()
        this.applyTiles()
    }
    /**
     * @method setTextures
     * @description set all required textures for the map
     */
    setTextures() {
        this.textures = {}
        _.each(this.data.textures, (texture) => {
            this.textures[texture.name] = Texture.fromImage(texture.image)
        })
    }
    /**
     * @method setTiles
     * @description set all required tiles for the map (setTextures must have been called before)
     */
    setTiles() {
        this.tiles = []
        _.each(this.data.tiles, (tile) => {
            const texture = this.textures[tile.texture.name]
            const tilingSprite = new extras.TilingSprite(texture, 64, 64)
            tilingSprite.tilePosition = new Point(tile.texture.position.x, tile.texture.position.y)
            tilingSprite.position = new Point(tile.position.x, tile.position.y)
            this.tiles.push(tilingSprite)
        })
    }
    /**
     * @method applyTiles
     * @description apply all Tiles to the container
     */
    applyTiles() {
        _.each(this.tiles, (tile) => {
            this.container.addChild(tile)
        })
    }
}
export default Map