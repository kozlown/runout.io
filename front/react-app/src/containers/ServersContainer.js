import { connect }      from 'react-redux'

import Servers              from '../components/Servers'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ServersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Servers)

export default ServersContainer
