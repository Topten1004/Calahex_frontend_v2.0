import React from 'react' ;

import { connect } from 'react-redux' ;

import TradeSelect from './TradeSelect';
import MarketTrade from './MarketTrade';

import {
    Box ,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        borderLeft : "1px solid " + theme.palette.common.black
    }
}));

const Trade = (props) => {

    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <TradeSelect />
                </Grid>
                <Grid item xs={12}>
                    <MarketTrade />
                </Grid>
            </Grid>
        </Box>
    )
}
const mapStateToProps = state => ({

})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Trade) ;
