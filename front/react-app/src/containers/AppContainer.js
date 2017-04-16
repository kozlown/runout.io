import { connect }      from 'react-redux'

// import * as AppActions    from '../actions/AppActions'

import App              from '../components/App'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
