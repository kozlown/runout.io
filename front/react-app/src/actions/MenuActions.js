import * as types from './actionsTypes'

export function toggle_menu() {
    return {
        type: types.TOGGLE_MENU,
        data: {

        }
    }
}

export function go_panel(panel) {
    return {
        type: types.GO_PANEL,
        data: {
            panel: panel
        }
    }
}
