import _ from 'lodash'
import { Container, Texture } from 'pixi.js'
import Map from './Map'
import Player from './Player'

const textures = [
    {
        name: 'grass_main',
        image: './assets/images/Game/grass_main.png'
    }, {
        name: 'bunny',
        image: './assets/images/Game/bunny.png'
    }
]

/**
 * @class Game
 * @description a game instance
 */
class Game {
    /**
     * @constructor
     * @description constructor of a Game instance
     */
    constructor(data, app) {
        this.data = data
        this.app = app
        this.container = new Container()
        this.setTextures()
    }
    /**
     * @method loadMap
     * @description load a map from data
     */
    loadMap(mapData) {
        const map = new Map(mapData, this)
        this.container.addChild(map.container)
    }
    /**
     * @method loadMap
     * @description load a map from data
     */
    loadPlayers(playersData) {
        this.players = []
        _.each(playersData, (playerData) => {
            const player = new Player(playerData, this)
            this.players.push(player)
            this.container.addChild(player.container)
        })
    }
    /**
     * @method setTextures
     * @description set all required textures for the game
     */
    setTextures() {
        this.textures = {}
        _.each(textures, (texture) => {
            this.textures[texture.name] = Texture.fromImage(texture.image)
        })
    }
}
export default Game
