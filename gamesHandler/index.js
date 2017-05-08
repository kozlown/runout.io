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

    // brodcase function
    const broadcast = (responseObject) => {
        const responseString = JSON.stringify(responseObject)
        _.each(clients, (client) => {
            client.ws.send(responseString)
        })
    }

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            const send = (responseObject) => {
                const responseString = JSON.stringify(responseObject)
                ws.send(responseString)
            }
            try {
                const messageObject = JSON.parse(message)
                router(ws, servers, clients, messageObject, send, broadcast)
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
            // TODO: remove the corresponding client from clients

            // TODO: broadcast only if the ws is corresponding to a server
            // send new servers to every client
            const gamesInfo = {
                route: 'games',
                games: Array.from(servers, serv => serv.info)
            }
            broadcast(gamesInfo)
        })
    })
}

export default gamesHandler
