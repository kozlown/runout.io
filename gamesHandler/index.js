import * as WebSocket from 'ws'

const gamesHandler = (server) => {
    const wss = new WebSocket.Server({
        //  perMessageDeflate: false,
        server
    })

    wss.on('connection', (ws) => {
        ws.on('message', (message) => {
            console.info('received: %s', message)
        })

        ws.send('something')
    })
}

export default gamesHandler
