
import React from 'react' ;

import { useState } from 'react' ;

import clsx from 'clsx' ;

import visaImg from '../../../../../../assets/newcard.png' ;
import bankImg from '../../../../../../assets/bank.png' ;

import CurrencySelect from './CurrencySelect';

import {
    Box,
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "20px",
        display : "flex" ,
        justifyContent : "center",
        alignItems : "center" ,
        color : theme.palette.common.label,
        
        flexDirection : "column",

        "& div" : {
            minWidth : "100%"
        }
    },
    title : {
        marginBottom : "15px",
        fontWeight : "bold"
    },
    method : {
        boxShadow : "0px 0px 8px 0px" ,

        padding : "20px",
        marginTop : "20px",

        display : "flex" ,
        alignItems : "center" ,

        flexDirection : "column",

        borderRadius : "5px",

        border : "1px solid lightgray",

        minWidth : "100%"
    },
    label : {
        fontWeight : "bold",
        fontSize : "13px" ,

    },
    card : {
        paddingLeft : "10px" ,
        marginTop : "20px",
        marginBottom : "20px",

        border : '1px solid lightgray',
        borderRadius : '5px' ,

        display : "flex" ,
        alignItems : "center",

        flexDirection : "row",

        height : "70px",
        cursor : 'pointer'
    },
    active : {
        border : "2px solid",
        borderColor : theme.palette.primary.main
    },
    description :{
        paddingLeft : "15px",
        fontSize : "13px"
    }
}))

const Method = (props) => {
    
    const {
        methodType ,
        handleMethodType,
        currency,
        handleCurrency
    } = props ;

    const classes = useStyles() ;
    

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title}>
                1.Select currency and payment method
            </Box>

            <CurrencySelect 
                handleCurrency={handleCurrency}
                currency={currency}
            />

            <Box  className={classes.method}>
                <Box  className={classes.label}>
                    Bank Deposit
                </Box>
                <Box  className={clsx( classes.card , methodType === 1 ? classes.active : "")} onClick={() => handleMethodType(1)}>
                    <Box component={'img'} src={bankImg} height={40}/>
                    <Box component={'span'} className={classes.description}>International Bank Transfer (Swift)</Box>
                </Box>
                <Box  className={classes.label}>
                    Card Deposit
                </Box>
                <Box  className={clsx( classes.card , methodType === 2 ? classes.active : "")} onClick={() => handleMethodType(2)}>
                    <Box component={'img'} src={visaImg} height={30}/>
                    <Box component={'span'} className={classes.description}>Visa/Master Card</Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Method;