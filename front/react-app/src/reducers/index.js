import { combineReducers } from 'redux'

import AppReducer from './AppReducer'
import MenuReducer from './MenuReducer'
import ProfileReducer from './ProfileReducer'
import ServersReducer from './ServersReducer'
import SettingsReducer from './SettingsReducer'


const allReducers = combineReducers({
    App      : AppReducer,
    Menu     : MenuReducer,
    Profile  : ProfileReducer,
    Servers  : ServersReducer,
    Settings : SettingsReducer
})

export default allReducers
