import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


export default combineReducers({
    form,
    routing: routerReducer,

});