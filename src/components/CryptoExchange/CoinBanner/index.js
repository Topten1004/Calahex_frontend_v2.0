import React, { useEffect } from 'react' ;

import { connect } from 'react-redux';

import {
    Box, 
    Grid, 
    Tooltip,
    useMediaQuery
} from '@mui/material' ;

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        boxSizing : "border-box" ,
        borderBottom :'2px solid ' + theme.palette.common.black,
        minHeight : "55px" ,

        display : "flex",
        alignItems : "center",

        backgroundColor : theme.palette.common.lightBlack ,

        "& .MuiGrid-item" : {
            textAlign : "right" ,
            paddingLeft: "15px" ,
            paddingRight : "15px",
        }
    } ,
    label : {
        paddingBottom : "5px" ,
        color : theme.palette.primary.main ,
        fontSize : "11px" ,
    } ,
    trade : {
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "flex-end" ,
        fontSize : "14px" ,
        color : theme.palette.common.label ,
        cursor : 'pointer'
    },
    coin : {
        display : "flex",
        alignItems : "flex-end",
        justifyContent : "center",

        flexDirection : "column !important"
    }
})) ;

const CoinBanner = (props) => {

    const classes = useStyles() ;

    const match1 = useMediaQuery("(min-width:985px)");
    const match2 = useMediaQuery("(min-width:960px)");
    const match3 = useMediaQuery("(min-width:775px)");
    const match4 = useMediaQuery("(min-width:530px)");
    const match5 = useMediaQuery("(min-width:315px)");

    const {
        handleCryptoList,
        isVisibleCryptoList,
        currentCrypto
    } = props ;

    const labelList = [
        {
            key : 'price' ,
            value : "Last Price"
        },
        {
            key : 'percent',
            value : '24h Change'
        },
        {
            key : 'low',
            value : '24h Low'
        },
        {
            key : 'high' ,
            value : '24h high'
        },
        {
            key : 'baseVolume',
            value : 'Volume'
        }
    ]

    return (
        <Box  className={classes.root}>
            <Grid container>
                {
                    match4  &&  <Grid item xs={match2 ? 3 : 5} className={classes.coin} >
                                    <Tooltip
                                        title={'Select Market'}
                                        placement={'bottom'}
                                        arrow
                                    >
                                        <Box  className={classes.trade} onClick={handleCryptoList}>
                                            {
                                                currentCrypto && currentCrypto.crypto.symbol + " / " + currentCrypto.pair.symbol
                                            }
                                            {
                                                isVisibleCryptoList ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                                            }
                                        </Box>
                                    </Tooltip>
                                    <Box  className={classes.label} sx={{marginRight : "24px"}}>
                                        {
                                            currentCrypto && currentCrypto.crypto.name
                                        }
                                    </Box>
                                </Grid>
                }
                <Grid item xs={match2 ? 9 : match4 ? 7 : 12}>
                    <Grid container>
                        {
                            labelList.map(( item , index ) => {
                                return (
                                    <Grid item key={index} xs={match1 ? 2.4 : match2 ? 3 : match3 ? 4 : match5 ? 6 : 12} >
                                        <Box component={"span"} className={classes.label} >
                                            { item.value }
                                        </Box>
                                        <Box component={"span"} className={classes.trade} >
                                            { currentCrypto && Number( currentCrypto[item.key] ).toFixed(10) }
                                            {
                                                item.key === 'percent' && ' %'
                                            }
                                        </Box>
                                    </Grid>
                                )
                            })
                        }
                        {
                            !match4 &&  <Grid item xs={match5 ? 6 : 12} >
                                             <Box  className={classes.trade} onClick={handleCryptoList}>
                                                {
                                                    currentCrypto && currentCrypto.crypto.symbol + " / " + currentCrypto.pair.symbol
                                                }
                                                {
                                                    isVisibleCryptoList ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />
                                                }
                                            </Box>
                                            <Box  className={classes.label} sx={{marginRight : "24px"}}>
                                                Tether
                                            </Box>
                                        </Grid>
                        }
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(CoinBanner) ;