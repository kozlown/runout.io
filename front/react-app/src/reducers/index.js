import { combineReducers } from 'redux'

import AppReducer from './AppReducer'
import MenuReducer from './MenuReducer'
import ProfileReducer from './ProfileReducer'
import ServersReducer from './ServersReducer'
import SettingsReducer from './SettingsReducer'
import GameReducer from './Game/GameReducer'
import MapReducer from './Game/MapReducer'
import LayerReducer from './Game/LayerReducer'
import TileReducer from './Game/TileReducer'


const allReducers = combineReducers({
    App      : AppReducer,
    Menu     : MenuReducer,
    Profile  : ProfileReducer,
    Servers  : ServersReducer,
    Settings : SettingsReducer,
    Game     : GameReducer,
    Map      : MapReducer,
    Layer    : LayerReducer,
    Tile     : TileReducer
})

export default allReducers
