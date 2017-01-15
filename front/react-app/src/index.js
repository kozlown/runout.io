import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import allReducers  from './reducers'
import AppContainer from './containers/AppContainer';
import './stylesheet/index.sass';

const store = createStore(allReducers)

ReactDOM.render(
    <Provider store={ store }>

        <AppContainer />

    <Provider>,

    document.getElementById('root')
);
