import React, { useEffect, useState } from 'react' ;
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CryptoBalance, UserOrderList, CryptoExchangeByMarket, CryptoExchangeByLimit, CryptoExchangeByNormal } from '../../../redux/actions/crypto';

import Loading from '../../Common/Loading';
import swal from 'sweetalert' ;

import {
    Box,
    Grid,
    Button,
    FormControl,
    Select,
    TextField,
    MenuItem,
    InputAdornment,
    InputLabel,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        padding :"20px",
        height : 'calc(100vh - 115px)',

        ['@media (max-width : 1500px)'] : {
            height : 'calc(150vh - 190px)'
        },
        ['@media (max-width : 1040px)'] : {
            height : 'calc(50vh - 105px)'
        },

        overflow : 'hidden' ,
        overflowY : 'scroll',

        "& .MuiButtonBase-root" :{
            textTransform : 'capitalize',
            minWidth : '50px',
            borderRadius : '15px',
            color : 'black !important'
        },
        "& .MuiGrid-container" : {
            marginBottom : "20px",
            color : theme.palette.common.label
        },
    },
    btGp : {
        marginTop : '40px !important',
        "& .MuiButtonBase-root" : {
            textTransform : 'uppercase',
            color : 'white !important',
        }
    },
}))

const Exchange = (props) => {
    
    const classes = useStyles() ;

    const match1 = useMediaQuery('(min-width : 1400px)') ;

    const [ exchangeFocus, setExchangeFocus ] = useState(null) ;

    const [ exchangeMethod, setExchangeMethod ] = useState("buy") ;
    const [ exchangeType, setExchangeType ] = useState('market') ;

    const [ exchangePrice, setExchangePrice ] = useState(0) ;
    const [ exchangeAmount, setExchangeAmount ] = useState(0) ;

    const [ exchangeTotal, setExchangeTotal] = useState(0) ;

    const [ exchangeCryptoBalance, setExchangeCryptoBalance ] = useState(null) ;
    const [ exchangePairBalance, setExchangePairBalance ] = useState(null) ;
    
    const navigate = useNavigate() ;

    const {
        cryptoBalance, pairBalance,currentCrypto,
        selectedOrder, 
        CryptoBalance, UserOrderList,
        isAuthenticated,
        CryptoExchangeByMarket,
        CryptoExchangeByLimit,
        CryptoExchangeByNormal
    } = props ;

    const handleExchangeCryptoBalance = (cryptoBalance) => {
        setExchangeCryptoBalance(cryptoBalance) ;
    }

    const handleExchangePairBalance = (pairBalance) => {
        setExchangePairBalance(pairBalance) ;
    }

    const handleExchangeMethod = (method) => {
        setExchangeMethod(method) ;
    }

    const handleExchangeType = (type) => {
        setExchangeType(type) ;
    }

    const handleExchangePrice = (price) => {
        setExchangePrice(Number(price)) ;
    }

    const handleExchangeAmount = (amount) => {
        if(exchangeMethod === 'sell') {
            if(cryptoBalance < amount) {
                return swal({
                    title : 'Warning',
                    text : 'Overflow pair amount.',
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                }) ;
            }
        }
        setExchangeAmount(Number(amount)) ;
    }

    const handleExchangePercent = (percent) => {
        percent = Number(percent) ;

        if(exchangeMethod === "buy") {
            handleExchangeTotal(pairBalance * percent) ;
            if(exchangePrice !== 0) handleExchangeAmount(pairBalance * percent / exchangePrice) ;

        }
        if(exchangeMethod === "sell"){
            handleExchangeAmount(cryptoBalance * percent) ;
            handleExchangeTotal(cryptoBalance * percent * exchangePrice) ;
        }
    }

    const handleExchangeTotal = (value) => {
        if(exchangeMethod === 'buy') {
            if(pairBalance < value) {
                return swal({
                    title : 'Warning',
                    text : 'Overflow crypto amount.',
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                }) ;
            }
        }
        setExchangeTotal(Number(value)) ;
    }   

    const handleExchangeFocus = ( focus ) => {
        setExchangeFocus(focus) ;
    }

    const handleCryptoExchange = async () => {

        if(exchangeTotal === 0) {
            return swal({
                title : "Warning",
                text : "Amount is Empty.",
                icon : 'warning',
                buttons : false,
                timer : 3000
            })
        }

        if(isNaN(exchangePrice) || isNaN(exchangeTotal) || isNaN(exchangeAmount)){
            return swal({
                title : "Warning",
                text : "All fields must be number.",
                icon : "warning",
                buttons : false,
                timer : 3000
            })
        }

        if(exchangeTotal === "" || exchangePrice === "" || exchangeAmount === "") {
            return swal({
                title : "Warning",
                text : "All fields must be number",
                icon : "warning",
                buttons : false,
                timer : 3000
            })
        } 

        if(exchangeTotal <= 0 || exchangePrice <= 0 || exchangeAmount <= 0 ) {
            handleExchangeAmount(0) ;
            handleExchangeTotal(0) ;

            return swal({
                title : "Warning",
                text : "All fields must be positive number",
                icon : "warning",
                buttons : false,
                timer : 3000
            })
        } 

        if( exchangeMethod === "buy" ) {
            if( pairBalance < exchangeTotal ) {
                return swal({
                    title : "Warning",
                    text : "No sufficient funds.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if( currentCrypto.pair.symbol === "USDT" && exchangeTotal < 25){
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 25 USDT.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if(currentCrypto.pair.symbol === "ETH" && exchangeTotal < 0.02) {
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 0.02 ETH.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if(currentCrypto.pair.symbol === "BTC" && exchangeTotal < 0.00010) {
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 0.00010 BTC.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }

            if(exchangeType === 'normal'){
                CryptoExchangeByNormal(selectedOrder.orderer_id, currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, 'buy') ;
            }
            if(exchangeType === 'market'){
                await CryptoExchangeByMarket(currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, exchangeMethod);
            }
            if(exchangeType === 'limit'){
                await CryptoExchangeByLimit(exchangePrice, currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, exchangeMethod) ;
            }
        }

        if( exchangeMethod === "sell" ) {
            if( cryptoBalance < exchangeAmount ) {
                return swal({
                    title : "Warning",
                    text : "No sufficient funds.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if( currentCrypto.pair.symbol === "USDT" && exchangeTotal < 25){
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 25 USDT.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if(currentCrypto.pair.symbol === "ETH" && exchangeTotal < 0.02) {
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 0.02 ETH.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }
            if(currentCrypto.pair.symbol === "BTC" && exchangeTotal < 0.00010) {
                return swal({
                    title : "Warning",
                    text : "Total amount must be at least 0.00010 BTC.",
                    icon : 'warning',
                    buttons : false,
                    timer : 3000
                })
            }

            if(exchangeType === "normal") {
                CryptoExchangeByNormal(selectedOrder.orderer_id, currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, exchangeMethod) ;
            }
            if(exchangeType === 'market') {
                await CryptoExchangeByMarket(currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, exchangeMethod);
            }
            if(exchangeType === "limit") {
                await CryptoExchangeByLimit(exchangePrice, currentCrypto.crypto.id, exchangeAmount, currentCrypto.pair.id, exchangeTotal, exchangeMethod) ;
            }
        }
        handleUpdateBalance() ;
        UserOrderList( currentCrypto.crypto.id, currentCrypto.pair.id ) ;
    }

    const handleUpdateBalance = async () => {
        CryptoBalance(currentCrypto.crypto.symbol, "crypto") ;
        CryptoBalance(currentCrypto.pair.symbol, "pair") ;
    }

    const handleGotoDeposit = () => {
        navigate('/wallet' , {
            state : {
                selectedSideTab : 'exchangeDeposit',
                exchangeDepositCoin : exchangeMethod === 'buy' ? currentCrypto.pair.id : currentCrypto.crypto.id
            }
        })
    }

    const handleGotoTransfer = () => {
        navigate('/wallet' , {
            state : {
                selectedSideTab : 'transfer',
                transferCoin : exchangeMethod === 'buy' ? currentCrypto.pair.id : currentCrypto.crypto.id ,
                fromAccount: 'exchange'
            }
        }) ;
    }

    useEffect(() => {
        if(exchangeType === 'market') {
            if(currentCrypto)   handleExchangePrice(currentCrypto.price) ;
        }
        if(exchangeType === 'limit') {
            handleExchangePrice(currentCrypto.price) ;
            handleExchangeAmount(0) ;
            handleExchangeTotal(0);
        }
        if(exchangeType === 'normal' && exchangeFocus === 'typeCtrl') {
            swal({
                title : 'Sorry!' ,
                text : 'Please, Select order which you want to exchange.',
                icon : 'info',
                buttons : false,
                timer : 5000
            }) ;

            handleExchangeType('market') ;
        }
    }, [exchangeType]) ;

    useEffect(() => {
        if(exchangeMethod === "sell") handleExchangeTotal(exchangePrice * exchangeAmount) ;
        if(exchangeMethod === 'buy' && exchangePrice !== 0 ) handleExchangeAmount(exchangeTotal / exchangePrice) ;
    }, [exchangePrice]) ;

    useEffect(() => {
        if(exchangeFocus === 'amountCtrl') handleExchangeTotal(exchangeAmount * exchangePrice) ;
    } , [exchangeAmount]) ;

    useEffect(() => {
        if(exchangeFocus === 'totalCtrl') {
            if(exchangePrice !== 0) handleExchangeAmount(exchangeTotal / exchangePrice);
        }
    }, [exchangeTotal])

    useEffect(() => {
        if(selectedOrder) {
            handleExchangePrice(Number(selectedOrder.orderPrice)) ;
            handleExchangeAmount(Number(selectedOrder.orderAmount)) ;
            handleExchangeTotal(Number(selectedOrder.orderPrice) * Number(selectedOrder.orderAmount)) ;
            handleExchangeMethod(selectedOrder.orderMethod) ;
            handleExchangeType("normal") ;
        }
    }, [selectedOrder]);

    useEffect(async () => {
        if(currentCrypto && isAuthenticated){
            handleUpdateBalance() ;
            if(exchangeType === 'market') {
                handleExchangePrice(currentCrypto.price) ;
            }
        }
    }, [currentCrypto, isAuthenticated]) ;

    useEffect(async () => {
        if(cryptoBalance !== null && pairBalance !== null) {
            handleExchangeCryptoBalance(cryptoBalance) ;
            handleExchangePairBalance(pairBalance) ;
        }
    }, [cryptoBalance , pairBalance]) ;

    return (
        <Box className={classes.root}>
            { (exchangeCryptoBalance !== null && exchangePairBalance !== null && currentCrypto) ? <>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant='contained' color={exchangeMethod === "buy" ? 'primary' : 'inherit'} size='small' fullWidth
                                onClick={() => handleExchangeMethod('buy')}
                            >
                                Buy
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' color={exchangeMethod === "sell" ? 'secondary' : 'inherit'} size='small' fullWidth
                                onClick={() => handleExchangeMethod('sell')}
                            >
                                Sell
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl
                                fullWidth
                            >
                                <InputLabel>Order Type</InputLabel>
                                <Select 
                                    label='Order Type'
                                    size='small'

                                    value={exchangeType}
                                    onChange={(e) => handleExchangeType(e.target.value)}
                                    onFocus={() => handleExchangeFocus('typeCtrl')}
                                    onBlur={() => handleExchangeFocus(null)}
                                >
                                    <MenuItem value='market'>Market</MenuItem>
                                    <MenuItem value='limit'>Limit</MenuItem>
                                    <MenuItem value="normal">Normal</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label='Price'
                                size='small'
                                type='number'
                                color=''

                                value={exchangePrice}
                                onChange={(e) => handleExchangePrice(e.target.value)}
                                onFocus={() => handleExchangeFocus('priceCtrl')}
                                onBlur={() => handleExchangeFocus(null)}

                                InputProps={{
                                    endAdornment : <InputAdornment position='end'>
                                        { currentCrypto && currentCrypto.pair.symbol}
                                    </InputAdornment>,
                                    inputProps : {
                                        min : 0,
                                    }
                                }}

                                disabled={ ( exchangeType === "market" || exchangeType === "normal" ) ? true : false}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label='Amount'
                                size='small'
                                type='number'

                                value={exchangeAmount}
                                onChange={(e) => handleExchangeAmount(e.target.value)}
                                onFocus={() => handleExchangeFocus('amountCtrl')}
                                onBlur={() => handleExchangeFocus(null)}

                                InputProps={{
                                    endAdornment : <InputAdornment position='end'>
                                        {currentCrypto && currentCrypto.crypto.symbol}
                                    </InputAdornment>,
                                    inputProps : {
                                        min : 0,
                                    }
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                        <Grid item xs={3}>
                            <Button variant='contained' size='small' fullWidth onClick={() => handleExchangePercent(0.25)}>25%</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant='contained' size='small' fullWidth onClick={() => handleExchangePercent(0.5)}>50%</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant='contained' size='small' fullWidth onClick={() => handleExchangePercent(0.75)}>75%</Button>
                        </Grid>
                        <Grid item xs={3}>
                            <Button variant='contained' size='small' fullWidth onClick={() => handleExchangePercent(1)}>100%</Button>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label='Total'
                                size='small'
                                type='number'
                                value={exchangeTotal}
                                onChange={(e) => handleExchangeTotal(e.target.value)}

                                onFocus={() => handleExchangeFocus('totalCtrl')}
                                onBlur={() => handleExchangeFocus(null)}

                                InputProps={{
                                    endAdornment : <InputAdornment position='end'>
                                        { currentCrypto && currentCrypto.pair.symbol }
                                    </InputAdornment>,
                                    inputProps : {
                                        min : 0,
                                    }
                                }}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <TextField
                                label='Available'
                                size='small'
                                type='number'
                                value={exchangeMethod === 'buy' ? exchangePairBalance : exchangeCryptoBalance} 

                                InputProps={{
                                    endAdornment : <InputAdornment position='end'>
                                        { currentCrypto && ( exchangeMethod === 'buy' ? currentCrypto.pair.symbol : currentCrypto.crypto.symbol) }
                                    </InputAdornment>,
                                    inputProps : {
                                        min : 0
                                    }
                                }}
                                disabled
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} >
                            Transaction Fee : { currentCrypto && currentCrypto.transaction_fee} %
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Button 
                                variant='contained' 
                                size='small' 
                                color={exchangeMethod === 'buy' ? 'primary' : 'secondary'} 
                                fullWidth

                                onClick={() => handleCryptoExchange()}
                            >
                                { exchangeMethod === "buy" ? "BUY" : "SELL" } { currentCrypto && currentCrypto.crypto.symbol  }
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} className={classes.btGp}>
                        <Grid item xs={match1 ? 6 : 12}>
                            <Button variant='contained' size='small'  color='info' fullWidth
                                    disabled={exchangeMethod === 'buy' ? !currentCrypto.pair.is_deposit : !currentCrypto.crypto.is_deposit}
                                    onClick={() => handleGotoDeposit()}
                            >
                                Deposit ( { currentCrypto && (exchangeMethod === 'buy' ? currentCrypto.pair.symbol : currentCrypto.crypto.symbol) } )
                            </Button>
                        </Grid>
                        <Grid item xs={match1 ? 6 : 12}>
                            <Button variant='contained' size='small'  color='info' fullWidth
                                    disabled={Number(exchangeMethod === 'sell' ? exchangeCryptoBalance : exchangePairBalance) > 0 ? false : true}
                                    onClick={() => handleGotoTransfer()}
                            >
                                Transfer ( {exchangeMethod === 'buy' ? currentCrypto.pair.symbol : currentCrypto.crypto.symbol} )
                            </Button>
                        </Grid>
                    </Grid>
                </> : <Loading 
                    height={'100%'}
                />
            }
        </Box>
    )
}

Exchange.propTypes = {
    CryptoBalance : PropTypes.func.isRequired,
    UserOrderList : PropTypes.func.isRequired,
    CryptoExchangeByMarket : PropTypes.func.isRequired,
    CryptoExchangeByLimit : PropTypes.func.isRequired,
    CryptoExchangeByNormal : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    cryptoBalance : state.crypto.cryptoBalance,
    pairBalance : state.crypto.pairBalance,
    currentCrypto : state.crypto.currentCrypto
})
const mapDispatchToProps = {
    CryptoBalance,
    UserOrderList,
    CryptoExchangeByMarket,
    CryptoExchangeByLimit,
    CryptoExchangeByNormal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchange) ;