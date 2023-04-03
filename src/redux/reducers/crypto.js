
import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE ={
    isLoading : false ,
    
    cryptoDecimal : 8,
    currentCrypto : null,

    cryptoBalance : null,
    pairBalance : null,

    userOrderList : null,

    cryptoFund : null,
    pairFund : null,
}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case ActionTypes.CurrentCrypto :
            return ({
                ...state,
                currentCrypto : action.payload
            })
        case ActionTypes.CryptoDecimal : 
            return ({
                ...state,
                cryptoDecimal : action.payload
            })
        case ActionTypes.UpdateCryptoBalance : 
            return ({
                ...state,
                cryptoBalance : action.payload
            })
        case ActionTypes.UpdatePairBalance : 
            return ({
                ...state,
                pairBalance : action.payload
            })
        case ActionTypes.UserOrderList :
            return ({
                ...state,
                userOrderList : action.payload.userOrderList,
                cryptoFund : action.payload.cryptoFund,
                pairFund : action.payload.pairFund
            })
        case ActionTypes.CryptoExchange : 
        case ActionTypes.ExchangeCryptoBalanceError :
        default :
            return state ;
    }
}