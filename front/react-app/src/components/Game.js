import React, { Component } from 'react'
import * as PIXI from 'pixi.js'
import Map from '../Game/Map'

const mapData = {
    textures: [
        {
            name: 'grass_main',
            image: './assets/images/Game/grass_main.png'
        }
    ],
    tiles: [
        {
            texture: {
                name: 'grass_main',
                position: {
                    x: -64,
                    y: -64
                }
            },
            position: {
                x: 64,
                y: 64
            }
        }
    ]
}

class Game extends Component {
    constructor(props) {
        super(props)
        this.app = new PIXI.Application()
    }
    componentDidMount() {
        this.gameDOM.appendChild(this.app.view)

        this.map = new Map(mapData)
        this.app.stage.addChild(this.map.container)
    }
    render() {
        return (
            <div className="Game" ref={(gameDOM) => { this.gameDOM = gameDOM }} />
        )
    }
    resize(width, height){
        this.app.renderer.resize(width, height)
    }
}

export default Game;
