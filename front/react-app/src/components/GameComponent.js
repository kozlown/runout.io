import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import 'pixi-display'
import Game from '../Game/Game'

const mapData = {
    layers: [
        {
            displayGroup: -1,
            tiles: [
                {
                    texture: {
                        name: 'grass_main',
                        position: {
                            x: -1,
                            y: -1
                        }
                    },
                    position: {
                        x: 1,
                        y: 1
                    }
                }
            ]
        }
    ]
}
const playersData = [
    {
        name: 'Nigel',
        texture: {
            name: 'bunny',
            position: {
                x: 0,
                y: 0
            }
        },
        position: {
            x: 70,
            y: 70
        }
    }
]

class GameComponent extends Component {
    constructor(props) {
        super(props)
        this.app = new PIXI.Application()
    }
    componentDidMount() {
        // resize renderer to window's size
        this.app.renderer.resize(window.innerWidth, window.innerHeight)
        // specify display list component
        this.app.stage.displayList = new PIXI.DisplayList()
        // set a new Game instance
        this.game = new Game(this.app)
        // load the map
        this.game.loadMap(mapData)
        // load players
        this.game.loadPlayers(playersData)
        // add game to the stage
        this.app.stage.addChild(this.game.container)
        // set all event listeners
        this.setEventListeners()
        // display the stage
        this.gameDOM.appendChild(this.app.view)
    }
    render() {
        return (
            <div className="Game" ref={(gameDOM) => { this.gameDOM = gameDOM }} />
        )
    }
    /**
     * @method setEventListeners
     * @description set all event listeners
     */
    setEventListeners() {
        window.addEventListener('resize', () => {
            this.app.renderer.resize(window.innerWidth, window.innerHeight)
        })
    }
}

export default GameComponent;
