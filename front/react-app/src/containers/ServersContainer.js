import { connect }      from 'react-redux'

import * as ServersActions    from '../actions/ServersActions'

import Servers              from '../components/ServersComponent'

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMenu: () => (() => {
            dispatch(ServersActions.toggleMenu())
        }),
        joinGame: ws => (() => {
            dispatch(ServersActions.joinGame(ws))
        })
    }
}

const ServersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Servers)

export default ServersContainer
