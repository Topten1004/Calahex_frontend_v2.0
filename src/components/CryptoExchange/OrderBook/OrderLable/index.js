


import React from 'react' ;

import {
    Grid ,
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root : {
        boxSizing : "border-box" ,
        height : "30px",
        display : "flex" ,
        alignItems : "center",
        "& .MuiGrid-item" : {
            color : theme.palette.primary.main ,
            textAlign : "center" ,
            fontSize : "11px" ,
            fontWeight : "bold" ,
            textAlign : "right",
            cursor : 'pointer'
        }
    }
}));

const OrderLable = (props) => {

    const classes =  useStyles() ;
    
    const {
        currentCrypto 
    } = props ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={4}>
                    PRICE({currentCrypto && currentCrypto.pair.symbol})
                </Grid>
                <Grid item xs={4}>
                    AMOUNT({currentCrypto && currentCrypto.crypto.symbol})
                </Grid>
                <Grid item xs={4}>
                    TOTAL({currentCrypto && currentCrypto.pair.symbol})
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
export default connect(mapStateToProps, mapDispatchToProps)(OrderLable) ;