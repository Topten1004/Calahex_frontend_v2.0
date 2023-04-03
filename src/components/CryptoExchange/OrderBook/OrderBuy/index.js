import React, { useState } from 'react' ;

import { connect } from 'react-redux';

import CA1ToolTip from '../../../Common/CA1ToolTip';

import {
    Box ,
    TableContainer,
    Table,
    TableBody,
    TableRow ,
    TableCell,
} from "@mui/material" ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        overflow : "hidden" ,
        overflowY : "scroll" ,

        height : props => {
            if(props.orderType === "both") return "calc(50vh - 105px)" ;
            if(props.orderType === "sell") return "0px" ;
            if(props.orderType === "buy") return "calc(100vh - 210px)" ;
        },

        borderBottom : "1px solid " + theme.palette.common.black ,
        borderTop : "1px solid " + theme.palette.common.black ,

        "& .MuiTableBody-root" : {
            borderTop : '1px solid ' + theme.palette.common.black,

            "& .MuiTableRow-root" : {
                position : "relative" ,
            },
            "& .MuiTableCell-root" : {
                padding : "5px" ,
                fontSize : "12px",
                textAlign : "right" ,
                width : "33.33%",
                cursor : 'pointer',
                color : '#b7bdc6',

                borderBottom : '1px solid ' + theme.palette.common.black
            }
        },
    },
    progress : {
        position : "absolute" ,
        backgroundColor : "#152b28" ,
        left : 0 ,
        top : 0,
        height : "100%" ,
        width : props => `${props.total * 100 / props.max}%`,
        zIndex : "-1000" ,
    },
    price : {
        color : "#0fb876 !important"
    }
}));

const ProgressBar = ( { children, ...props } ) => {
    const classes = useStyles(props) ;

    return (
        <Box component={"td"} className={classes.progress} />
    )
}

const OrderBuy = (props) => {
    
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

    const handleSelectRow = (row) => {
        handleSelectedOrder({
            orderPrice : Number(row.price),
            orderMethod : 'sell',
            orderAmount : Number(row.amount),
            orderTotal : Number(row.total) ,
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

    return (
        <Box className={classes.root}>
            <TableContainer>
                <Table>
                    <TableBody id='sell'>
                        {
                            cryptoOrderList && cryptoOrderList.orderBuyList.map((row , index) => {
                                return (
                                    <TableRow 
                                        key={index} 
                                        onClick={() => handleSelectRow(row)}

                                        onMouseEnter={(e) => handleSumInfo(e , row)}
                                        onMouseLeave={() => setToolTipPop(false)}
                                    >
                                        <ProgressBar 
                                            total={currentCrypto.price - Number(row.price)} 
                                            max={currentCrypto.price - cryptoOrderList.orderBuyList[cryptoOrderList.orderBuyList.length - 1].price} 
                                        />
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
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(OrderBuy) ;