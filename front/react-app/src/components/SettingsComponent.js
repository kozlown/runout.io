import React, { Component } from 'react';

class SettingsComponent extends Component {
    render() {
        let display = this.props.state.Menu.panel === 'Settings' ? 'visible' : 'hidden'

        return (
            <div className={ "Settings "+ display }>

            </div>
        );
    }
}

export default SettingsComponent;
