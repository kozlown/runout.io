import { connect }      from 'react-redux'

import * as ServersActions    from '../actions/ServersActions'

import Servers              from '../components/Servers'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMap: (key) => {
            return () => {
                dispatch(ServersActions.loadMap(key))
            }
        }
    }
}

const ServersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Servers)

export default ServersContainer
