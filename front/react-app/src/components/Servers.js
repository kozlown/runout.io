import React, { Component } from 'react';

class Servers extends Component {
    render() {
        const stateServers = this.props.state.Servers
        let servers = []

        // set servers dom
        for (let i=0, size=stateServers.servers.length; i<size; i++) {
            let server = stateServers.servers[i]

            servers.push(
                <p className={ `server` } key={ i }>
                    <span className="id">{ server.id }</span>. <span className="name">{ server.name }</span>
                </p>
            )
        }

        return (
            <div className="Servers">
                <div className="list">
                    { servers }
                </div>
                <div className="play"><p>GO !</p></div>
            </div>
        );
    }
}

export default Servers;
