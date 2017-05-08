// import * as types from '../actions/actionsTypes'

let servers = []

for (let i=0; i<30; i++) {
    servers.push({
        id: i,
        name: "cool server"
    })
}

const initialState = {
    servers: servers
}

const ServersReducer = (state = initialState, action) => {

    switch (action.type) {

        default:

            return state
    }
}

export default ServersReducer
