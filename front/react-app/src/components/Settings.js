import React, { Component } from 'react';

class Settings extends Component {
    render() {
        let display = this.props.state.Menu.panel === 'Settings' ? 'visible' : 'hidden'

        return (
            <div className={ "Settings "+ display }>

            </div>
        );
    }
}

export default Settings;
