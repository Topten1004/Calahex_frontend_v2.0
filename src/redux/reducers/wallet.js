import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    // Accounts Overview and Transfer Page
    walletAccountInfo : null,
    wholeCryptoBalance : null,

    // Exchange Wallet Page
    exchangeWalletAccountInfo : null,

    // Exchange Deposit Page
    exchangeDepositAccountInfo : null,
    exchangeWithdrawAccountInfo : null,

    // Exchange Deposit and Withdraw Page
    exchangeDepositHistory : null,
    exchangeWithdrawHistory : null,

    exchangePaymentInfo : null,

}

export default (state=INITIAL_STATE, action) => {
    switch(action.type){
        case ActionTypes.WalletAccountInfo : 
            return ({
                ...state,
                walletAccountInfo : action.payload
            }) 
        case ActionTypes.WholeCryptoBalance : 
            return ({
                ...state,
                wholeCryptoBalance : action.payload
            })
        case ActionTypes.ExchangeWalletAccountInfo : 
            return({
                ...state,
                exchangeWalletAccountInfo : action.payload
            })
        case ActionTypes.ExchangeDepositAccountInfo :
            return ({
                ...state,
                exchangeDepositAccountInfo : action.payload
            })
        case ActionTypes.ExchangeWithdrawAccountInfo :
            return ({
                ...state,
                exchangeWithdrawAccountInfo : action.payload
            })
        case ActionTypes.CreatePayment : 
            return ({
                ...state,
                exchangePaymentInfo : action.payload
            })
        case ActionTypes.ExchangeDepositHistory :
            return ({
                ...state,
                exchangeDepositHistory : action.payload
            })
        case ActionTypes.ExchangeWithdrawHistory : 
            return ({
                ...state,
                exchangeWithdrawHistory : action.payload
            })
        case ActionTypes.CryptoConvert:
        case ActionTypes.CryptoConvertError:
        case ActionTypes.TransferCrypto : 
        case ActionTypes.TransferCryptoError :
        case ActionTypes.WalletAccountInfoError : 
        case ActionTypes.WholeCryptoBalanceError :
        case ActionTypes.ExchangeWalletAccountInfoError :
        case ActionTypes.ExchangeDepositAccountInfoError :
        case ActionTypes.ExchangeWithdrawAccountInfoError :
        case ActionTypes.CloseExchangeDepositHistory :
        case ActionTypes.CloseExchangeDepositHistoryError :
        case ActionTypes.ClearExchangePayHistory :
        case ActionTypes.ClearExchangePayHistoryError :
        default :
            return state ;
    }
}