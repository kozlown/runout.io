import { extras, Point, Container } from 'pixi.js'

/**
 * @class Tile
 * @description a tile of the game, must be in a layer
 */
class Tile {
    /**
     * @constructor
     * @description constructor of a Tile instance
     */
    constructor(data, layer) {
        this.data = data
        this.layer = layer
        this.textures = this.layer.textures
        this.container = new Container()
        this.setTile()
    }
    /**
     * @method setTile
     * @description set the tile from data
     */
    setTile() {
        const textureData = this.data.texture
        const texture = this.textures[textureData.name]
        const tilingSprite = new extras.TilingSprite(texture, 64, 64)
        const tilePosition = new Point(textureData.position.x * 64, textureData.position.y * 64)
        tilingSprite.tilePosition = tilePosition
        this.container.addChild(tilingSprite)
        this.container.position = new Point(this.data.position.x * 64, this.data.position.y * 64)
    }
}
export default Tile
