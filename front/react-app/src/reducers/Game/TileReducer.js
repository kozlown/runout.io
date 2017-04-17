import * as types from '../../actions/actionsTypes'

const initialState = {

}

const TileReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.ACTIVE_TILE :

            return {
                ...state,
                active: (action.data.key === state.key)
            }

        case types.INACTIVE_TILE :

            return {
                ...state,
                active: !(action.data.key === state.key)
            }

        default:

            return state
    }
}

export default TileReducer
