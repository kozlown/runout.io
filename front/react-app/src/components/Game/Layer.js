import React, { Component } from 'react';
import TileContainer from '../../containers/Game/TileContainer'

class Layer extends Component {
    constructor(props){
        super(props)

        this.state = {
            layer: props.layer,
            visible: props.active
        }
    }
    componentWillReceiveProps(nextProps){
        this.state = {
            layer: nextProps.layer,
            visible: nextProps.enabled
        }
    }
    render() {
        const style = {
            display: this.state.visible ? "block" : "hidden"
        }

        const tiles = this.state.layer.tiles

        let tilesComponents = []
        for (let i=0, nbTiles=tiles.length; i<nbTiles; i++){
            const tile = tiles[i]

            tilesComponents.push(
                <TileContainer
                    key={i}
                    position={tile.position}
                    column={tile.column}
                    line={tile.line}
                    tileset={tile.tileset} />
            )
        }
        return (
            <div className="Layer" style={style} >
                {tilesComponents}
            </div>
        );
    }
}

export default Layer;
