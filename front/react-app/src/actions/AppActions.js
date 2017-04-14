import * as types from './actionsTypes'

export function change_pseudo(pseudo) {
    return {
        type: types.CHANGE_PSEUDO,
        data: {
            pseudo: pseudo
        }
    }
}

