import * as WebSocket from 'ws'
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

        ws.send('Hi')
    })
}

export default gamesHandler
