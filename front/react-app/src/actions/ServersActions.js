import * as types from './actionsTypes'

export function toggleMenu() {
    return {
        type: types.TOGGLE_MENU,
        data: {}
    }
}

export function joinGame(ws) {
    return {
        type: types.JOIN_GAME,
        data: {
            ws
        }
    }
}