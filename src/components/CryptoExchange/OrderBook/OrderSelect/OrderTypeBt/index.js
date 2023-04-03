


import React from 'react' ;

import { useState , useEffect } from 'react' ;

import clsx from 'clsx';

import {
    Box ,
    Stack ,
    Tooltip
} from '@mui/material' ;

import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

import StyledBadge from './Badge.styled' ;
import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        width : "20px" ,
        marginLeft : "5px" ,
        marginRight : "5px" ,
        cursor : "pointer"
    },
    sell : {
        backgroundColor : "#c74a4d",
        border : "1px solid #c74a4d" 
    },
    buy : {
        backgroundColor : "#3c868f" ,
        border : "1px solid #3c868f"
    },
    line : {
        marginTop : "2px"
    }
}));


const OrderTypeBt = (props) => {
    
    const classes = useStyles() ;
    
    const {
        orderType , isChecked , handleOrderType ,
    } = props ;

    const [sellCount , setSellCount] = useState(0) ;
    const [buyCount , setBuyCount] = useState(0) ;

    const emitOrderType = () => {
        switch(orderType){
            case "sell" :
                handleOrderType("sell") ;
                return ;
            case "buy" : 
                handleOrderType("buy");
                return ;
            case "both" :
                handleOrderType("both");
                return ;
            default :
                return ;
        }
    }

    useEffect(() => {
        switch(orderType){
            case "sell" :
                setSellCount(4);
                return ;
            case "buy" : 
                setBuyCount(4)
                return ;
            case "both" :
                setSellCount(2);
                setBuyCount(2) ;
                return ;
            default :
                return ;
        }
    } , [orderType]) ;

    return (
        <Tooltip title={orderType === "sell" ? "Sell Orders" : (orderType === "buy" ? "Buy Orders" : "OrderBook")}>
            <StyledBadge color={"success"} badgeContent={ isChecked ? <CheckOutlinedIcon/> :"0"}>
                <Box className={classes.root} onClick={() => emitOrderType()}>
                    <Stack display={"flex"} flexDirection={"column"}>
                        {
                            [...Array(sellCount)].map((item , index) => {
                                return (
                                    <Box  className={clsx(classes.sell , classes.line)} key={index}>
                                    </Box>
                                )
                            })
                        }
                        {
                            [...Array(buyCount)].map((item , index) => {
                                return (
                                    <Box  className={clsx(classes.buy , classes.line)} key={index}>
                                    </Box>
                                )
                            })
                        }
                    </Stack>
                </Box>
            </StyledBadge>
        </Tooltip>
    )
}

export default OrderTypeBt;