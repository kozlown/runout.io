import _ from 'lodash'

const helloRoute = (ws, callback, servers, { icon, name, mod, playersNb, map }) => {
    // check if all required fields are filled
    if (!_.isUndefined(icon) && !_.isUndefined(name) && !_.isUndefined(mod)
        && !_.isUndefined(playersNb) && !_.isUndefined(map)) {
        // check if a server already exists with this name
        const pairServers = _.filter(servers, server => server.name === name)
        if (pairServers.length === 0) {
            // add server to servers
            servers.push({
                icon,
                name,
                mod,
                playersNb,
                map,
                ip: ws.upgradeReq.connection.remoteAddress
            })
            callback({
                route: 'hello',
                message: `Hello ${name}, you've been added to servers. 
            I hope you'll be an happy server in Runout.io.`
            })
        } else {
            // if another server has this name
            callback({
                route: 'hello',
                error: `Hello, a server has already the name '${name}',
                please try to say hello with another name`
            })
        }
    } else {
        // if a field is empty
        callback({
            route: 'hello',
            error: `Hello, it looks that you'r missing a field.
            You must provide the icon (icon), the server name (name), the mod (mod),
            the number of players (playersNb), and the map name (map)`
        })
    }
}

export default helloRoute

