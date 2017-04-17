import * as types from '../actionsTypes'

export function active_tile(key) {
    return {
        type: types.ACTIVE_TILE,
        data: {
            key: key
        }
    }
}

export function inactive_tile(key) {
    return {
        type: types.INACTIVE_TILE,
        data: {
            key: key
        }
    }
}