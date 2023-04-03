import React from 'react' ;

import { useEffect, useRef, useState } from 'react' ;

import { connect } from 'react-redux';

import CA1ToolTip from '../../../Common/CA1ToolTip';

import {
    Box ,
    TableContainer,
    Table,
    TableBody,
    TableRow ,
    TableCell
} from "@mui/material" ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        display : 'flex',
        justifyContent : 'flex-end',
        flexDirection : 'column',

        overflow : "hidden" ,

        height : props => {
            if(props.orderType === "both") return "calc(50vh - 105px)" ;
            if(props.orderType === "buy") return "0px" ;
            if(props.orderType === "sell") return "calc(100vh - 210px)" ;
        },

        borderBottom : "1px solid " + theme.palette.common.black ,
        borderTop : "1px solid " + theme.palette.common.black ,

        "& .MuiTableBody-root" : {
            borderTop : '1px solid ' + theme.palette.common.black,

            "& .MuiTableRow-root" : {
                position : "relative" ,
                cursor : 'pointer',
            },
            "& .MuiTableCell-root" : {
                padding : "5px" ,
                fontSize : "12px",
                textAlign : "right" ,
                width : "33.33%",
                color : '#b7bdc6',

                borderBottom : '1px solid ' + theme.palette.common.black
            }
        },
    },
    progress : {
        position : "absolute" ,
        backgroundColor : "#2c1e24" ,
        left : 0 ,
        top : 0,
        height : "100%" ,
        width : props => `${(Number(props.total) / Number(props.max) * 100.0)}%`,
        zIndex : "-1000" ,
    },
    price : {
        color : theme.palette.secondary.main + " !important"
    }
}));

let scrollTimer ;

const ProgressBar = ( { children, ...props } ) => {

    const classes = useStyles(props) ;

    return (
        <Box component={"td"} className={classes.progress} />
    )
}

const OrderSell = (props) => {
    
    const {
        cryptoDecimal,
        currentCrypto,
        cryptoOrderList,
        orderType,
        handleSelectedOrder
    } = props ;

    const classes = useStyles({
        orderType : orderType
    }) ;
    
    const [ sumInfo, setSumInfo ] = useState(null) ;
    const [ toolTipTop , setToolTipTop ] = useState(null) ;
    const [ toolTipLeft, setToolTipLeft ] = useState(null) ;
    const [ toolTipPop , setToolTipPop ] = useState(false) ;

    const bodyCtrl = useRef(null) ;

    const handleSelectRow = (row) => {
        handleSelectedOrder({
            orderPrice : Number(row.price),
            orderMethod : 'buy',
            orderAmount : Number(row.amount),
            orderTotal : Number(row.total),
            orderer_id : row.orderer_id
        })
    }

    const handleSumInfo = (e, row) => {
        const domRect = e.target.parentNode.getBoundingClientRect() ;

        setToolTipTop(domRect.top + domRect.height / 2) ;
        setToolTipLeft(domRect.right) ;
        setToolTipPop(true) ;
        setSumInfo(row) ;
    }
    useEffect(() => {
        scrollTimer = setTimeout(async () => {
            bodyCtrl.current.scrollIntoView({
                behavior : 'smooth',
                block : 'end'
            });
        } , 2000) ;

        return () => {
            clearTimeout(scrollTimer) ;
        }
    }, []) ;

    return (
        <Box className={classes.root}>
            <TableContainer >
                <Table ref={bodyCtrl}>
                    <TableBody id="buy" >
                        {
                            cryptoOrderList && cryptoOrderList.orderSellList.map((row , index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        onClick={() => handleSelectRow(row)}

                                        onMouseEnter={(e) => handleSumInfo(e , row)}
                                        onMouseLeave={() => setToolTipPop(false)}
                                    >
                                        <ProgressBar total={Number(row.price) - currentCrypto.price} max={Number(cryptoOrderList.orderSellList[0].price) - currentCrypto.price} />
                                        <TableCell className={classes.price}>{Number(row.price).toFixed(cryptoDecimal)}</TableCell>
                                        <TableCell>{Number(row.amount).toFixed(8)}</TableCell>
                                        <TableCell>{Number(row.total).toFixed(8)}</TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <CA1ToolTip
                top={toolTipTop}
                left={toolTipLeft}
                isPop={toolTipPop}
                info={sumInfo}
                crypto={currentCrypto && currentCrypto.crypto.symbol}
                pair={currentCrypto && currentCrypto.pair.symbol}
            />
        </Box>
    )
}

const mapStateToProps = state => ({
    cryptoDecimal : state.crypto.cryptoDecimal,
    currentCrypto : state.crypto.currentCrypto,
    cryptoOrderList : state.stream.cryptoOrderList
});

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSell) ;