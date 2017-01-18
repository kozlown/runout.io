import { connect }      from 'react-redux'

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

    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer
