import React, { Component } from 'react';
import LayerContainer from '../../containers/Game/LayerContainer'

class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: props.position
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            position: nextProps.position
        })
    }
    getLayers() {
        const layers = this.props.state.Map.map
        let layersComponents = []
        for (let i=0, nbTiles=layers.length; i<nbTiles; i++){
            const layer = layers[i]

            layersComponents.push(
                <LayerContainer key={i} enabled={true} layer={layer} />
            )
        }
        return layersComponents
    }
    render() {
        const style = {
            left: `${this.state.position.x}px`,
            top: `${this.state.position.y}px`
        }
        return (
            <div className="Map" style={style}>
                { this.getLayers() }
            </div>
        );
    }
}

export default Map;
