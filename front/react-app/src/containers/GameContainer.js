import { connect }      from 'react-redux'
import Game              from '../components/GameComponent'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game)

export default GameContainer
