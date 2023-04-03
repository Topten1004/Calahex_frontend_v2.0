import React from 'react' ;
import renderer from 'react-test-renderer';

import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, CssBaseline} from '@mui/material';
import theme from '../../utils/theme' ;

import { Provider } from 'react-redux';
import store from '../../redux' ;

import { mount, shallow, render } from 'enzyme' ;
import toJson from 'enzyme-to-json';

import CryptoExchange from '.';

import configureStore from 'redux-mock-store' ;
import thunk from 'redux-thunk';
// Actions to be tested
import { CurrentCrypto } from '../../redux/actions/crypto' ;
import CryptoReducer from '../../redux/reducers/crypto';
import ActionTypes from '../../redux/actions/actionTypes';

const middlewares = [thunk] ;
const mockStore = configureStore(middlewares) ;
const testStore = mockStore({
    currentCrypto : null,
}) ;

describe("Test CryptoExchange", () => {
    // test redux
    // 1. We have to clear all actions from our mock store before running each test.
    beforeEach(() => {
        testStore.clearActions() ;
    })

    // 2. test actions and reducer
    test('Dispatches the correct action and payload(CurrentCrypto)', () => {
        const expectedActions = [
            {
                type : ActionTypes.CurrentCrypto,
                payload : {
                    "name": "ETH_USDT",
                    "crypto": {
                        "id": "622b6880cf97b25357f3e39b",
                        "name": "Ethereum",
                        "symbol": "ETH",
                        "is_deposit": true
                    },
                    "pair": {
                        "id": "622b6aefcf97b25357f3e3a3",
                        "symbol": "USDT",
                        "is_deposit": true
                    },
                    "transaction_fee": 0.25,
                    "price": "2559.67",
                    "high": 0,
                    "low": 0,
                    "baseVolume": 0,
                    "quoteVolume": 0,
                    "percent": 100
                }
            }
        ] ;

        const expectedState = {
            currentCrypto : {
                "name": "ETH_USDT",
                "crypto": {
                    "id": "622b6880cf97b25357f3e39b",
                    "name": "Ethereum",
                    "symbol": "ETH",
                    "is_deposit": true
                },
                "pair": {
                    "id": "622b6aefcf97b25357f3e3a3",
                    "symbol": "USDT",
                    "is_deposit": true
                },
                "transaction_fee": 0.25,
                "price": "2559.67",
                "high": 0,
                "low": 0,
                "baseVolume": 0,
                "quoteVolume": 0,
                "percent": 100
            },
            "cryptoBalance": null,
            "cryptoDecimal": 8,
            "cryptoFund": null,
            "currentCrypto": null,
            "isLoading": false,
            "pairBalance": null,
            "pairFund": null,
            "userOrderList": null,
        }

        testStore.dispatch(CurrentCrypto({
            "name": "ETH_USDT",
            "crypto": {
                "id": "622b6880cf97b25357f3e39b",
                "name": "Ethereum",
                "symbol": "ETH",
                "is_deposit": true
            },
            "pair": {
                "id": "622b6aefcf97b25357f3e3a3",
                "symbol": "USDT",
                "is_deposit": true
            },
            "transaction_fee": 0.25,
            "price": "2559.67",
            "high": 0,
            "low": 0,
            "baseVolume": 0,
            "quoteVolume": 0,
            "percent": 100
        })).then(() => {
            console.log(testStore.getActions()) ;
            console.log(testStore.getState());
            expect(testStore.getActions()).toEqual(expectedActions) ;
            expect(CryptoReducer(undefined, testStore.getActions())).toEqual(expectedState);
        }) ;
    }) ;
})
