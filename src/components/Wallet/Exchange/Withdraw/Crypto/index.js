import React, { useEffect, useState } from 'react' ;
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { ExchangeCryptoWithdraw, WholeCryptoBalance, WalletAccountInfo, ExchangeWithdrawHistory, ExchangeWithdrawAccountInfo } from '../../../../../redux/actions/wallet' ;
import { Check2FAProfile } from '../../../../../redux/actions/auth';

import swal from 'sweetalert' ;
import WithdrawHistory from './WithdrawHistory';
import BalanceCard from '../../BalanceCard';
import Loading from '../../../../Common/Loading';
import Confirm2FAForm from '../../../../Auth/Confirm2FAForm';

import {
    Box,
    Grid,
    MenuItem,
    TextField,
    Select,
    Button,
    InputAdornment,
    useMediaQuery,
    FormControl
} from '@mui/material' ;

import { makeStyles } from '@mui/styles'; 

const useStyles= makeStyles((theme) => ({
    root : {
        padding : '20px',
    },
    card : {
        borderRadius : 5 ,
        border : '2px solid ' + theme.palette.common.black,
        padding: '15px',
        paddingBottom : '30px',

        position : 'relative',
    },
    label : {
        fontWeight : 'bold',
        color : theme.palette.common.label
    },
    info : {
        paddingTop : '5px',
        color : theme.palette.common.label,
        fontSize : '14px'
    },
    submit : {
        "& .MuiButtonBase-root" : {
            width : '100px',
            height : '30px',
            borderRadius : '20px'
        },
        position : 'absolute',
        left : 'calc(50% - 50px)',
        bottom : '-15px'
    }
}))

let exchangeWithdrawHistoryTimer ;

