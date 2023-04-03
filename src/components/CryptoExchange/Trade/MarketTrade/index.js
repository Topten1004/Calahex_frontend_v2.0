

import React from 'react' ;

import { useEffect } from 'react' ;

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;

import {
    Box ,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(50vh - 75px)" ,
        ['@media (max-width : 1500px)'] : {
            height : 'calc(50vh - 107px)'
        },

        overflow : "hidden" ,
        overflowY : "scroll" ,
        borderBottom : "1px solid " + theme.palette.common.black ,

        "& .MuiTableCell-root" : {
            padding : "5px" ,
            fontSize : "12px",
            textAlign : "right" ,
            borderBottom : '1px solid ' + theme.palette.common.black,

            color : theme.palette.common.label ,
            cursor : 'pointer'
        },
        "& .MuiTableHead-root" :{
            "& .MuiTableCell-root" : {
                padding : '0px !important',
                fontWeight : "bold" ,
                color : theme.palette.primary.main ,
                fontSize : "11px",
                height : '30px',
            },
        }
    },
    buyPrice : {
        color : '#0fb876 !important'
    },
    sellPrice : {
        color : theme.palette.secondary.main + " !important"
    }
}));

const MarketTrade = (props) => {

    const classes = useStyles() ;

    const {
        currentCrypto , 
        marketTradeList , MarketTradeList
    } = props ;

    const headFields = [
        "Time" ,
        "Price" ,
        "Amount" ,
        "Total"
    ]

    return (
        <Box className={classes.root}>
            <TableContainer>
                <Table >
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map(( field , index ) => {
                                    return (
                                        <TableCell key={index}>
                                            { field }
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            marketTradeList && marketTradeList.map((row , index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell>{row.time}</TableCell>
                                        <TableCell className={ row.type === "sell" ? classes.sellPrice : classes.buyPrice}>{Number(row.price).toFixed(8)}</TableCell>
                                        <TableCell>{Number(row.amount).toFixed(8)}</TableCell>
                                        <TableCell>{Number(row.total).toFixed(6)}</TableCell>
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

MarketTrade.propTypes = {

}

const mapStateToProps = state => ({
    marketTradeList : state.stream.marketTradeList,
    currentCrypto : state.crypto.currentCrypto
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MarketTrade) ;