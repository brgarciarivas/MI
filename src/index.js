import 'regenerator-runtime/runtime'

import React from 'react';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { createBrowserHistory, createHashHistory } from 'history'

import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';

import App from './components/App';


import reducers from './reducers/index';


// Stylesheets
import './styles/index.less';

// Redux Store setup
const logger = createLogger({
    level: 'info',
    collapsed: true
});
const sagaMiddleware = createSagaMiddleware()


// Create an enhanced history that syncs navigation events with the store
const isProduction = process.env.NODE_ENV === 'production';

//const envHistory = isProduction ? createBrowserHistory() : createHashHistory();
const envHistory = createBrowserHistory();

const middleware = [thunk, routerMiddleware(envHistory), logger];


const store = createStore(
    connectRouter(envHistory)(reducers),
    compose(
        applyMiddleware(...middleware),
    )
)

//const history = syncHistoryWithStore(envHistory, store);

const appMount = document.getElementById('app-mount-point');

render(
    <Provider store={store}>    
        <ConnectedRouter history={envHistory}>
            <App/>
        </ConnectedRouter>
    </Provider>
    , appMount
);