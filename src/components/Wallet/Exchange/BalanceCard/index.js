

import React from 'react';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        padding : "20px" ,
        borderRadius : "5px" ,

        backgroundColor : props => `${props.bgColor}`,
    },
    label : {
        fontSize : "11px" ,
        color : theme.palette.common.label
    },
    balance : {
        marginTop : "5px",
        fontSize : "13px",
        color : theme.palette.common.label
    }
}))

const BalanceCard = (props) => {
    
    const {
        label,
        balance,
        symbol,
        bgColor
    } = props ;

    const classes = useStyles(props);

    return (
        <Box  className={classes.root}>
            <Box  className={classes.label}>
                { label }
            </Box>
            <Box  className={classes.balance}>
                { Number(balance).toFixed(4) } { symbol }
            </Box>
        </Box>
    )
}

export default BalanceCard;