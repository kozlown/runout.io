import * as types from '../../actions/actionsTypes'

const grass_main = "./assets/images/grass_main.png"

const tiles = []

for (let x=0, largeur=12; x<largeur; x++ ){
    for (let y=0, hauteur=12; y<hauteur; y++ ){
        let line = x
        let column = y
        tiles.push({
            position: {
                x: x,
                y: y,
            },
            line: line,
            column: column,
            tileset: {
                url: grass_main
            }
        })
    }
}

const map = [{
    type: "design",
    tiles: tiles
}]

const initialState = {
    map: map
}

const MapReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_MAP_POSITION :
            return {
                ...state,
                position: action.data.position
            }

        case types.LOAD_MAP :

            return {
                ...state,
                map: action.data.map
            }

        default:

            return state
    }
}

export default MapReducer