const Crypto = (props) => {
    const classes = useStyles() ;

    const match1 = useMediaQuery('(min-width : 1080px)') ;
    const match2 = useMediaQuery('(min-width : 430px)') ;

    const [ exchangeWithdrawCoin, setExchangeWithdrawCoin ] = useState(null) ;
    const [ exchangeWithdrawAmount, setExchangeWithdrawAmount ] = useState(0) ;
    const [ receiptAccount, setReceiptAccount ] = useState('') ;
    const [ open, setOpen ] = useState(false) ;

    const location = useLocation() ;

    const {
        exchangeWithdrawAccountInfo,
        check2FA, Check2FAProfile,
        ExchangeCryptoWithdraw,
        ExchangeWithdrawAccountInfo,
        ExchangeWithdrawHistory,
        WholeCryptoBalance,
        WalletAccountInfo
    } = props ;

    const handleConfirm2FA = () => {
        handleClose2FAFrom() ;

        ExchangeCryptoWithdraw(exchangeWithdrawCoin, exchangeWithdrawAmount, receiptAccount) ;
        handleExchangeWithdrawHistoryTimer() ;
    }
    const handleClose2FAFrom = () => {
        setOpen(false) ;
    } 
    const handleOpen2FAForm = () => {
        setOpen(true) ;
    }
    const handleExchangeWithdrawAmount = (amount) => {
        setExchangeWithdrawAmount(Number(amount)) ;
    }

    const handleExchangeWithdrawCoin = (exchangeWithdrawCoin) => {
        setExchangeWithdrawCoin(exchangeWithdrawCoin) ;
    }

    const handleReceiptWithdraw = (receiptAccount) => {
        setReceiptAccount(receiptAccount) ;
    }

    const handleExchangeWithdrawHistoryTimer = async () => {
        clearInterval(exchangeWithdrawHistoryTimer) ;

        exchangeWithdrawHistoryTimer = setInterval(async() => {
            if(!await ExchangeWithdrawHistory()) {
                clearInterval(exchangeWithdrawHistoryTimer) ;
                await ExchangeWithdrawAccountInfo() ;
                await WholeCryptoBalance() ;
                await WalletAccountInfo() ;
            }
        }, 1000) ;
    }

    const handleWithdraw = () => {
        if(exchangeWithdrawAmount === 0) {
            return swal({
                title : 'Warning',
                text : "Amount is Empty",
                icon : 'warning',
                buttons : false,
                timer : 5000
            })
        }
        if( exchangeWithdrawAccountInfo[exchangeWithdrawCoin].available < exchangeWithdrawAmount ) {
            return swal({
                title : 'Warning',
                text : "Overflow Withdraw Amount",
                icon : 'warning',
                buttons : false,
                timer : 5000
            })
        }

        if(check2FA) {
            handleOpen2FAForm() ;
        } else {
            ExchangeCryptoWithdraw(exchangeWithdrawCoin, exchangeWithdrawAmount, receiptAccount) ;
            handleExchangeWithdrawHistoryTimer() ;
        }
    }
    // search = useLocation().search 
    // var token = new URLSearchParams(search).get('token');

    useEffect(() => {
        Check2FAProfile() ;
        ExchangeWithdrawAccountInfo() ;
        ExchangeWithdrawHistory() ;
        handleExchangeWithdrawHistoryTimer() ;

        return () => {
            clearInterval(exchangeWithdrawHistoryTimer) ;
        }
    }, []) ;

    useEffect(() => {
        if(exchangeWithdrawAccountInfo) {
            if(!Object.keys(exchangeWithdrawAccountInfo).length) {
                return swal({
                    title : 'Warning',
                    text : 'Withdraw Coins Do Not Exist.',
                    icon : 'warning',
                    buttons : false,
                    timer : 5000
                }) ;
            }
            if(location.state && location.state.exchangeWithdrawCoin) 
                handleExchangeWithdrawCoin( location.state.exchangeWithdrawCoin ) ;
            else handleExchangeWithdrawCoin( Object.keys(exchangeWithdrawAccountInfo)[0] ) ;
        }
    }, [exchangeWithdrawAccountInfo]) ;

    return (
        <Box className={classes.root}>
            {
                ( exchangeWithdrawAccountInfo && exchangeWithdrawCoin  ) ? 
                    <Grid container spacing={2}>
                        <Grid item xs={match1 ? 5 : match2 ? 7 : 12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box className={classes.card}>
                                        <Box className={classes.label}>
                                            Coin
                                        </Box> 
                                        <FormControl
                                            fullWidth
                                        >
                                            <Select 
                                                size={'small'}
                                                value={exchangeWithdrawCoin}
                                                onChange={(e) => handleExchangeWithdrawCoin(e.target.value)}

                                                fullWidth
                                            >
                                                {
                                                    Object.entries(exchangeWithdrawAccountInfo).map(([id, item]) => {
                                                        return (
                                                            <MenuItem key={id} value={id}>
                                                                {item.symbol}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box className={classes.card}>
                                        <Box className={classes.label} sx={{mt : 2}}>
                                            Recipient's {exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol} Address
                                        </Box> 
                                        <TextField 
                                            size={'small'}
                                            sx={{mb : 1}}
                                            fullWidth
                                            value={receiptAccount}
                                            onChange={(e) => handleReceiptWithdraw(e.target.value)}
                                        />
                                        <FormControl
                                            fullWidth
                                        >
                                            <Select 
                                                size={'small'}
                                                value={exchangeWithdrawCoin}
                                                onChange={(e) => handleExchangeWithdrawCoin(e.target.value)}

                                                fullWidth
                                            >
                                                {
                                                    Object.entries(exchangeWithdrawAccountInfo).map(([id, item]) => {
                                                        return (
                                                            <MenuItem key={id} value={id}>
                                                                {item.symbol}
                                                            </MenuItem>
                                                        )
                                                    })
                                                }
                                            </Select>
                                        </FormControl>
                                        <Box className={classes.label} sx={{mt : 2}}>
                                            Amount
                                        </Box> 
                                        <TextField
                                            type={'number'}
                                            size={"small"}
                                            value={exchangeWithdrawAmount}
                                            onChange={(e) => handleExchangeWithdrawAmount(e.target.value)}

                                            InputProps={{
                                                endAdornment : (
                                                    <InputAdornment position='end'>
                                                        {exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            fullWidth
                                        />
                                        <Box className={classes.info}>
                                            Available Balance : {Number(exchangeWithdrawAccountInfo[exchangeWithdrawCoin].available).toFixed(4)}&nbsp;
                                            {exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                        </Box>
                                        <Box className={classes.info}>
                                            Withdrawal Fee(0.2%) : {parseFloat(exchangeWithdrawAmount) * 0.2 / 100}
                                            &nbsp;
                                            {exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                        </Box>
                                        <Box className={classes.submit}>
                                            <Button variant={'contained'} size={'small'}
                                                onClick={()=> handleWithdraw()}
                                            >
                                                Submit
                                            </Button>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={match1 ? 7 : match2 ? 5 : 12}>
                            <Grid container spacing={1}>
                                <Grid item xs={match1 ? 4 : 12}>
                                    <BalanceCard 
                                        label='Total balance:'
                                        bgColor='#28472c'
                                        balance={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].total}
                                        symbol={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                    />
                                </Grid>
                                <Grid item xs={match1 ? 4 : 12}>
                                    <BalanceCard 
                                        label='Available balance:'
                                        bgColor='#224452'
                                        balance={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].available}
                                        symbol={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                    />
                                </Grid>
                                <Grid item xs={match1 ? 4 : 12}>
                                    <BalanceCard 
                                        label='In order:'
                                        bgColor='#483415'
                                        balance={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].order}
                                        symbol={exchangeWithdrawAccountInfo[exchangeWithdrawCoin].symbol}
                                    />  
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid> : <Loading 
                                height={'100%'}
                            />
            }
            <WithdrawHistory />
            <Confirm2FAForm 
                open={open}
                handleClose2FAFrom={handleClose2FAFrom}
                handleConfirm2FA={handleConfirm2FA}
            />
        </Box>
    )
}

Crypto.propTypes = {
    ExchangeCryptoWithdraw : PropTypes.func.isRequired,
    ExchangeWithdrawAccountInfo : PropTypes.func.isRequired,
    ExchangeWithdrawHistory : PropTypes.func.isRequired,
    WholeCryptoBalance : PropTypes.func.isRequired,
    WalletAccountInfo : PropTypes.func.isRequired,
    Check2FAProfile : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    exchangeWithdrawAccountInfo : state.wallet.exchangeWithdrawAccountInfo,
    check2FA : state.auth.check2FA
})

const mapDispatchToProps = {
    ExchangeCryptoWithdraw,
    ExchangeWithdrawAccountInfo,
    ExchangeWithdrawHistory,
    WholeCryptoBalance,
    WalletAccountInfo,
    Check2FAProfile
}

export default connect(mapStateToProps , mapDispatchToProps) (Crypto) ;