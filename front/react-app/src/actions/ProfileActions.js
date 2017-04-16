import * as types from './actionsTypes'

export function change_pseudo(pseudo) {
    return {
        type: types.CHANGE_PSEUDO,
        data: {
            pseudo: pseudo
        }
    }
}

export function change_real_name(realName) {
    return {
        type: types.CHANGE_REAL_NAME,
        data: {
            realName: realName
        }
    }
}