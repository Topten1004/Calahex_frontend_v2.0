
import axios from 'axios';
import * as config from '../../static/constants' ;
import ActionTypes from './actionTypes';

import { authorization, errorHandler } from '../../utils/helper';

export const CryptoBalance = ( symbol, crypto_or_pair ) => async dispatch => {
    try {

        const header  = authorization() ;
        
        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/cryptoBalance` , {
            symbol : symbol
        }, header);

        if(res.status === 200){
            if(crypto_or_pair === 'crypto') {
                return dispatch({
                    type : ActionTypes.UpdateCryptoBalance,
                    payload : res.data.available
                })
            } else if(crypto_or_pair === 'pair') {
                return dispatch({
                    type : ActionTypes.UpdatePairBalance,
                    payload : res.data.available
                })
            }
        }

        return ;

    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.ExchangeCryptoBalanceError ,
        })
    }
}

export const CryptoExchangeByMarket = (crypto_id, crypto_amount, pair_id, pair_amount, method) => async dispatch => {
    try {
        const header = authorization() ;
        
        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/exchangeByMarket`, {
            crypto_id : crypto_id,
            crypto_amount : crypto_amount,
            pair_id : pair_id,
            pair_amount : pair_amount,
            method : method
        }, header) ;

        if(res.status === 200) {
            console.log(res.data) ;
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}

export const CryptoExchangeByLimit = (price, crypto_id, crypto_amount, pair_id, pair_amount, method) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/exchangeByLimit`, {
            price : price,
            crypto_id : crypto_id,
            crypto_amount : crypto_amount,
            pair_id : pair_id,
            pair_amount : pair_amount,
            method : method
        }, header) ;
        
        if(res.status === 200) {
            console.log(res.data) ;
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}

export const CryptoExchangeByNormal = (orderer_id, crypto_id, crypto_amount, pair_id, pair_amount, method) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/exchangeByNormal`, {
            orderer_id : orderer_id,
            crypto_id: crypto_id,
            crypto_amount : crypto_amount,
            pair_id : pair_id,
            pair_amount : pair_amount,
            method : method
        }, header) ;

        if(res.status === 200) {
            console.log(res.data) ;
        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}

export const UserOrderList = ( crypto_id, pair_id) => async dispatch => {
    try {

        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/userOrderList` , {
            crypto_id : crypto_id,
            pair_id : pair_id
        }, header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.UserOrderList,
                payload : {
                    userOrderList : res.data.userOrderList,
                    cryptoFund : res.data.crypto_fund,
                    pairFund : res.data.pair_fund
                }
            })
        }

    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.UserOrderListError
        })
    }
}

export const UserOrderCancel = (id) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/userOrderCancel` , {
            id : id
        }, header) ;

        if(res.status === 200) {

        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}

export const UserOrderClear = (id) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}crypto/userOrderClear` , {
            id : id
        }, header) ;

        if(res.status === 200) {

        }
    } catch(err) {
        console.log(errorHandler(err)) ;
    }
}

export const CryptoDecimal = (decimal) => async dispatch => {
    return dispatch({
        type : ActionTypes.CryptoDecimal,
        payload : decimal
    })
}

export const CurrentCrypto = (currentCrypto) => async dispatch => {
    return dispatch({
        type : ActionTypes.CurrentCrypto,
        payload : currentCrypto
    })                                                                                                           
}