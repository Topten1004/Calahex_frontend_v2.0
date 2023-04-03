import React from 'react' ;

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

        "& .MuiTableCell-root" : {
            padding : "5px" ,
            fontSize : "10px",
            textAlign : "right" ,
        },
        "& .MuiTableHead-root" :{
            "& .MuiTableCell-root" : {
                fontWeight : "bold" ,
                color : theme.palette.primary.main ,
                fontSize : "12px"
            },
        }
    }
}))


const Funds = (props) => {
    
    const classes = useStyles() ;
    
    const {
        cryptoFund,
        pairFund
    } = props ;

    const headFields = [
        "Coin" ,
        "Total" ,
        "Available" ,
        "In order",
        "USDT value"
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
                            ( cryptoFund && pairFund ) && <>
                                <TableRow>
                                    <TableCell >{cryptoFund.symbol}</TableCell>
                                    <TableCell >{Number(cryptoFund.total).toFixed(4)}</TableCell>
                                    <TableCell>{Number(cryptoFund.available).toFixed(4)}</TableCell>
                                    <TableCell>{Math.abs(Number(cryptoFund.order).toFixed(4))}</TableCell>
                                    <TableCell>
                                        {Number(cryptoFund.total_usdt_value).toFixed(4)} / {Number(cryptoFund.available_usdt_value).toFixed(4)}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >{pairFund.symbol}</TableCell>
                                    <TableCell >{Number(pairFund.total).toFixed(4)}</TableCell>
                                    <TableCell>{Number(pairFund.available).toFixed(4)}</TableCell>
                                    <TableCell sx={{minWidth : 55}}>{Math.abs(Number(pairFund.order).toFixed(4))}</TableCell>
                                    <TableCell sx={{minWidth : 145}}>
                                        {Number(pairFund.total_usdt_value).toFixed(4)} / {Number(pairFund.available_usdt_value).toFixed(4)}
                                    </TableCell>
                                </TableRow>
                            </>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

const mapStateToProps = state => ({
    userOrderList : state.crypto.userOrderList,
    cryptoFund : state.crypto.cryptoFund,
    pairFund : state.crypto.pairFund
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Funds);