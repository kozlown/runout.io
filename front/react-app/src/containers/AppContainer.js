import { connect }      from 'react-redux'

import * as AppActions    from '../actions/AppActions'

import App              from '../components/App'

const mapStateToProps = (state) => {
    return {
        state: {
            pseudo: state.Profile.pseudo
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        change_pseudo: (pseudo) => {
            return () => {
                dispatch(AppActions.change_pseudo(pseudo))
            }
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
