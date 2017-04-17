import { connect }      from 'react-redux'

import * as TileActions    from '../../actions/Game/TileActions'

import Tile              from '../../components/Game/Tile'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        active_tile: () => {
            return () => {
                dispatch(TileActions.active_tile())
            }
        },
        inactive_tile: (panel) => {
            return () => {
                dispatch(TileActions.inactive_tile(panel))
            }
        }
    }
}

const TileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Tile)

export default TileContainer
