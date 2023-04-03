import React, { useEffect } from 'react' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types';
import { UserOrderList, UserOrderClear } from '../../../../redux/actions/crypto';

import {
    Box ,
    TableContainer ,
    Table,
    TableRow,
    TableCell,
    TableHead,
    TableBody
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(50vh - 105px)",

        overflow : "hidden" ,
        overflowY : "scroll" ,
    },
    buyPrice : {
        color : '#0fb876 !important'
    },
    sellPrice : {
        color : theme.palette.secondary.main + " !important"
    }
}))


const OrderHistory = (props) => {
    
    const classes = useStyles() ;
    
    const {
        currentCrypto, 
        userOrderList,
        UserOrderList, UserOrderClear
    } = props ;

    const headFields = [
        "DateTime" ,
        "Pair" ,
        "Type" ,
        "Side",
        "Price",
        "Status" ,
        "Amount",
        "Total" ,
        "Clear Order"
    ]

    const handleClearOrder = async (id) => {
        await UserOrderClear(id) ;
        UserOrderList(currentCrypto.crypto.id, currentCrypto.pair.id) ;
    }
    
    return (
        <Box  className={classes.root}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                        {
                            headFields.map((field , index) => {
                                return (
                                    <TableCell key={index} >{ field }</TableCell>
                                )
                            })
                        }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (userOrderList && currentCrypto) && userOrderList.map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{minWidth : 113}}>{row.time}</TableCell>
                                        <TableCell >{row.pair}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell className={row.side === "buy" ? classes.buyPrice : classes.sellPrice}>
                                            {row.side}
                                        </TableCell>
                                        <TableCell className={row.side === "buy" ? classes.buyPrice : classes.sellPrice} sx={{minWidth : 90}}>
                                            {Number(row.price).toFixed(3)} { currentCrypto.pair.symbol }
                                        </TableCell>
                                        <TableCell>{ row.status === 1 ? 'filled':'open' }</TableCell>
                                        <TableCell sx={{minWidth : 65}}>
                                            { Number(row.amount).toFixed(3) } { currentCrypto.crypto.symbol } 
                                        </TableCell>
                                        <TableCell sx={{minWidth : 90}}>
                                            { Number(row.total).toFixed(3) } { currentCrypto.pair.symbol } 
                                        </TableCell>
                                        <TableCell sx={{minWidth : 80}}>
                                            {
                                                row.status === 1 ? <Box component={'input'}  type='button' value='Clear' onClick={() => handleClearOrder(row.id)} /> : "Open Order"
                                            }
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

OrderHistory.propTypes = {
    UserOrderClear : PropTypes.func.isRequired,
    UserOrderList : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    userOrderList : state.crypto.userOrderList,
    currentCrypto : state.crypto.currentCrypto
});
const mapDispatchToProps = {
    UserOrderClear,
    UserOrderList
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory) ;