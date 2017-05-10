import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import debug from 'debug'

import allReducers from './reducers'
import AppContainer from './containers/AppContainer'
import config from './config'

// Custom Style
import './stylesheet/index.sass'

// console customization with debugging purpose
console.info = debug('info')
console.game = debug('server:game')
console.main = debug('server:main')

// should we debug ?
localStorage.debug = config.debug


const store = createStore(allReducers)

ReactDOM.render(
    <Provider store={ store }>

        <AppContainer />

    </Provider>,

    document.getElementById('root')
);
