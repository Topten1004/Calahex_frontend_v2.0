import React, {useEffect} from 'react' ;

import {
    Box, 
    TableCell, 
    TableContainer, 
    TableHead,
    TableBody,
    Table,
    TableRow,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : '40px',
        marginLeft : '20px',
        marginRight : '20px',

        borderRadius : '10px',
        border : '2px solid ' + theme.palette.common.black,

        "& .MuiTableCell-root" : {
            padding : '5px',
            paddingLeft : '10px',
            paddingRight : '10px',
            textAlign : 'right',
            color : theme.palette.common.label,

            borderBottom : '1px solid ' + theme.palette.common.black
        },
        "& .MuiTableHead-root" : {
            "& .MuiTableCell-root" : {
                backgroundColor : theme.palette.common.lightBlack
            }
        },
        "& .MuiTableBody-root" : {
            cursor : 'pointer'
        }
    },
    account_type : {
        textTransform : 'capitalize'
    },
    head : {
        color : theme.palette.primary.main,
        textTransform : 'uppercase',
        textAlign : 'center',
        padding : '10px',
        fontWeight : 600,
        borderBottom : '1px solid lightgray' ,

        ['@media (max-width : 325px)'] : {
            fontSize : '12px'
        },
    },
    account : {
        cursor : 'pointer',
        color : theme.palette.common.buyPrice + ' !important',
        borderBottom : '1px dotted ' + theme.palette.common.buyPrice + ' !important',

        width : '120px !important',
    },
    total : {
        fontWeight : '600 !important'
    }
}))

const BalanceList = (props) => {

    const classes = useStyles() ;

    const {
        totalBalanceData,
        accountBalanceData,
        account_type,
        handleTransferCoin, handleTransferAmount
    } = props ;

    const handleClickCoin = (item) => {
        handleTransferAmount(item.available);
        handleTransferCoin(item.crypto.id)
    }
    return (
        <Box className={classes.root}>
            <Box className={classes.head}>
                {account_type} Account Balance
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Coin</TableCell>
                            <TableCell className={classes.account_type}> { account_type } </TableCell>
                            <TableCell>Total Balance</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            accountBalanceData && Object.entries(accountBalanceData).map(([id, item]) => {
                                return (
                                    <TableRow key={id}>
                                        <TableCell>{item.crypto.symbol}</TableCell>
                                        <TableCell sx={{minWidth : '150px !important'}}>
                                            <Box component={'span'} className={classes.account} 
                                                onClick={() => handleClickCoin(item)}
                                            >
                                                {Number(item.available).toFixed(4)} {item.crypto.symbol}
                                            </Box>
                                        </TableCell>
                                        <TableCell className={classes.total} sx={{minWidth : '150px !important'}}>
                                            {Number(totalBalanceData[id].available).toFixed(4)} {item.crypto.symbol}
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

export default BalanceList ;