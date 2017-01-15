import React, { Component } from 'react';
import SettingsContainer from '../containers/SettingsContainer'
import ServersContainer from '../containers/ServersContainer'
import ProfileContainer from '../containers/ProfileContainer'
import logo from './assets/logo.svg';
import './stylesheet/App.sass';

class App extends Component {
    render() {
        return (
            <div className="Menu">
                <SettingsContainer />
                <ServersContainer />
                <ProfileContainer />  
            </div>
        );
    }
}

export default App;
