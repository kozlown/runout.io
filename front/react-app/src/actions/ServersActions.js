import * as types from './actionsTypes'

export function loadMap(map) {
    return {
        type: types.LOAD_MAP,
        data: {
            map: map
        }
    }
}