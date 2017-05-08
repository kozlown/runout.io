import _ from 'lodash'

const clientRoute = (ws, callback, servers, clients) => {
    clients.push(ws)
    callback({
        route: 'games',
        games: JSON.stringify(servers)
    })
}

export default clientRoute
