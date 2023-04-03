
import React from 'react' ;

// __________ hooks _________
import { useState, useEffect } from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOrderList } from '../../../redux/actions/crypto' ;

import {
    Box,
    Grid
} from '@mui/material' ;

// ________  Self components _________
import HistorySelect from './HistorySelect' ;
import OrderHistory from './OrderHistory' ;
import Funds from './Funds';
import OpenOrders from './OpenOrders';
import TradeHistory from './TradeHistory'; 

import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root : {
        height: "calc(50vh - 75px)" ,
        borderLeft : "1px solid " + theme.palette.common.black,
        borderBottom : '1px solid ' + theme.palette.common.black,

        "& .MuiTableCell-root" : {
            padding : "5px" ,
            fontSize : "12px",
            textAlign : "right" ,

            color : theme.palette.common.label,
            cursor : 'pointer',
            borderBottom : '1px solid ' + theme.palette.common.black
        },
        "& .MuiTableHead-root" :{
            "& .MuiTableCell-root" : {
                fontWeight : "bold" ,
                color : theme.palette.common.label ,
                fontSize : "12px"
            },
        },
        "& input" : {
            background : theme.palette.common.lightBlack,
            color : theme.palette.common.label,
            borderRadius : 5,
            cursor :'pointer'
        }
    },
    auth : {
        textAlign : "center",
        height : "calc(50vh - 105px)",

        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',

        color : theme.palette.common.label
    }
}))

const History = (props) => {
    
    const classes = useStyles() ;
    const {
        currentCrypto,
        isAuthenticated,
        UserOrderList
    } = props ;
 
    const [historyType , setHistoryType] = useState(1) ;

    const handleHistoryType = (type) => {
        setHistoryType(type) ;
    }

    useEffect(async () => {
        if(isAuthenticated && currentCrypto) {
            await UserOrderList(currentCrypto.crypto.id, currentCrypto.pair.id) ;
        }
    },[currentCrypto, isAuthenticated]) ;

    return (
        <Box className={classes.root}>
            <HistorySelect 
                historyType={historyType}
                handleHistoryType={handleHistoryType}
            />
            {
                ( isAuthenticated && historyType === 1 ) && <OpenOrders />
            }
            {
                ( isAuthenticated && historyType === 2 ) && <OrderHistory />
            }
            {
                ( isAuthenticated && historyType === 3 ) && <TradeHistory />
            }
            {
                ( isAuthenticated && historyType === 4 ) && <Funds />
            }
            {
                !isAuthenticated && <Grid container>
                    <Grid item xs={12} className={classes.auth}>
                       <Link to='/signup'> Sign up </Link>&nbsp;&nbsp; or &nbsp;&nbsp;<Link to='/login'>Log In</Link>&nbsp;&nbsp;to trade.
                    </Grid>
                </Grid>
            }
        </Box>
    )
}

History.propTypes = {
    UserOrderList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated,
    currentCrypto : state.crypto.currentCrypto
})
const mapDispatchToProps = {
    UserOrderList
}
export default connect(mapStateToProps, mapDispatchToProps)(History) ;
