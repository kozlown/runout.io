import _ from 'lodash'

const updateRoute = (ws, callback, servers, clients, { oldName, icon, name, mod, playersNb, map }) => {
    // add server to servers
    const updatedServer = _.filter(servers, server => server.name === oldName)
    if (updatedServer.length === 0) {
        callback({
            route: 'update',
            error: `You'r server named '${oldName}' couldn't be found.
            Please say hello before updating.`
        })
    } else {
        updatedServer[0] = {
            icon: !_.isUndefined(icon) ? icon : updatedServer.icon,
            name: !_.isUndefined(name) ? icon : updatedServer.name,
            mod: !_.isUndefined(mod) ? icon : updatedServer.mod,
            playersNb: !_.isUndefined(playersNb) ? icon : updatedServer.playersNb,
            map: !_.isUndefined(map) ? icon : updatedServer.map
        }
        callback({
            route: 'update',
            message: 'You\'r server has been successfully updated.'
        })
    }
}

export default updateRoute

