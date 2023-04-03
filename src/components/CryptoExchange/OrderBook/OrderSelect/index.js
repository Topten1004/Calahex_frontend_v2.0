import React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { CryptoDecimal } from '../../../../redux/actions/crypto';

import OrderTypeBt from './OrderTypeBt';

import clsx from 'clsx';

import {
    Box ,
    Grid ,
    MenuItem ,
    FormControl ,
    Select
} from '@mui/material' ;

import  { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles ((theme) => ({
    root : {
        borderBottom : "2px solid " + theme.palette.common.black ,
        boxSizing : 'border-box' ,
        ['@media (max-width : 1140px)'] : {
            borderTop : '1px solid lightgray'
        },

        height : "35px" ,

        display: "flex" ,
        alignItems : "center" ,
        "& .MuiSvgIcon-root" : {
            marginLeft : "5px" ,
            marginRight : "5px"
        },
    },
    menuItem : {
        padding:"0px !important" , 
        display:"flex !important" ,
        justifyContent : "center !important"
    },
    flexBox : {
        display : "flex" ,
        alignItems : "center"
    },
    orderLabel : {
        justifyContent : "center" ,
        fontWeight : 'bold',
        color : theme.palette.common.label,
        cursor : 'pointer'
    },
    orderType : {
        justifyContent : "flex-end" ,
    }
}));

const OrderSelect = (props) => {

    const classes = useStyles() ;

    const { 
        orderType, handleOrderType,
        cryptoDecimal, CryptoDecimal
    } = props ;

    const handleDecimal = (value) => {
        CryptoDecimal(value) ;
    }

    return (
        <Box className={classes.root} >
            <Grid container >
                <Grid item xs={6} className={clsx(classes.flexBox , classes.orderLabel)}>
                    Order Book
                </Grid>
                <Grid item xs={6}>
                    <Box className={clsx( classes.flexBox , classes.orderType )}>
                        <OrderTypeBt 
                            orderType={"sell"}
                            handleOrderType={handleOrderType}
                            isChecked={ orderType === "sell" }
                        />
                        <OrderTypeBt
                            orderType={"buy"}
                            handleOrderType={handleOrderType}
                            isChecked={ orderType === "buy" }
                        />
                        <OrderTypeBt 
                            orderType={"both"}
                            handleOrderType={handleOrderType}
                            isChecked={ orderType === "both" }
                        />
                        <FormControl variant="standard" sx={{marginLeft : "5px"}}>
                            <Select
                                value={cryptoDecimal}
                                onChange={(e) => handleDecimal(e.target.value)}
                                disableUnderline
                            >
                                <MenuItem value={0} className={classes.menuItem}>0</MenuItem>
                                <MenuItem value={1} className={classes.menuItem}>1</MenuItem>
                                <MenuItem value={2} className={classes.menuItem}>2</MenuItem>
                                <MenuItem value={4} className={classes.menuItem}>4</MenuItem>
                                <MenuItem value={6} className={classes.menuItem}>6</MenuItem>
                                <MenuItem value={8} className={classes.menuItem}>8</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

OrderSelect.propTypes = {
    CryptoDecimal : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    cryptoDecimal : state.crypto.cryptoDecimal
})
const mapDispatchToProps = {
    CryptoDecimal
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSelect) ;