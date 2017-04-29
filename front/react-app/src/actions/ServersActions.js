import * as types from './actionsTypes'

export function loadMap(map) {
    return {
        type: types.LOAD_MAP,
        data: {
            map: map
        }
    }
}

export function toggle_menu() {
    return {
        type: types.TOGGLE_MENU,
        data: {}
    }
}