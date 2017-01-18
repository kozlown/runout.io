import { connect }      from 'react-redux'

import Settings              from '../components/Settings'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const SettingsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings)

export default SettingsContainer
