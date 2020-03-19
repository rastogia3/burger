import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuilderReducer from './store/reducer/burgerBuilder';
import orderReducer from './store/reducer/order';
import thunk from 'redux-thunk';
import authReducer from './store/reducer/authReducer';
import profileReducer from "./store/reducer/profile"
import createSagaMiddleware from "redux-saga"
import { watchAuth, watchBurgerBuilder, watchBurgerPurchase } from "./store/sagas/index"

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducers = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    orderReducer: orderReducer,
    auth: authReducer,
    profile: profileReducer
})

const burgerStore = createStore(rootReducers, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth)
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchBurgerPurchase);

const app = (
    <Provider store={burgerStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
