import React, { Component } from 'react';
import LayerContainer from '../../containers/Game/LayerContainer'

class Map extends Component {
    render() {
        const layers = this.props.state.Map.map
        let layersComponents = []
        for (let i=0, nbTiles=layers.length; i<nbTiles; i++){
            const layer = layers[i]

            layersComponents.push(
                <LayerContainer key={i} enabled={true} layer={layer} />
            )
        }
        return (
            <div className="Map">
                { layersComponents }
            </div>
        );
    }
}

export default Map;
