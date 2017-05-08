import helloRoute from './routes/helloRoute'
import clientRoute from './routes/clientRoute'
import updateRoute from './routes/updateRoute'
import _ from 'lodash'

const router = (ws, servers, clients, message, send, broadcast) => {
    const route = message.route
    const data = message.data
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
            helloRoute(ws, send, servers, broadcast, data)
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

