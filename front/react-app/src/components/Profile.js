import React, { Component } from 'react';

class Profile extends Component {
    render() {
        let display = this.props.state.Menu.panel === 'Profile' ? 'visible' : 'hidden'

        let handleChange = (event) => {
            this.props.change_pseudo(event.target.value)()
        }

        return (
            <div className={ "Profile "+ display }>
                <p>pseudo : <input id="pseudo" onChange={ handleChange } type="text" value={ this.props.state.Profile.pseudo }/></p>
            </div>
        );
    }
}

export default Profile;
