import ActionTypes from "./actionTypes"

export const AllNotifications = (notificationList) => async dispatch => {
    return dispatch({
        type : ActionTypes.AllNotifications,
        payload : notificationList,
    }) ;
}

export const CryptoPairList = (cryptoPairList) => async dispatch => {
    return dispatch({
        type : ActionTypes.CryptoPairList,
        payload : cryptoPairList
    }) ;
}

export const CryptoOrderList = (cryptoOrderList) => async dispatch => {
    return dispatch({
        type : ActionTypes.CryptoOrderList,
        payload : cryptoOrderList
    }) ;
}

export const MarketTradeList = (marketTradeList) => async dispatch => {
    return dispatch({
        type : ActionTypes.MarketTradeList,
        payload : marketTradeList
    }) ;
}