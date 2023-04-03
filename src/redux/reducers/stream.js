import ActionTypes from "../actions/actionTypes"

const INITIAL_STATE = {
    allNotifications : null,
    cryptoOrderList : null,
    cryptoPairList : null,
    marketTradeList : null,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case ActionTypes.AllNotifications : 
            return ({
                ...state,
                allNotifications : action.payload
            }) ;
        case ActionTypes.CryptoPairList : 
            return ({
                ...state,
                cryptoPairList : action.payload
            });
        case ActionTypes.CryptoOrderList : 
            return ({
                ...state,
                cryptoOrderList : action.payload
            }) ;
        case ActionTypes.MarketTradeList :
            return ({
                ...state,
                marketTradeList : action.payload
            }) ;
        default :
            return state ;
    }
}