import * as types from '../actions/actionsTypes'

const initialState = {
    visible: true,
    panel: 'Profile'
}

const MenuReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.TOGGLE_MENU :
            return {
                ...state,
                visible: !state.visible
            }
        case types.GO_PANEL :
            return {
                ...state,
                panel: action.data.panel
            }
        default:
            return state
    }
}

export default MenuReducer
