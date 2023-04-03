import React from 'react'

import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom' ;

import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { ExchangeWalletAccountInfo } from '../../../../../redux/actions/wallet';

import { isset } from '../../../../../utils/helper' ;
import * as config from '../../../../../static/constants';

import TableLoading from '../../../../Common/TableLoading';
import Convert from '../../../Convert';
import SearchBar from './SearchBar'

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
    Divider,
    Button
} from '@mui/material'

import { makeStyles } from "@mui/styles"

const useStyles = makeStyles((theme) => ({
    root : {
        margin : "15px",
        borderRadius : "5px",

        border : "2px solid " + theme.palette.common.black,
                
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
        },
    },
    search : {
        padding : "10px",
        borderBottom : "1px solid gray",
    },
}))

const CryptoBalance = (props) => {
    
    const classes =  useStyles() ;
    
    const {
        ExchangeWalletAccountInfo,
        exchangeWalletAccountInfo,
        setIsDrawerSider
    } = props ;

    const navigate = useNavigate() ;
    const location = useLocation() ;

    const {
        handleChangeTab,
    } = props ;

    const headFields = [
        "",
        "Coin",
        "Total",
        "Available",
        "In order",
        "Action"
    ]

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue , setSearchValue] = useState("") ;
    const [open, setOpen] = useState(false) ;
    const [convertCrypto, setConvertCrypto] = useState(null) ;

    const handleExchangeBalances = (exchangeBalances) => {
        setExchangeBalances(exchangeBalances) ;
    }

    const handleSearchValue = (event) => {
        setSearchValue(event.target.value) ;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleGotoWithdraw = (id) => {
        navigate(location.pathname , {
            state : {
                exchangeWithdrawCoin : id
            },
            replace : true
        });

        handleChangeTab('exchangeWithdraw') ;
        setIsDrawerSider(false) ;
    }

    const handleGotoDeposit = (id) => {
        navigate(location.pathname , {
            state : {
                exchangeDepositCoin : id
            },
            replace : true
        });

        handleChangeTab('exchangeDeposit') ;
        setIsDrawerSider(false) ;
    }

    const handleGotoTrade = (id) => {
        navigate('/cryptoexchange', {
            state : {
                currentCrypto_id  : id
            }
        });
    }

    const handleConvertCrypto = (convertCrypto) => {
        setConvertCrypto(convertCrypto) ;
    }
    
    const handleOpenConvert = (selectedItem) => {
        handleConvertCrypto(selectedItem);
        setOpen(true) ;
    }

    const handleCloseConvert = () => {
        handleConvertCrypto(null) ;
        setOpen(false) ;
    }

    useEffect(() => {
        ExchangeWalletAccountInfo() ;
        return () => {

        }
    }, []) ;

    return (
        <Box className={classes.root}>
            <Box className={classes.search}>
                <SearchBar 
                    searchValue={searchValue}
                    handleSearchValue={handleSearchValue}
                />
            </Box>
            
            <Card>
                <CardHeader
                    title='Crypto Balance'
                />
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
                                    exchangeWalletAccountInfo ? exchangeWalletAccountInfo.filter(list => 
                                                        list.symbol.toLowerCase().search(searchValue.toLowerCase()) >= 0 ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell>
                                                    <Box component={'img'} src={`${config.PUBLIC_CA1EX_API}${item.logo}`}
                                                        width = {30}
                                                        height = {30}
                                                    />
                                                </TableCell>
                                                <TableCell>{item.symbol}</TableCell>
                                                <TableCell>{Number(item.total).toFixed(4)}</TableCell>
                                                <TableCell>{Number(item.available).toFixed(4)}</TableCell>
                                                <TableCell>{Number(item.order).toFixed(4)}</TableCell>
                                                <TableCell>
                                                    <Button variant={'contained'} size={'small'}
                                                            disabled={item.is_deposit ? false : true}
                                                            onClick={() => handleGotoDeposit(item.id)}
                                                    >
                                                        Deposit
                                                    </Button>
                                                    <Button variant={'contained'} size={'small'}
                                                            disabled={item.is_withdraw ? false : true}
                                                            onClick={() => handleGotoWithdraw(item.id)}
                                                    >
                                                        Withdraw
                                                    </Button>
                                                    <Button variant={'contained'} size={'small'}
                                                            onClick={() => handleGotoTrade(item.id)}
                                                    >
                                                        Trade
                                                    </Button>
                                                    <Button variant={'contained'} size={'small'}
                                                            onClick={() => handleOpenConvert(item)}
                                                    >   
                                                        Convert
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    }) : <TableLoading colSpan={6} />
                                    
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={exchangeWalletAccountInfo ? exchangeWalletAccountInfo.length : 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </CardContent>
            </Card>
            <Convert
                open={open}
                handleClose={handleCloseConvert}
                convertCrypto={convertCrypto}
            />
        </Box>
    )
} 

CryptoBalance.propType = {
    ExchangeWalletAccountInfo : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    exchangeWalletAccountInfo : state.wallet.exchangeWalletAccountInfo
})
const mapDispatchToProps = {
    ExchangeWalletAccountInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoBalance) ;