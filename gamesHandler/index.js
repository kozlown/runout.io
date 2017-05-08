import * as WebSocket from 'ws'
import _ from 'lodash'
import router from './router'

const gamesHandler = (server) => {
    const wss = new WebSocket.Server({
        // perMessageDeflate: false,
        server
    })

    // stock all servers
    const servers = []
    // stock all clients ws
    const clients = []

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            try {
                const messageObject = JSON.parse(message)
                router(ws, servers, clients, messageObject)
            } catch (e) {
                const error = {
                    route: 'error',
                    error: e.toString()
                }
                const errorString = JSON.stringify(error)
                ws.send(errorString)
            }
        })
        ws.on('close', () => {
            // remove the corresponding server from servers
            _.each(servers, (serv, key) => {
                if (serv.ws === ws) {
                    servers.splice(key, key + 1)
                }
            })
        })
    })
}

export default gamesHandler
