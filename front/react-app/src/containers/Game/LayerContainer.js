import { connect }      from 'react-redux'
import Layer              from '../../components/Game/Layer'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const LayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Layer)

export default LayerContainer
