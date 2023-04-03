import React from 'react' ;

import { useRef, useEffect } from 'react' ;
import { useMeasure } from "react-use";

import { connect } from 'react-redux';

// import { AdvancedRealTimeChart } from 'react-ts-tradingview-widgets' ;
import TradingViewWidget from 'react-tradingview-widget' ;

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        minHeight : "calc(50vh - 40px)",
        height : "calc(50vh - 40px)",
        borderBottom : "1px solid gray" ,

        overflow : "hidden"
    } ,
}));

const TradingView = (props) => {
    
    const classes = useStyles() ;

    const {
        currentCrypto
    } = props ;
    
    const viewCtrl = useRef() ;

    const [setRef, { width, height }] = useMeasure();

    useEffect(() => {
        setRef(viewCtrl.current);
    }, [])
  
    return (
        <Box className={classes.root} ref={viewCtrl}>
            <TradingViewWidget
                hide_legend
                allow_symbol_change={false}
                symbol={'POLONIEX:' + (currentCrypto ? currentCrypto.crypto.symbol+currentCrypto.pair.symbol : "ETHUSDT")}
                locale="en"
                width={width}
                height={height}
                theme={'Dark'}
            />
        </Box>
    )
}

const mapStateToProps = state => ({
    currentCrypto : state.crypto.currentCrypto
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(TradingView) ;