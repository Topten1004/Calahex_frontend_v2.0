
import React from 'react' ;

import { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;

import {
    Box
} from '@mui/material' ;

import OrderSelect from './OrderSelect';
import OrderLable  from './OrderLable';
import OrderSell from './OrderSell';
import OrderBuy from './OrderBuy';
import PriceMean from './PriceMean' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        boxSizing : "border-box" ,
        ['@media (max-width : 535px)'] : {
            borderTop : "1px solid lightgray"
        },

        paddingLeft : "5px" ,
        paddingRight : "5px" ,
        borderRight : "1px solid " + theme.palette.common.black ,
        borderLeft : "1px solid " + theme.palette.common.black ,
    }
}));

const OrderBook = (props) => {
    
    const classes = useStyles() ;

    const [ orderType, setOrderType ] = useState("both") ;

    const {
        currentCrypto,
        handleSelectedOrder
    } = props ;


    const handleOrderType = (orderType) => {
        setOrderType(orderType) ;
    }

    return (
        <Box className={classes.root}>
            
            <OrderSelect 
                orderType={orderType}
                handleOrderType={handleOrderType}
            />

            <OrderLable />
            
            <OrderSell 
                handleSelectedOrder={handleSelectedOrder}
                orderType={orderType}
            />

            <PriceMean />

            <OrderBuy 
                handleSelectedOrder={handleSelectedOrder}
                orderType={orderType}
            />

        </Box>
    )
}

OrderBook.propTypes = {

}
const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderBook) ;