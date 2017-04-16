import React, { Component } from 'react';
import SettingsContainer from '../containers/SettingsContainer'
import ServersContainer from '../containers/ServersContainer'
import ProfileContainer from '../containers/ProfileContainer'

class Menu extends Component {
    render() {
        let panel = this.props.state.Menu.panel

        return (
            <div className="Menu">
                <div id="settings_button"
                     className={ "fa fa-sliders" + (panel === 'Settings' ? ' selected' : '') }
                     onClick={ this.props.go_panel('Settings') }>
                    <p>
                        <i className="fa fa-sliders" aria-hidden="true" />
                    </p>
                </div>
                <div className={(panel === 'Profile' ? ' selected' : '')}
                     id="profile_button"
                     onClick={ this.props.go_panel('Profile') }>
                    <p>
                        <i className="fa fa-user" aria-hidden="true" />
                    </p>
                </div>
                <div id="servers_button" className="selected">
                    <p>
                        <i className="fa fa-server" aria-hidden="true" />
                    </p>
                </div>
                <div className="core">
                    <SettingsContainer />
                    <ProfileContainer />
                    <ServersContainer />
                </div>
            </div>
        );
    }
}

export default Menu;
