import React, { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import { CloseExchangeDepositHistory, ExchangeDepositHistory } from '../../../../../../redux/actions/wallet';

import PaymentLoading from '../../../../../../assets/payment_loading.gif' ;
import swal from 'sweetalert';

import {
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        
    },
    img : {
        display : 'flex',
        justifyContent : 'center'
    },
    amount : {
        fontWeight : 'bold'
    },
    address : {
        fontWeight : 'bold',
    },
    wait : {
        fontWeight : 'bold'
    },
    description : {
        display : 'flex',
        flexDirection : 'column',

        lineHeight : '30px',

        paddingBottom : '20px',
        paddingTop : '20px'
    }
}))

const DepositForm = (props) => {
    const classes = useStyles() ;

    const [depositCrypto, setDepositCrypto ] = useState({status : 'requesting'}) ;

    const {
        open , handleClose,
        exchangePaymentInfo ,
        exchangeDepositHistory,
        CloseExchangeDepositHistory,
        ExchangeDepositHistory 
    } = props ;

    const handleDepositCrypto = (depositCrypto) => {
        setDepositCrypto(depositCrypto)
    }

    const handleCloseDeposit = async () => {
        if(await swal({
            title : 'Cancel Deposit' ,
            text : "Are you really want to cancel this deposit." ,
            icon : 'info',
            buttons: [
                'No, I am not sure!',
                'Yes, I am sure!'
            ],
        })){
            if( await CloseExchangeDepositHistory(depositCrypto.id) ) {
                await ExchangeDepositHistory() ;
                handleClose() ;
            };
        }
    }

    useEffect(() => {
        if(exchangeDepositHistory && exchangePaymentInfo && exchangeDepositHistory.length !== 0 ) {
            const filterHistory = exchangeDepositHistory.filter(history => history.payment_id === exchangePaymentInfo.payment_id ) ;

            if(filterHistory.length  !== 0) handleDepositCrypto(filterHistory[0]) ;
        }
    }, [exchangeDepositHistory, exchangePaymentInfo]) ;

    useEffect(async () => {
        if(depositCrypto.status === 'finished') {
            await handleClose() ;

            swal({
                title : 'Success',
                text : 'Payment is done successfully.',
                icon : 'success',
                buttons : false,
                timer : 5000
            });
        }
    }, [depositCrypto]) ;

    return (
        <Box className={classes.root}>
             <Dialog  onClose={handleClose} open={open} fullWidth>
                <DialogTitle onClose={handleClose}>
                    Deposit
                </DialogTitle>
                <DialogContent dividers>
                    <Box className={classes.amount}>
                        Amount : { exchangePaymentInfo ? exchangePaymentInfo.pay_amount : '' }
                    </Box>
                    <Box className={classes.img}>
                        {
                            exchangePaymentInfo ?   <Box    
                                                        component={'img'}
                                                        src={ "https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl=" + exchangePaymentInfo.pay_address } 
                                                        alt="Bitcoin QR Code Generator" 
                                                        border="0" 
                                                    /> : 
                                                    <Box component={'img'} src={PaymentLoading} />
                        }
                    </Box>
                    <Box className={classes.address} >
                        { 
                            `Address : ${exchangePaymentInfo ? exchangePaymentInfo.pay_address : ''}`
                        }
                    </Box>
                    <Box className={classes.description}>
                        <Box>Please send crypto into above address carefully.</Box>
                        <Box>If you send incorrect amount or incorrect address, then you will lose your money!</Box>
                    </Box>
                    <Box className={classes.wait}>
                        You need to wait until the payment is done.
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant={'contained'} color="primary" onClick={handleCloseDeposit}>
                        Close Deposit
                    </Button>
                    <Button color="primary" variant={'contained'}>
                        <CircularProgress
                            size={20}
                            sx={{color : 'white' , mr : 2}}
                        />
                        { 
                            depositCrypto.status
                        }
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

const mapStateToProps = state => ({
    exchangePaymentInfo : state.wallet.exchangePaymentInfo,
    exchangeDepositHistory : state.wallet.exchangeDepositHistory
})
const mapDispatchToProps = {
    CloseExchangeDepositHistory,
    ExchangeDepositHistory
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositForm) ;
