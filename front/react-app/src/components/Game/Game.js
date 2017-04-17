import React, { Component } from 'react';

import MapContainer from '../../containers/Game/MapContainer'

class Game extends Component {
    render() {
        const mapPosition = {
            x: 0,
            y: 0
        }
        return (
            <div className="Game">
                <MapContainer position={mapPosition}/>
            </div>
        );
    }
}

export default Game;
