
import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux';
import { ExchangeDepositHistory, ExchangeDepositAccountInfo, WholeCryptoBalance, WalletAccountInfo } from '../../../../redux/actions/wallet';

import Crypto from './Crypto';
import Fiat from './Fiat' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,

        overflow : "hidden" ,
        overflowY : "scroll",

        "& input" : {
            background : theme.palette.common.lightBlack,
            color : theme.palette.common.label,
            borderRadius : 5,
            cursor :'pointer'
        }
    },
    header : {
        minHeight : "70px" ,
        borderBottom : "1px solid " + theme.palette.common.black ,

        fontSize : "14px" ,
        padding : "15px"
    },
    breadcumb : {
        color : theme.palette.common.label
    },
    label : {
        color : theme.palette.primary.main,
        fontSize : 18,
        fontWeight : 600
    },
    tab : {
        paddingLeft : "15px" ,

        display : "flex" ,
        flexDirection : "row" ,
        alignItems : 'center' ,

        borderBottom : "1px solid gray",
        color : theme.palette.common.label,

        height : "40px",

        "& div" :{
            paddingLeft : "10px" ,
            paddingRight : "10px",

            minWidth : "65px",
            textAlign : "center" ,

            cursor : "pointer"
        }
    },
    active : {
        borderBottom : "1px solid",
        color : theme.palette.primary.main,
        fontWeight : "bold"
    }
}))

const Deposit = (props) => {
    const classes = useStyles() ;
    const location = useLocation() ;

    const [ selectedTab,  setSelectedTab ] = useState(1) ;

    const handleChangeTab = (tab) => {
        setSelectedTab(tab) ;
    }

    useEffect(() => {
        if(location.state) {
            if(location.state.selectedDepositTab){
                setSelectedTab(location.state.selectedDepositTab);
            }
        }
    },[location]) ;
    
    return (
        <Box  className={classes.root}>

            <Box className={classes.header}>
                <Box className={classes.breadcumb}>
                    Exchange &rsaquo; Deposit
                </Box>
                <Box  className={classes.label}>
                    Deposit
                </Box>
            </Box>

            <Box className={classes.tab}>
                <Box  className={selectedTab === 1 ? classes.active : ""} onClick={() => handleChangeTab(1)}>
                    Crypto
                </Box>
                <Box  className={selectedTab === 2 ? classes.active : ""} onClick={() => handleChangeTab(2)}>
                    Fiat
                </Box>
            </Box>

            {
                selectedTab === 1 ? <Crypto /> : <Fiat />
            }

        </Box>
    )
}

const mapStateToProps = state => ({
    
})

const mapDispatchToProps = {
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Deposit) ;