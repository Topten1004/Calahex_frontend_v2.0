import React from 'react' ;

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// ___________ redux ________________
import { connect } from 'react-redux' ;
import PropTypes from 'prop-types';
import { CurrentCrypto } from '../../redux/actions/crypto';

import {
    Box ,
    Grid,
    useMediaQuery
} from '@mui/material' ;

// __________ Self Component _____________
import CoinBanner from '../../components/CryptoExchange/CoinBanner' ;
import AuthBtPn from '../../components/Common/AuthBtPn';
import OrderBook from '../../components/CryptoExchange/OrderBook' ;
import TradingView from '../../components/CryptoExchange/TradingView' ;
import Trade from '../../components/CryptoExchange/Trade';
import History from '../../components/CryptoExchange/History';
import Exchange from '../../components/CryptoExchange/Exchange';
import CryptoList from '../../components/CryptoExchange/CryptoList';
import Loading from '../../components/Common/Loading';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.layout.headerHeight ,
        minHeight : 'calc(100vh - 60px)',
    },
    tradingview : {
        
    },
    leftSidebar : {
        position : 'relative !important',
    }
})) ;

const CryptoExchange = (props) => {

    const classes = useStyles() ;

    const match1 = useMediaQuery("(min-width : 1500px)") ;
    const match2 = useMediaQuery("(min-width : 1040px)") ;
    const match3 = useMediaQuery('(min-width : 700px)') ;

    const location = useLocation() ;
    const navigate = useNavigate() ;

    const [ isVisibleCryptoList , setIsVisibleCryptoList ] = useState(false) ;
    const [ selectedOrder, setSelectedOrder ] = useState(null) ;
    const [ cryptoNo, setCryptoNo ] = useState(null) ;

    const {
        isAuthenticated, 
        cryptoPairList,
        CurrentCrypto
    } = props ;

    const handleSelectedOrder = (selectedOrder) => {
        setSelectedOrder(selectedOrder) ;
    }

    const handleCryptoList = () => {
        setIsVisibleCryptoList(!isVisibleCryptoList) ;
    }
    
    const handleCurrentCrypto = (cryptoNo) => {
        setCryptoNo(cryptoNo) ;
        CurrentCrypto(cryptoPairList[cryptoNo]) ;
    } 

    useEffect(() => {
        if(cryptoPairList) {
            if(location.state && location.state.currentCrypto_id) {
                let currentCrypto = Object.entries(cryptoPairList).filter(([id, item]) => item.crypto.id === location.state.currentCrypto_id) ;
                
                handleCurrentCrypto(currentCrypto[0][0]) ;

                navigate(location.pathname , {
                    state : null,
                    replace : true
                });

                return ;
            }
            if(!cryptoNo){
                handleCurrentCrypto(Object.keys(cryptoPairList)[0]) ;
            } else {
                handleCurrentCrypto(cryptoNo) ;
            }
        }
    }, [cryptoPairList]) ;

    return (
        <Box className={classes.root}>
            {
                cryptoPairList ? <>
                    <Grid container>
                        <Grid item xs={12}>
                            <CoinBanner 
                                handleCryptoList={handleCryptoList}
                                isVisibleCryptoList={isVisibleCryptoList}
                            />
                        </Grid>
                    </Grid>
        
                    <Grid container>
                        <Grid item xs={match2 ? 3 : 12} className={classes.leftSidebar}>
                            {
                                !isAuthenticated ? <AuthBtPn /> : <Exchange 
                                    selectedOrder={selectedOrder}
                                />
                            }
                            <CryptoList 
                                isVisibleCryptoList={isVisibleCryptoList}
                                handleCurrentCrypto={handleCurrentCrypto}
                                handleCryptoList={handleCryptoList}
                            />
                        </Grid>
                        <Grid item xs={match2 ? 9 : 12}>
                            <Grid container>
                                <Grid item xs={match1 ? 3.5 : match3 ? 6 : 12}>
                                    <OrderBook 
                                        handleSelectedOrder={handleSelectedOrder}
                                    />
                                </Grid>
                                <Grid item xs={match1 ? 8.5 : match3 ? 6 : 12}>
                                    <Grid container>
                                        <Grid item xs={match1 ? 7 : 12}>
                                            <TradingView />
                                        </Grid>
                                        <Grid item xs={match1 ? 5 : 12}>
                                            <Trade />
                                        </Grid>
                                    </Grid>
                                    {
                                        match1 && <Grid container>
                                                    <Grid item xs={12}>
                                                        <History />
                                                    </Grid>
                                                </Grid>
                                    }
                                </Grid>
                                {
                                    !match1 && <Grid container>
                                        <Grid item xs={12}>
                                            <History />
                                        </Grid>
                                    </Grid>
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                : <Loading 
                    height={'calc(100vh - 60px)'}
                />
            }
        </Box>
    )
}

CryptoExchange.propTypes = {
    CurrentCrypto : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    cryptoPairList : state.stream.cryptoPairList
})
const mapDispatchToProps = {
    CurrentCrypto
}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoExchange) ;