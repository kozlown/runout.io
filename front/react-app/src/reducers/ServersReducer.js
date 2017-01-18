import React from 'react';
import * as types from '../actions/actionsTypes'

let servers = []
for (let i=0; i<10; i++) {
    servers.push(<p className="server">server { i }</p>)
}

const initialState = {
    servers : (
        <div>
            { servers }
        </div>
    )
}

const ServersReducer = (state = initialState, action) => {

    switch (action.type) {

        default:

            return state
    }
}

export default ServersReducer
