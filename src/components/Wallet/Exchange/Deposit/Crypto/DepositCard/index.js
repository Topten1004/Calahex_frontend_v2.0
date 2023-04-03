

import React,{useEffect, useState} from 'react' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types';
import { GetLimitAmount, CreatePayment, ExchangeDepositHistory , WholeCryptoBalance, WalletAccountInfo, ExchangeDepositAccountInfo } from '../../../../../../redux/actions/wallet';
import { Check2FAProfile } from '../../../../../../redux/actions/auth';

import DepositForm from '../DepositForm';
import Confirm2FAForm from '../../../../../Auth/Confirm2FAForm';

import swal from 'sweetalert' ;

import {
    Box,
    Card,
    CardHeader,
    CardContent,
    Divider,
    Button,
    TextField
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        borderRadius : 5,
        border : '2px solid ' + theme.palette.common.black,
        "& .MuiCardContent-root" : {
            padding : "0px",
            background : theme.palette.background.default,
            borderRadius : 0
        },
        "& .MuiCardHeader-root" : {
            background : theme.palette.background.default,
            borderBottom : '1px solid ' + theme.palette.common.black
        },
        "& .MuiCardHeader-title" : {
            fontSize : "14px" ,
            fontWeight : "bold",
            height : "15px",

            color : theme.palette.common.label,
        },
    },
    coin : {
        height : "40px",

        display : "flex",
        alignItems : "center",
        paddingLeft : "14px",
        fontWeight : "bold",

        backgroundColor : theme.palette.common.lightBlack,
        color : theme.palette.common.label,
        cursor : 'pointer',

        "& span" : {
            borderBottom : "2px solid " + theme.palette.common.label ,
            paddingLeft : "2px" ,
            paddingRight : "2px"
        }
    },
    balance : {
        paddingTop : "30px",

        display : "flex" ,
        justifyContent : "center",
        alignItems : "center" ,

        flexDirection : "column" ,

        "& .MuiButtonBase-root" : {
            marginTop : "20px"
        }
    }
}))

const DepositCard = (props) => {

    const classes = useStyles() ;

    const {
        ExchangeDepositHistory,
        depositCoin,
        GetLimitAmount, CreatePayment,
        handleExchangeDepositHistoryTimer,
        check2FA, Check2FAProfile ,
    } = props ;

    const [ depositAmount, setDepositAmount ] = useState(0) ;
    const [ isOpenDepositForm , setIsOpenDepositForm ] = useState(false) ;
    const [ open, setOpen ] = useState(false) ;
    

    const handleClose2FAForm = () => {
        setOpen(false) ;
    }
    const handleOpen2FAForm = () => {
        setOpen(true) ;
    }
    const handleConfirm2FA = async () => {
        handleClose2FAForm() ;

        await CreatePayment(depositCoin.symbol === "USDT" ? {
            ... depositCoin,
            symbol : "USDTERC20",
        } : depositCoin, depositAmount, 'deposit', 'crypto') ;

        await handleOpenDepositForm() ;

        await ExchangeDepositHistory() ;
        handleExchangeDepositHistoryTimer() ;
    }
    const handleCloseDepositForm = () => {
        setIsOpenDepositForm(false) ;
    }

    const handleOpenDepositForm = async () => {
        setIsOpenDepositForm(true) ;
    }

    const handleExchangeDeposit = async () => {
        let limitAmount = await GetLimitAmount(depositCoin.symbol === "USDT" ? "usdterc20" : depositCoin.symbol.toLowerCase()) ;

        if(limitAmount === null) {
            return swal({
                title : 'Deposit Error' ,
                text : "This crypto does not supported in Now Payment.",
                icon : "warning",
                buttons : false,
                timer : 5000
            })
        }
        if(depositAmount < limitAmount) {
            return swal({
                title : 'Deposit Error' ,
                text : "Please input at least " + limitAmount + depositCoin.symbol + ".",
                icon : "warning",
                buttons : false,
                timer : 5000
            })
        }

        if(check2FA) handleOpen2FAForm() ;
        else {
            await CreatePayment(depositCoin.symbol === "USDT" ? {
                ... depositCoin,
                symbol : "USDTERC20",
            } : depositCoin, depositAmount, 'deposit', 'crypto') ;
    
            await handleOpenDepositForm() ;
    
            await ExchangeDepositHistory() ;
            handleExchangeDepositHistoryTimer() ;
        }
    }

    const handleDepositAmount = (amount) => {
        if(!isNaN(amount)) setDepositAmount(parseFloat(Number(amount))) ;
    }

    useEffect(() => {
        Check2FAProfile() ;
    }, []) ;

    return (
        <Box  className={classes.root}>
            <Card>
                <CardHeader
                    title={'Deposit Network'}
                >

                </CardHeader>
                <Divider />
                <CardContent>
                    <Box  className={classes.coin}>
                        <Box component='span'>
                            { depositCoin.symbol }
                        </Box>
                    </Box>

                    <Box  className={classes.balance}>
                        <TextField 
                            label={'Amount'}
                            size={'small'}
                            type={'number'}
                            value={depositAmount}
                            onChange={(e) => handleDepositAmount(e.target.value)}
                        />
                        <Button variant='contained' size='small'
                            onClick={() => handleExchangeDeposit()}
                        >
                            Deposit
                        </Button>
                    </Box>
                </CardContent>
            </Card>
            <DepositForm
                open={isOpenDepositForm}
                handleClose={handleCloseDepositForm}
            />
            <Confirm2FAForm
                open={open}
                handleClose2FAForm={handleClose2FAForm}
                handleConfirm2FA={handleConfirm2FA}
            />
        </Box>
    )
}

DepositCard.propTypes = {
    GetLimitAmount : PropTypes.func.isRequired,
    CreatePayment : PropTypes.func.isRequired,
    ExchangeDepositAccountInfo : PropTypes.func.isRequired,
    ExchangeDepositHistory : PropTypes.func.isRequired,
    Check2FAProfile : PropTypes.func.isRequired,
    WholeCryptoBalance : PropTypes.func.isRequired,
    WalletAccountInfo : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    check2FA : state.auth.check2FA
})

const mapDispatchToProps = {
    GetLimitAmount,
    CreatePayment,
    ExchangeDepositHistory,
    Check2FAProfile,
    WholeCryptoBalance,
    WalletAccountInfo,
    ExchangeDepositAccountInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositCard) ;