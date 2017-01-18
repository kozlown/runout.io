import React, { Component } from 'react';
import SettingsContainer from '../containers/SettingsContainer'
import ServersContainer from '../containers/ServersContainer'
import ProfileContainer from '../containers/ProfileContainer'

class Menu extends Component {


    render() {
        let panel = this.props.state.Menu.panel

        return (
            <div className="Menu">
                <div id="settings_button" onClick={ this.props.go_panel('Settings') }>
                    <p>
                        <i className={ "fa fa-sliders" + (panel === 'Settings' ? ' selected' : '') } aria-hidden="true"></i>
                    </p>
                </div>
                <div id="profile_button" onClick={ this.props.go_panel('Profile') }>
                    <p>
                        <i className={ "fa fa-user" + (panel === 'Profile' ? ' selected' : '') } aria-hidden="true"></i>
                    </p>
                </div>
                <div id="servers_button">
                    <p>
                        <i className="fa fa-server selected" aria-hidden="true"></i>
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
