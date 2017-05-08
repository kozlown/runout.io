import _ from 'lodash'

const clientRoute = (ws, callback, servers, clients) => {
    clients.push({
        ws
    })
    const gamesInfo = {
        route: 'games',
        games: Array.from(servers, server => server.info)
    }
    callback(gamesInfo)
}

export default clientRoute
