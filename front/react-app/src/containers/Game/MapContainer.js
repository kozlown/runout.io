import { connect }      from 'react-redux'

import * as MapActions    from '../../actions/Game/MapActions'

import Map              from '../../components/Game/Map'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_map_position: (position) => {
            return () => {
                dispatch(MapActions.set_map_position(position))
            }
        }
    }
}

const MapContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Map)

export default MapContainer
