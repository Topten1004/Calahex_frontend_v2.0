import  { combineReducers } from 'redux' ;

import authReducer from './auth' ;
import cryptoReducer from './crypto' ;
import walletReducer from './wallet' ;
import streamReducer from './stream' ;

export default combineReducers({
    auth : authReducer,
    crypto : cryptoReducer,
    wallet : walletReducer,
    stream : streamReducer
});