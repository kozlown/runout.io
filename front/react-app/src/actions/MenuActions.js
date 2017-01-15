import * as types from './actionsTypes'

export function toggle_menu() {
    return {
        type: types.TOGGLE_MENU,
        data: {

        }
    }
}

export function go_settings_panel() {
    return {
        type: types.GO_PANEL,
        data: {
            panel: 'settings'
        }
    }
}

export function go_servers_panel() {
    return {
        type: types.GO_PANEL,
        data: {
            panel: 'servers'
        }
    }
}

export function go_profile_panel() {
    return {
        type: types.GO_PANEL,
        data: {
            panel: 'profile'
        }
    }
}
