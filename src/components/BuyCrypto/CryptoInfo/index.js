

import React, { useRef } from 'react' ;


import { useState, useEffect } from 'react' ;
import { useMeasure } from 'react-use';

import TradingViewWidget from 'react-tradingview-widget' ;

import Info from './Info';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "50px",
        marginLeft : "15px"
    },
    cryptoInfo : {
        display : "flex" ,
        flexDirection : "row" ,
        
        alignItems : "center" ,

        height : "32px"
    },
    crypto : {
        paddingLeft : "20px",
        fontWeight : 700,
        fontSize : "30px",

        color : theme.palette.primary.main
    },
    pair : {
        fontWeight : 700,
        fontSize : "20px",
        color : "gray"
    },
    tradingview : {
        height : "420px !important",
        border : "1px solid lightgray",
    }
}))

const CryptoInfo = (props) => {
    
    const classes = useStyles() ;

    const match1 = useMediaQuery("(min-width : 400px)");

    const tradingViewCtrl = useRef() ;

    const [ setTradingViewCtrl, {width, height} ] = useMeasure() ;

    const [crypto , setCrypto] = useState("BTC/USDT") ;

    const {
        cryptoPairList
    } = props ;

    const handleCrypto = (cryptoInfo) => {
        if(cryptoInfo) setCrypto(`${cryptoInfo.crypto.symbol}/${cryptoInfo.pair.symbol}`) ;
    }

    useEffect(() => {
        setTradingViewCtrl(tradingViewCtrl.current) ;
    }, []) ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <Box className={classes.cryptoInfo} >
                        <Box component={'span'} className={classes.crypto}>
                            {crypto.split('/')[0]}
                        </Box>
                        <Box component={'span'} className={classes.pair}>
                            &nbsp;{`/ ${crypto.split('/')[1]}`}
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box className={classes.tradingview} ref={tradingViewCtrl}>
                        <TradingViewWidget
                            hide_legend
                            allow_symbol_change={false}
                            symbol={'POLONIEX:' + (crypto.split('/')[0]+crypto.split('/')[1])}
                            locale="en"
                            width={width}
                            height={height}
                            theme={'Dark'}
                        />
                    </Box>
                </Grid>
            </Grid>
            
            <Grid container sx={{marginTop : "10px"}} spacing={1}>
                <Grid item xs={match1 ? 4 : 12}>
                    <Info 
                        crypto={cryptoPairList && Object.entries(cryptoPairList).filter(([id, item]) => item.name === 'BTC_USDT')[0]}
                        handleCrypto={handleCrypto}
                    />
                </Grid>
                <Grid item xs={match1 ? 4 : 12}>
                    <Info 
                        crypto={cryptoPairList && Object.entries(cryptoPairList).filter(([id, item]) => item.name === 'ETH_USDT')[0]}
                        handleCrypto={handleCrypto}
                    />
                </Grid>
                <Grid item xs={match1 ? 4 : 12}>
                    <Info 
                        crypto={cryptoPairList && Object.entries(cryptoPairList).filter(([id, item]) => item.name === 'ETH_BTC')[0]}
                        handleCrypto={handleCrypto}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CryptoInfo ;