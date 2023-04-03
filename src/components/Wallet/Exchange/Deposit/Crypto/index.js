
import React, { useEffect } from 'react' ;

import { useState } from 'react' ;
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { WholeCryptoBalance, WalletAccountInfo, ExchangeDepositAccountInfo, ExchangeDepositHistory } from '../../../../../redux/actions/wallet' ;

import swal from 'sweetalert';

import BalanceCard from '../../BalanceCard' ;
import DepositCard from './DepositCard' ;
import Tips from './Tips';
import CryptoHistory from './CryptoHistory' ;
import Loading from '../../../../Common/Loading';

import {
    Box, 
    FormControl,
    MenuItem,
    Select,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 225px)" ,
        padding : "25px",

        "& svg" : {
            color : 'white'
        }
    },
    coin : {
        color : theme.palette.common.label
    }
}))

let exchangeDepositHistoryTimer ;

const Crypto = (props) => {

    const classes = useStyles() ;

    const match1 = useMediaQuery('(min-width : 1030px)') ;
    const match2 = useMediaQuery('(min-width : 470px)') ;

    const location = useLocation() ;
    
    const {
        exchangeDepositAccountInfo,
        WholeCryptoBalance, WalletAccountInfo,
        ExchangeDepositAccountInfo, ExchangeDepositHistory
    } = props ;

    const [ exchangeDepositCoin, setExchangeDepositCoin ] = useState(null) ;

    const handleExchangeDepositCoin = (coin) => {
        setExchangeDepositCoin(coin) ;
    }

    const handleExchangeDepositHistoryTimer = () => {
        
        clearInterval(exchangeDepositHistoryTimer) ;

        exchangeDepositHistoryTimer = setInterval(async() => {
            if(!await ExchangeDepositHistory()) {
                clearInterval(exchangeDepositHistoryTimer) ;
                await ExchangeDepositAccountInfo() ;
                await WholeCryptoBalance() ;
                await WalletAccountInfo() ;
            }
        }, 15000) ;
    }

    useEffect(() => {
        if(exchangeDepositAccountInfo) {
            if(!Object.keys(exchangeDepositAccountInfo).length) {
                return swal({
                    title : 'Warning',
                    text : 'Deposit Coins Do Not Exist.',
                    icon : 'warning',
                    buttons : false,
                    timer : 5000
                }) ;
            }
            if(location.state && location.state.exchangeDepositCoin) 
                handleExchangeDepositCoin( location.state.exchangeDepositCoin ) ;
            else handleExchangeDepositCoin( Object.keys(exchangeDepositAccountInfo)[0] ) ;
        }
    },[exchangeDepositAccountInfo]) ;

    useEffect(() => {
        ExchangeDepositAccountInfo() ;
        ExchangeDepositHistory() ;
        handleExchangeDepositHistoryTimer() ;

        return () => {
            clearInterval(exchangeDepositHistoryTimer) ;
        }
    }, []) ;

    return (
        <Box  className={classes.root}>
            {
                ( exchangeDepositAccountInfo && exchangeDepositCoin ) ? <>
                                            <Box className={classes.coin}>
                                                Coin
                                            </Box>
                                            <Box >
                                                <FormControl>
                                                    <Select
                                                        size='small'
                                                        value={exchangeDepositCoin}
                                                        onChange={(e) => handleExchangeDepositCoin(e.target.value)}
                                                    >
                                                        {
                                                            Object.entries(exchangeDepositAccountInfo).map(([id, item]) => {
                                                                return (
                                                                    <MenuItem key={id} value={item.crypto_id}>
                                                                        {item.symbol}
                                                                    </MenuItem>
                                                                )
                                                            })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>

                                            <Grid container sx={{marginTop:'15px'}} spacing={1}>
                                                <Grid item xs={match1 ? 7 : 12} >
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={match2 ? 4 : 12}>
                                                            <BalanceCard 
                                                                label='Total balance:'
                                                                bgColor='#28472c'
                                                                balance={Number(exchangeDepositAccountInfo[exchangeDepositCoin].total).toFixed(4)}
                                                                symbol={exchangeDepositAccountInfo[exchangeDepositCoin].symbol}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={match2 ? 4 : 12}>
                                                            <BalanceCard 
                                                                label='Available balance:'
                                                                bgColor='#224452'
                                                                balance={Number(exchangeDepositAccountInfo[exchangeDepositCoin].available).toFixed(4)}
                                                                symbol={exchangeDepositAccountInfo[exchangeDepositCoin].symbol}
                                                            />
                                                        </Grid>
                                                        <Grid item xs={match2 ? 4 : 12}>
                                                            <BalanceCard 
                                                                label='In order:'
                                                                bgColor='#483415'
                                                                balance={Number(exchangeDepositAccountInfo[exchangeDepositCoin].order).toFixed(4)}
                                                                symbol={exchangeDepositAccountInfo[exchangeDepositCoin].symbol}
                                                            />                      
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container>
                                                        <Tips />
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={match1 ? 5 : 12}>
                                                    <DepositCard 
                                                        depositCoin={exchangeDepositAccountInfo[exchangeDepositCoin]}
                                                        handleExchangeDepositHistoryTimer={handleExchangeDepositHistoryTimer}
                                                    />
                                                </Grid>
                                            </Grid>

                                            <Grid container>
                                                <Grid item xs={12}>
                                                    <CryptoHistory />
                                                </Grid>
                                            </Grid> 
                                        </> : <Loading 
                                            height={'100%'}
                                        />
            }
            
        </Box>
    )
}

Crypto.propTypes = {
    ExchangeDepositAccountInfo : PropTypes.func.isRequired,
    ExchangeDepositHistory : PropTypes.func.isRequired,
    WholeCryptoBalance : PropTypes.func.isRequired,
    WalletAccountInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    exchangeDepositAccountInfo : state.wallet.exchangeDepositAccountInfo
})
const mapDispatchToProps = {
    ExchangeDepositAccountInfo,
    ExchangeDepositHistory,
    WholeCryptoBalance,
    WalletAccountInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(Crypto) ;