import React, { useEffect , useRef, useState, useCallback  } from 'react' ;

import { useLocation, useNavigate } from 'react-router-dom' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { AllNotifications, CryptoPairList , CryptoOrderList , MarketTradeList } from '../redux/actions/stream' ;
import { ConfirmAuthentication } from '../redux/actions/auth';

import socketIOClient from 'socket.io-client' ;
import { CA1HEX_HOST_URL } from '../static/constants';

import Header from './Layouts/Header';
import Footer from './Layouts/Footer' ;
import Routing from './Routes';

import AOS from 'aos/dist/aos';
import 'aos/dist/aos.css' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

AOS.init({once : true}) ;

const useStyles = makeStyles((theme) => ({
    root : {
        // label css style
        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : theme.palette.common.label
            } 
        },
        "& .MuiInputLabel-root" : {
            color : theme.palette.common.label + " !important",
        },

        // form control background style
        "& .MuiFormControl-root" : {
            background : "#2a2d35",
            borderRadius : 5,
            "& svg" :{
                color : 'white'
            }
        },

        // when hover border color style
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.common.black,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                border : '1px solid ' + theme.palette.primary.main + '!important'
            },
        },

        // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : 'white !important',
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: '#848e9c',
        },
        "& .MuiButtonBase-root" : {
            "&.Mui-disabled": {
                backgroundColor : theme.palette.common.lightBlack,
                color : theme.palette.common.disabledBlack,
                cursor : 'not-allowed !important',
                pointerEvents : 'unset !important'
            }
        },
        "& .MuiFormHelperText-root" : {
            background : theme.palette.background.default,
            margin : '0px !important'
        }
    }
}))

const Main = (props) => {
    const classes = useStyles() ;

    const {
        AllNotifications,
        CryptoPairList,
        CryptoOrderList,
        MarketTradeList,
        ConfirmAuthentication,
        currentCrypto
    } = props ;

    const [isVisibleFooter , setIsVisibleFooter] = useState(true) ;
    const location = useLocation() ;

    const [ socketId, setSocketId ] = useState(null);
    const [ orderEventName, setOrderEventName ] = useState(null) ;
    const [ tradeEventName, setTradeEventName ] = useState(null) ;

    const socketRef = useRef();

    const handleOrderEventName = (eventName) => {
        setOrderEventName(eventName) ;
    }

    const handleTradeEventName = (eventName) => {
        setTradeEventName(eventName) ;
    }

    useEffect(() => {
        ConfirmAuthentication() ;
        socketRef.current = socketIOClient.connect(CA1HEX_HOST_URL) ;
      
        socketRef.current.on('getId', data => { 
            handleSocketId(data)
        })
        
        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    useEffect(() => {
        if(socketId) {
            socketRef.current.emit('Request: Notifications', {
                greeter : "Hello CA1EX Support Team." ,
                content: "I Need Notification List.", 
                id: socketId
            });
        
            socketRef.current.emit('Request: Crypto Pair List', socketId , {
                greeter : "Hello CA1EX Support Team.",
                content : "I Need Crypto Pair List.",
                id : socketId
            }) ;
    
            socketRef.current.on('Response: Notifications', dataGot => {
                AllNotifications(dataGot) ;
            }) ;
    
            socketRef.current.on('Response: Crypto Pair List', dataGot => {
                CryptoPairList(dataGot) ;
            }) ;
        }
    }, [socketId]) ;

    useEffect(() => {
        if(currentCrypto) {
            socketRef.current.emit('Request: Crypto Order List', socketId, {
                crypto_id : currentCrypto.crypto.id,
                pair_id : currentCrypto.pair.id
            }) ;

            socketRef.current.emit('Request: Market Trade List', socketId, {
                crypto_id : currentCrypto.crypto.id,
                pair_id : currentCrypto.pair.id
            }) ;

            socketRef.current.removeAllListeners(orderEventName);

            socketRef.current.on(`Response: Crypto Order List(${currentCrypto.crypto.id}, ${currentCrypto.pair.id})`, dataGot => {
                CryptoOrderList(dataGot) ;
                handleOrderEventName(`Response: Crypto Order List(${currentCrypto.crypto.id}, ${currentCrypto.pair.id})`) ;
            });

            socketRef.current.removeAllListeners(tradeEventName) ;

            socketRef.current.on(`Response: Market Trade List(${currentCrypto.crypto.id}, ${currentCrypto.pair.id})`, dataGot  => {
                MarketTradeList(dataGot) ;
                handleTradeEventName(`Response: Market Trade List(${currentCrypto.crypto.id}, ${currentCrypto.pair.id})`) ;
            });
        }
    }, [currentCrypto]) ;

    const handleSocketId = (id) =>{
        setSocketId(id) ;
    }

    return (
        <Box className={classes.root}>
            <Header />
            <Routing />
            {
                isVisibleFooter ? <Footer /> : <></>
            }
        </Box>
    )
}

Main.propTypes = {
    AllNotifications : PropTypes.func.isRequired,
    CryptoPairList : PropTypes.func.isRequired,
    CryptoOrderList : PropTypes.func.isRequired,
    MarketTradeList : PropTypes.func.isRequired,
    ConfirmAuthentication : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto
}) ;

const mapDispatchToProps = {
    AllNotifications,
    CryptoPairList,
    CryptoOrderList,
    MarketTradeList,
    ConfirmAuthentication
} ;

export default connect(mapStateToProps, mapDispatchToProps)(Main) ;