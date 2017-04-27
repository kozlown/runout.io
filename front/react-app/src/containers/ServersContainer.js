import { connect }      from 'react-redux'

import * as ServersActions    from '../actions/ServersActions'

import Servers              from '../components/ServersComponent'

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
        },
        toggle_menu: () => {
            return () => {
                dispatch(ServersActions.toggle_menu())
            }
        },
    }
}

const ServersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Servers)

export default ServersContainer
