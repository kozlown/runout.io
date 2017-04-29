import { connect }      from 'react-redux'

import * as ProfileActions    from '../actions/ProfileActions'

import Profile              from '../components/ProfileComponent'

const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        change_pseudo: (pseudo) => {
            return () => {
                dispatch(ProfileActions.change_pseudo(pseudo))
            }
        },
        change_real_name: (realName) => {
            return () => {
                dispatch(ProfileActions.change_real_name(realName))
            }
        }
    }
}

const ProfileContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

export default ProfileContainer
