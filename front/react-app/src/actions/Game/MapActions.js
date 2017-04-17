import * as types from '../actionsTypes'

export function set_map_position(position) {
    return {
        type: types.SET_MAP_POSITION,
        data: {
            position: position
        }
    }
}
