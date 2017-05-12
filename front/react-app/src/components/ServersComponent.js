import React, { Component } from 'react'
import _ from 'lodash'
import base64 from 'base64-js'
import config from '../config'

class ServersComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            wsMainServer: null,
            wsGameServer: null,
            servers: [],
            serversDom: []
        }
    }
    componentDidMount() {
        // connect to main server
        const wsMainServer = new WebSocket(config.gamesHandler.host)
        this.setState({
            wsMainServer
        })
        wsMainServer.onopen = () => {
            console.main(`connected at ${config.gamesHandler.host}`)
            const sayHello = {
                route: 'client'
            }
            const sayHelloString = JSON.stringify(sayHello)
            wsMainServer.send(sayHelloString)

            wsMainServer.onmessage = (event) => {
                try {
                    const dataObject = JSON.parse(event.data)
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
            </div>
        )
    }
    updateServers(servers) {
        console.main('servers updated \n%O', servers)
        this.setState({
            servers
        })
        this.displayServers()
    }
    displayServers() {
        const servers = this.state.servers
        const serversDom = []
        _.each(servers, (server, index) => {
            const base64Icon = `data:image/png;base64,${base64.fromByteArray(server.icon.data)}`
            serversDom.push(
                <div className="server" onDoubleClick={ () => this.connectToGameServer(server) } key={ index }>
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
    /**
     * @method connectToGameServer
     * @description connect to a game server
     */
    connectToGameServer(server) {
        console.game(`try to connect to ws://${server.ip}:${server.port}`)
        // close the last game connection
        if (this.state.wsGameServer !== null) {
            this.state.wsGameServer.close()
        }
        // connect to new game
        const wsGameServer = new WebSocket(`ws://${server.ip}:${server.port}`)
        this.setState({
            wsGameServer
        })
        wsGameServer.onopen = () => {
            console.game(`connected to ws://${server.ip}:${server.port}`)
            const readCookie = (name) => {
                const nameEQ = `${name}=`
                const ca = document.cookie.split(';')
                for (let i = 0; i < ca.length; i += 1) {
                    let c = ca[i]
                    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
                    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
                }
                return null
            }
            const token = readCookie('token')
            const join = {
                route: 'join',
                token
            }
            const joinString = JSON.stringify(join)

            wsGameServer.onmessage = (event) => {
                try {
                    const dataObject = JSON.parse(event.data)
                    switch (dataObject.route) {
                        case 'has joined':
                            if (dataObject.status === 'ok') {
                                console.game('joined game !')
                                this.props.toggleMenu()()
                                this.props.joinGame(wsGameServer)()
                            } else if (status === 'error') {
                                console.error(dataObject.error)
                            }
                            break
                        default:
                            break
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            // try to join
            console.game('try to join game...')
            wsGameServer.send(joinString)
        }
    }
}

export default ServersComponent
