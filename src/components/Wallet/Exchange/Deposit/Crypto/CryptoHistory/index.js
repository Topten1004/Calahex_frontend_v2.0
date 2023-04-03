
import React, { useEffect } from 'react'

import { useState } from 'react'

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { ExchangeDepositHistory, ClearExchangePayHistory } from '../../../../../../redux/actions/wallet' ;

import {
    Box ,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Card,
    CardHeader,
    CardContent,
    Divider
} from '@mui/material'

import { makeStyles } from "@mui/styles"
import TableLoading from '../../../../../Common/TableLoading';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiCard-root" : {
            marginTop : "20px",
            marginBottom : "20px",
            border : "1px solid " + theme.palette.common.black
        },
        "& .MuiCardContent-root" : {
            padding : "0px",
            background : theme.palette.background.default,
        },
        "& .MuiCardHeader-root" : {
            background : theme.palette.background.default,
            borderBottom : '1px solid ' + theme.palette.common.black
        },
        "& .MuiCardHeader-title" : {
            fontSize : "14px" ,
            fontWeight : "bold",
            height : "15px",

            color : theme.palette.common.label,
        },

        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                padding : "5px",
                textAlign : "center",
                backgroundColor :"lightgray" ,
                fontWeight : "bold",

                background : theme.palette.common.lightBlack + " !important",
                color : theme.palette.common.label,
                borderBottom : '1px solid ' + theme.palette.common.black
            }
        },
        "& .MuiTableBody-root" : {
            "& .MuiTableCell-root" : {
                padding : "15px" ,
                textAlign : "center",
                "& .MuiButtonBase-root" : {
                    textTransform : "capitalize",
                    margin : "5px",
                    minWidth : "78px"
                },
                color : theme.palette.common.label,
                borderBottom : '1px solid ' + theme.palette.common.black
            }
        },
        "& .MuiTablePagination-root" : {
            color : theme.palette.common.label,
            "& .MuiTablePagination-selectLabel" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            },
            "& .MuiTablePagination-displayedRows" : {
                margin : "0px !important" ,
                fontWeight : "bold"
            }
        }
    }
}))

const CryptoHistory = (props) => {
    
    const classes =  useStyles() 
    
    const {
        exchangeDepositHistory,
        ClearExchangePayHistory, ExchangeDepositHistory
    } = props ;

    const headFields = [
        "Coin",
        "Amount",
        "Status",
        "Date",
        "Clear History"
    ]

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleClearHistory = async (id) => {
        await ClearExchangePayHistory(id) ;
        await ExchangeDepositHistory() ;
    }

    return (
        <Box className={classes.root}>
            <Card>
                <CardHeader
                    title='Recent Deposit Crypto History'                
                />
                <Divider/>
                <CardContent>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {
                                        headFields.map((field,  index) => {
                                            return (
                                                <TableCell key={index}>{field}</TableCell>
                                            )
                                        })
                                    }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    exchangeDepositHistory ? exchangeDepositHistory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row , index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>{row.crypto}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell sx={{textTransform : 'capitalize'}}>{row.status}</TableCell>
                                                <TableCell sx={{minWidth : 200}}>{row.createdAt}</TableCell>
                                                <TableCell>
                                                    {
                                                        ( row.status === 'finished'  || row.status === 'failed' ) ? <Box 
                                                                                        component='input' type='button' value='Clear History' 
                                                                                        onClick={() => handleClearHistory(row.id)}
                                                                                    />
                                                                                : "...On Pending"
                                                    }
                                                    
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) : <TableLoading
                                            colSpan={5}
                                        />
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={exchangeDepositHistory ? exchangeDepositHistory.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
        </Box>
    )
} 

CryptoHistory.propTypes = {
    ExchangeDepositHistory : PropTypes.func.isRequired,
    ClearExchangePayHistory : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    exchangeDepositHistory : state.wallet.exchangeDepositHistory
})

const mapDispatchToProps = {
    ExchangeDepositHistory,
    ClearExchangePayHistory
}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoHistory) ;