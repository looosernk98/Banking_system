import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import authReducer from '../reducers/auth';
import thunk from 'redux-thunk';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;

const store = createStore(

               combineReducers({
                 auth : authReducer,
                }),

               composeEnhancers(applyMiddleware(thunk))

               );

export default store;