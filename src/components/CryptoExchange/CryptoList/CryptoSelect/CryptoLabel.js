


import React from 'react' ;

import { useState } from 'react' ;

import StarPurple500Icon from '@mui/icons-material/StarPurple500';

import {
    Box,
    Grid
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : 'flex' ,
        alignItems : 'center',

        borderBottom : '2px solid ' + theme.palette.common.black,
        boxSizing : 'border-box',
        height : '35px',
        background : theme.palette.background.default,
        color : theme.palette.common.label,

        "& .MuiGrid-item" : {
            textAlign : 'center',
            fontSize : "12px" ,
            cursor : 'pointer',
            "& .MuiSvgIcon-root" : {
                fontSize : '16px'
            }
        }
    },
    active : {
        backgroundColor : theme.palette.common.lightBlack + ' !important',
    }
}))

const CryptoLabel = (props) => {
    
    const classes = useStyles() ;

    const {
        handleSearchCrypto
    } = props ;

    const [ selectedCrypto, setSelectedCrypto ] = useState();

    const handleSelectedCrypto = (value) => {
        setSelectedCrypto(value) ;
        handleSearchCrypto(value) ;
    }
    
    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={3}>
                    <StarPurple500Icon />
                </Grid>
                <Grid item xs={3}>
                    <Box className={selectedCrypto === "USDT" && classes.active} onClick={() => handleSelectedCrypto('USDT')}>
                        USDT
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={selectedCrypto === "BTC" && classes.active} onClick={() => handleSelectedCrypto('BTC')}>
                        BTC
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Box className={selectedCrypto === "ETH" && classes.active} onClick={() => handleSelectedCrypto('ETH')}>
                        ETH
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CryptoLabel;