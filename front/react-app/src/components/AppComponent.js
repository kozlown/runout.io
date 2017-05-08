import React, { Component } from 'react';
import MenuContainer from '../containers/MenuContainer'
import GameContainer from '../containers/GameContainer'

class App extends Component {
    render() {
        return (
            <div className="App">
                <MenuContainer />
                <GameContainer />
            </div>
        );
    }
}

export default App;
