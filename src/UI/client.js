import React from 'react';
import { render } from 'react-dom';
import DiabeticsChart from './components/diabetics-chart';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import ObservationObject from './reducer/glucose-results-reducer';
import {fetchObservations} from './components/glucose-results/glucose-results-action';
import {Provider} from 'react-redux';
const logger = createLogger();

const state = window.__PRELOADED_STATE__;
console.log('preloadedState = ' + state);
const reducer = combineReducers({ state, ObservationObject });
const middleware = applyMiddleware(thunk, logger);


const store = createStore(reducer, middleware);

const dom = () => {
    render(
        <Provider store = {store}>
            <DiabeticsChart/>
        </Provider>, document.getElementById('app')
    );
};

dom();
store.subscribe(dom);

store.dispatch(fetchObservations());