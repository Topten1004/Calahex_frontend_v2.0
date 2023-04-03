import React, { useEffect } from 'react' ;

import { connect } from 'react-redux';

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


const TradeHistory = (props) => {
    
    const classes = useStyles() ;
    
    const {
        currentCrypto, 
        userOrderList
    } = props ;

    const headFields = [
        "DateTime" ,
        "Pair" ,
        "Side" ,
        "Price",
        "Amount",
        "Fee" ,
        "Total",
    ]

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
                            (userOrderList && currentCrypto) && userOrderList.filter(row => row.status !== 0).map((row, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell sx={{minWidth : 120}}>{row.time}</TableCell>
                                        <TableCell >{row.pair}</TableCell>
                                        <TableCell className={row.side === "buy" ? classes.buyPrice : classes.sellPrice}>
                                            {row.side}
                                        </TableCell>
                                        <TableCell className={row.side === "buy" ? classes.buyPrice : classes.sellPrice} sx={{minWidth : 90}}>
                                            {Number(row.price).toFixed(3)} { currentCrypto.pair.symbol }
                                        </TableCell>
                                        <TableCell sx={{minWidth : 90}}>{Number(row.amount).toFixed(3)} { currentCrypto.crypto.symbol } </TableCell>
                                        <TableCell>{Number(row.fee).toFixed(4)} { row.side === 'buy' ? currentCrypto.crypto.symbol : currentCrypto.pair.symbol }</TableCell>
                                        <TableCell sx={{minWidth : 90}}>{ Number(row.total).toFixed(3) } { currentCrypto.pair.symbol } </TableCell>
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

TradeHistory.propTypes = {

}

const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto,
    userOrderList : state.crypto.userOrderList
});
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(TradeHistory) ;