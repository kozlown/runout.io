import React, { Component } from 'react'
import _ from 'lodash'
import base64 from 'base64-js'
import config from '../config'

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
            ws: null,
            servers: serversSample,
            serversDom: []
        }
    }
    componentDidMount() {
        const ws = new WebSocket(config.gamesHandler.host)
        this.setState({
            ws
        })
        ws.onopen = () => {
            const sayHello = {
                route: 'client'
            }
            const sayHelloString = JSON.stringify(sayHello)
            ws.send(sayHelloString)

            ws.onmessage = (event) => {
                try {
                    const dataObject = JSON.parse(event.data)
                    console.info(dataObject)
                    switch (dataObject.route) {
                        case 'games':
                            this.updateServers(dataObject.games)
                            break
                        default:
                            break
                    }
                } catch (e) {
                    console.info(e)
                }
            }
        }
        this.updateServers()
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
    updateServers(servers) {
        this.setState({
            servers
        })
        this.displayServers()
    }
    displayServers() {
        const servers = this.state.servers
        const serversDom = []
        _.each(servers, (server, index) => {
            console.info(server.icon)
            const base64Icon = `data:image/png;base64,${base64.fromByteArray(server.icon.data)}`
            console.info(base64Icon)
            serversDom.push(
                <div className="server" key={ index }>
                    <img src={ base64Icon } alt="icon" className="icon" />
                    <div className="info">
                        <span className="name">{ server.name }</span>
                        <span className="mod">{ server.mod }</span>
                        <span className="mapName">{ server.name }</span>
                        <span className="nbPlayers">{ server.nbPlayers }</span>
                        <span className="ping">{ server.ping }</span>
                    </div>
                </div>
            )
        })
        this.setState({
            serversDom
        })
    }
}

export default ServersComponent
