import helloRoute from './routes/helloRoute'
import clientRoute from './routes/clientRoute'
import updateRoute from './routes/updateRoute'

const router = (ws, servers, clients, message) => {
    const route = message.route
    const data = message.data
    const send = (responseObject) => {
        const responseString = JSON.stringify(responseObject)
        ws.send(responseString)
    }
    // error
    const error = {
        route: 'error',
        error: `Unhandled route '${route}'.`
    }
    switch (route) {
        // when a client says hello
        case 'client':
            clientRoute(ws, send, servers, clients)
            break
        // when game server says hello
        case 'hello':
            helloRoute(ws, send, servers, data)
            break
        // when a game server update his fields
        case 'update':
            updateRoute(ws, send, servers, clients, data)
            break
        default:
            send(error)
            break
    }
}

export default router

