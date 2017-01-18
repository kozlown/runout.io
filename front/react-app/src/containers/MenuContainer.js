import { connect }      from 'react-redux'

import * as MenuActions    from '../actions/MenuActions'

import Menu              from '../components/Menu'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggle_menu: () => {
            return () => {
                dispatch(MenuActions.toggle_menu())
            }
        },
        go_panel: (panel) => {
            return () => {
                dispatch(MenuActions.go_panel(panel))
            }
        }
    }
}

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default MenuContainer
