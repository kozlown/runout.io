import React, { Component } from 'react';

class Servers extends Component {
    render() {

        return (
            <div className="Servers">
                <div className="list">
                    { this.props.state.Servers.servers }
                </div>
                <div className="play"><p>PLAY</p></div>
            </div>
        );
    }
}

export default Servers;
