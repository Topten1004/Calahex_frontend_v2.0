import React from 'react' ;

import {connect} from 'react-redux' ;

import {
    Box ,
    TableContainer ,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        overflow : "hidden" ,
        overflowY : "scroll" ,
        boxSizing : "border-box" ,
        height : "calc( 100% - 65px)",

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
    pair : {
        width : '90px',
        color : theme.palette.common.label + ' !important'
    },
    up : {
        color : theme.palette.common.buyPrice + " !important"
    },
    down : {
        color : '#c74a4d !important'
    }
}));

const CryptoInfoList = (props) => {

    const classes = useStyles() ;

    const headFields = [
        "Pair" ,
        "Price" ,
        "Volume" ,
        "24H"
    ];

    const {
        cryptoDecimal,
        cryptoPairList, searchCrypto,
        handleCurrentCrypto, handleCryptoList
    } = props ;

    const handleClick = (e, _id) => {
        e.preventDefault() ;
        handleCurrentCrypto(_id);
        handleCryptoList();
    }
    
    return (
        <Box className={classes.root} >
            <TableContainer sx={{paddingRight:"5px"}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                headFields.map((field, index) => {
                                    return (
                                        <TableCell key={index}>{ field }</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.entries(cryptoPairList).filter(list => list[1].crypto.symbol.toLowerCase().search(searchCrypto.toLowerCase()) >= 0 || list[1].pair.symbol.toLowerCase().search(searchCrypto.toLowerCase()) >= 0).map(([id, row]) => {
                                return(
                                    <TableRow key={id} onClick={(e) => handleClick(e , id)}>
                                        <TableCell className={classes.pair}>{row.crypto.symbol} / {row.pair.symbol}</TableCell>
                                        <TableCell className={Number(row.percent) >= 0 ? classes.up : classes.down}>{Number(row.price).toFixed(cryptoDecimal)}</TableCell>
                                        <TableCell>{Number(row.baseVolume).toFixed(1)}</TableCell>
                                        <TableCell className={Number(row.percent) >= 0 ? classes.up : classes.down}>{Number(row.percent).toFixed(2)}%</TableCell>
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

const mapStateToProps = state => ({
    cryptoPairList : state.stream.cryptoPairList,
    cryptoDecimal : state.crypto.cryptoDecimal
})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CryptoInfoList) ;