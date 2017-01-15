import * as types from '../actions/actionsTypes'

const initialState = {
    pseudo: 'Guest'
}

const ProfileReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.CHANGE_PSEUDO :

            return {
                ...state,
                pseudo: action.data.pseudo
            }

        default:

            return state
    }
}

export default ProfileReducer
