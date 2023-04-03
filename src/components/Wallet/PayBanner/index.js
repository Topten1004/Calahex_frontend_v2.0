

import React from 'react' ;
import { useNavigate } from 'react-router-dom';

import ListIcon from '@mui/icons-material/List';

import {
    Box, 
    Button,
    IconButton,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        boxSizing : "border-box" ,
        minHeight : "55px",

        top : 60 ,
        zIndex:1000,
        position : 'fixed',
        width : '100%',

        backgroundColor : theme.palette.common.black ,

        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "space-between" ,

        paddingRight : "30px" ,

        "& .MuiButtonBase-root" :{
            textTransform : 'capitalize' ,
            margin : "5px"
        },
        "& .MuiSvgIcon-root" :{
            color : "white"
        }
    },
    btGroup : {
        textAlign : "center"
    }
}));

const PayBanner = (props) => {
    
    const classes = useStyles() ;

    const navigate = useNavigate() ;

    const match1 = useMediaQuery("(min-width : 1280px)") ;
    const match2 = useMediaQuery("(min-width : 960px)") ;

    const {
        handleCloseSider,
        setIsDrawerSider,
        handleCloseSecure,
        isVisibleSecurity,
        handleChangeTab
    } = props ;
    
    const handleGotoDeposit = async () => {
        await handleChangeTab('exchangeDeposit') ;
        setIsDrawerSider(false) ;
    }
    const handleGotoWithdraw = async () => {
        await handleChangeTab('exchangeWithdraw') ;
        setIsDrawerSider(false) ;
    }
    const handleGotoTrade = () => {
        navigate('/cryptoexchange') ;
    }
    return (
        <Box className={classes.root}>
            <Box >
                {
                    !match1 &&  <IconButton onClick={handleCloseSider}>
                                    <ListIcon />
                                </IconButton>
                }
            </Box>
            <Box className={classes.btGroup}>
                <Button variant='contained' size='small' 
                        onClick={handleGotoDeposit}
                >
                    Deposit
                </Button>
                <Button variant='contained' size='small' 
                        onClick={handleGotoWithdraw}
                >
                    Withdraw
                </Button>
                <Button variant='contained' size='small' 
                        onClick={handleGotoTrade}
                >
                    Trade
                </Button>
            </Box>
            <Box >
                {
                    isVisibleSecurity && !match2 &&  <IconButton onClick={handleCloseSecure}>
                                    <ListIcon />
                                </IconButton>
                }
            </Box>
        </Box>
    )
}

export default PayBanner ;