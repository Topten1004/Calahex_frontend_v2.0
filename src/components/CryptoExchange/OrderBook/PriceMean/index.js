import React from 'react' ;

import { connect } from 'react-redux';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,

        height : "30px" ,
        
        fontSize : "14px" ,
        fontWeight : "bold" ,
        color : props => `${props.color}`,

        cursor : 'pointer'
    }
}));

const PriceMean = (props) => {
    
    const classes = useStyles({color :  "#b7bdc6"}) ;

    const {
        currentCrypto,
    } = props ;
    
    return (
        <Box className={classes.root} >
            { currentCrypto && Number(currentCrypto.price).toFixed(8) + " " + currentCrypto.pair.symbol }
        </Box>
    )
}

const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceMean) ;