import React from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOrderCancel, UserOrderList } from '../../../../redux/actions/crypto';

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

const OpenOrders = (props) => {
    
    const classes = useStyles() ;
    
    const {
        currentCrypto, // from parent
        userOrderList,
        UserOrderCancel, UserOrderList
    } = props ;

    const headFields = [
        "DateTime" ,
        "Pair" ,
        "Type" ,
        "Side",
        "Price",
        "Amount" ,
        "Total",
        "Cancel Order"
    ]

    const handleCancelOrder = async (id) => {
        await UserOrderCancel(id) ;
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
                            (userOrderList && currentCrypto) && userOrderList.filter(row => row.status === 0 ).map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{minWidth : 120}}>{row.time}</TableCell>
                                        <TableCell >{row.pair}</TableCell>
                                        <TableCell>{row.type}</TableCell>
                                        <TableCell className={ row.side === "buy" ? classes.buyPrice : classes.sellPrice}>
                                            {row.side}
                                        </TableCell>
                                        <TableCell className={ row.side === "buy" ? classes.buyPrice : classes.sellPrice } sx={{minWidth : 100}}>
                                            { Number(row.price).toFixed(3) } { currentCrypto.pair.symbol }
                                        </TableCell>
                                        <TableCell sx={{minWidth : 60}}>
                                            { Number(row.amount).toFixed(3) } { currentCrypto.crypto.symbol } </TableCell>
                                        <TableCell sx={{minWidth : 82}}>
                                            { Number(row.total).toFixed(3) } { currentCrypto.pair.symbol }
                                        </TableCell>
                                        <TableCell sx={{minWidth : 90}}>
                                            <Box component={'input'} type={'button'} value={'Cancel'} onClick={() => handleCancelOrder(row.id)} />
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

OpenOrders.propTypes = {
    UserOrderCancel : PropTypes.func.isRequired,
    UserOrderList : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto,
    userOrderList : state.crypto.userOrderList
})
const mapDispatchToProps = {
    UserOrderCancel,
    UserOrderList
}
export default connect(mapStateToProps, mapDispatchToProps)(OpenOrders) ;