import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import burgerReducer from './burger/burgerReducer';
import authReducer from './auth/authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  burger: burgerReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;