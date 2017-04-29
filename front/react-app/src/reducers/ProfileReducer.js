import * as types from '../actions/actionsTypes'

const initialState = {
    pseudo: 'Guest',
    realName: 'Guest'
}

const ProfileReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.CHANGE_PSEUDO :
            return {
                ...state,
                pseudo: action.data.pseudo
            }

        case types.CHANGE_REAL_NAME :
            return {
                ...state,
                realName: action.data.realName
            }

        default:

            return state
    }
}

export default ProfileReducer
