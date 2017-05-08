import * as PIXI from 'pixi.js'
import 'pixi-display'

/**
 * @class Player
 * @description a Player of the game
 */
class Player {
    /**
     * @constructor
     * @description constructor of a Player instance
     */
    constructor(data, game) {
        this.data = data
        this.game = game
        this.textures = this.game.textures
        this.container = new PIXI.Container()
        this.displayGroup = new PIXI.DisplayGroup(0, false)
        this.container.displayGroup = this.displayGroup
        this.setPlayer()
    }
    /**
     * @method setPlayer
     * @description set the player from data
     */
    setPlayer() {
        const textureData = this.data.texture
        const texture = this.textures[textureData.name]
        const sprite = new PIXI.Sprite(texture)
        this.container.addChild(sprite)
        this.container.position = new PIXI.Point(this.data.position.x, this.data.position.y)
    }
}
export default Player
