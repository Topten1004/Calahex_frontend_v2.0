import axios from 'axios' ;
import ActionTypes from './actionTypes';
import { getCookie, authorization, errorHandler } from '../../utils/helper';
import * as config from '../../static/constants' ;

// This action's result is used in Accounts Overview page and is called when Wallet Page is mounted.
export const WalletAccountInfo = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/walletAccountInfo`, {} , header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.WalletAccountInfo,
                payload : res.data
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.WalletAccountInfoError
        })
    }
}

// This action's result is used in Transfer Balances page and is called when Wallet Page is mounted.
export const WholeCryptoBalance = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/wholeCryptoBalance`, {} , header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.WholeCryptoBalance,
                payload : res.data.wholeCryptoBalance
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.WholeCryptoBalanceError
        })
    }
}

export const TransferCrypto = (fromAccount, toAccount, transferAmount, transferCoin) => async dispatch => {
    try {

        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/transferCrypto`, {
            fromAccount : fromAccount,
            toAccount : toAccount,
            transferAmount : transferAmount,
            transferCoin : transferCoin
        }, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.TransferCrypto
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.TransferCryptoError
        })
    }
}

export const CryptoConvert = (crypto_id, pair_id, convert_amount) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/convertCrypto`, {
            crypto_id : crypto_id,
            pair_id : pair_id,
            convert_amount : convert_amount
        }, header) ;

        if(res.status === 200) {
            console.log(res.data) ;
            return dispatch({
                type : ActionTypes.CryptoConvert
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.CryptoConvertError
        })
    }
}

// This action's result is used in Exchange Wallet Page and is called when Exchange Wallet Page is mounted.
export const ExchangeWalletAccountInfo = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeWalletAccountInfo`, {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.ExchangeWalletAccountInfo,
                payload : res.data.exchangeWalletAccountInfo
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.ExchangeWalletAccountInfoError
        })
    }
}

// This action's result is used in Exchange Deposit Page and is called when Exchange Deposit Page is mounted.
export const ExchangeDepositAccountInfo = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeDepositAccountInfo` , {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.ExchangeDepositAccountInfo,
                payload : res.data.exchangeDepositAccountInfo
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ExchangeDepositAccountInfoError
        })
    }
}

// This action's result is used in Exchange Withdraw Page and is called when Exchange Withdraw page is mounted.
export const ExchangeWithdrawAccountInfo = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeWithdrawAccountInfo` , {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.ExchangeWithdrawAccountInfo,
                payload : res.data.exchangeWithdrawAccountInfo
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ExchangeWithdrawAccountInfoError
        })
    }
}

export const GetLimitAmount = (crypto) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/getLimitAmount` , {
            crypto : crypto   
        }, header) ;

        if(res.status === 200) {
            return res.data.limitAmount ;
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}
export const CreatePayment = (crypto, amount, type, reference) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/createPayment`, {
            crypto : crypto,
            amount : amount,
            type : type,
            reference : reference
        }, header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.CreatePayment,
                payload : res.data.paymentInfo
            }) ;
        }
    } catch(err){
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.CreatePaymentError,
        })
    }
}
export const ClearExchangePayHistory = (id) => async dispatch => {
    try {
        const header = authorization() ;

        const res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/clearExchangePayHistory`, {
            pay_order_id : id
        }, header) ;

        if(res.status === 200) {
            dispatch({
                type : ActionTypes.ClearExchangePayHistory
            });

            return true ;
        }

        return false ;
    } catch(err) {
        console.log(errorHandler(err)) ;

        dispatch({
            type : ActionTypes.ClearExchangePayHistoryError
        }) ;

        return false ;
    }
}
export const CloseExchangeDepositHistory = (id) => async dispatch => {
    try {
        const header = authorization() ;

        const res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/closeExchangeDepositHistory`, {
            pay_order_id : id
        }, header) ;

        if(res.status === 200) {
            dispatch({
                type : ActionTypes.CloseExchangeDepositHistory
            });

            return true ;
        }

        return false ;
    } catch(err) {
        console.log(errorHandler(err)) ;

        dispatch({
            type : ActionTypes.CloseExchangeDepositHistoryError
        }) ;

        return false ;
    }
}

export const ExchangeDepositHistory = () => async dispatch => {
    try {
        const header = authorization() ;
        
        const res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeDepositHistory`, {}, header);
        
        dispatch({
            type: ActionTypes.ExchangeDepositHistory,
            payload: res.data.exchangeDepositHistory
        })

        return res.data.isPending ;
    } catch (err) {
        console.log(err);

        return dispatch({
            type : ActionTypes.ExchangeDepositHistoryError,
        })
    }
}
export const ExchangeWithdrawHistory = () => async dispatch => {
    try {
        const header = authorization() ;

        const res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeWithdrawHistory`, {} , header) ;

        dispatch({
            type : ActionTypes.ExchangeWithdrawHistory,
            payload : res.data.exchangeWithdrawHistory
        }) ;

        return res.data.isPending ;
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ExchangeWithdrawHistoryError
        })
    }
}
export const ExchangeFiatDeposit = (currency, amount) => async dispatch => {
    try {
        const header = authorization() ;

        const res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/fiatDeposit` ,{
            unit : currency,
            amount : amount
        }, header) ;

        if(res.status === 200) {
            window.location.href = res.data.invoice_url ;
        }

    } catch(err) {
        console.log(err) ;
    }
}

export const ExchangeCryptoWithdraw = (crypto_id, withdrawAmount, toAccount) => async dispatch => {
    try {

        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}wallet/exchangeCryptoWithdraw`, {
            crypto_id : crypto_id,
            toAccount : toAccount,
            withdrawAmount : withdrawAmount
        }, header);

        if(res.status === 200){

        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}