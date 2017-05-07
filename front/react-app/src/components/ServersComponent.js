import React, { Component } from 'react'
import _ from 'lodash'

const serversSample = [
    {
        icon: 'http://icons.iconarchive.com/icons/dtafalonso/android-lollipop/512/Play-Games-icon.png',
        name: 'Robot server',
        mod: 'run',
        mapName: 'robot_map_v1',
        nbPlayers: 11,
        ping: 67
    }
]

class ServersComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            servers: serversSample,
            serversDom: []
        }
    }
    componentDidMount() {
        this.updateServers()
        this.displayServers()
    }
    render() {
        return (
            <div className="Servers">
                <div className="label-servers">
                    <p className="icon">icon</p>
                    <div className="info">
                        <p className="name">name</p>
                        <p className="mod">mod</p>
                        <p className="mapName">map</p>
                        <p className="nbPlayers">players</p>
                        <p className="ping">ping</p>
                    </div>
                </div>
                <div className="list">
                    { this.state.serversDom }
                </div>
                <div className="play" onClick={ this.props.toggle_menu() }><p>GO !</p></div>
            </div>
        )
    }
    updateServers() {

    }
    displayServers() {
        const servers = this.state.servers
        const serversDom = []
        _.each(servers, (server, index) => {
            serversDom.push(
                <p className="server" key={ index }>
                    <img src={ server.icon } alt="icon" className="icon" />
                    <div className="info">
                        <span className="name">{ server.name }</span>
                        <span className="mod">{ server.mod }</span>
                        <span className="mapName">{ server.mapName }</span>
                        <span className="nbPlayers">{ server.nbPlayers }</span>
                        <span className="ping">{ server.ping }</span>
                    </div>
                </p>
            )
        })
        this.setState({
            serversDom
        })
    }
}

export default ServersComponent
