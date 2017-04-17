import React, { Component } from 'react';

import MapContainer from '../../containers/Game/MapContainer'

class Game extends Component {
    render() {
        return (
            <div className="Game">
                <MapContainer />
            </div>
        );
    }
}

export default Game;
