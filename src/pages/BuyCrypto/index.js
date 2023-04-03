

import React from 'react' ;

import { useEffect } from 'react';

// ___________ redux ________________
import { connect } from 'react-redux' ;
import { CryptoPairList } from '../../redux/actions/crypto';

import Payment from '../../components/BuyCrypto/Payment' ;
import CryptoInfo from '../../components/BuyCrypto/CryptoInfo';
import Loading from '../../components/Common/Loading';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.layout.headerHeight ,
        height : "calc(100vh - 60px)",

        overflow : "hidden" ,
        overflowY: "scroll" ,

        paddingBottom : "15px"
    }
}))

const BuyCrypto = (props) => {

    const classes = useStyles() ;

    const match1 = useMediaQuery("(min-width : 960px)");

    const {
        cryptoPairList ,
    } = props;

    return (
        <>
            {
                cryptoPairList ? <Box className={classes.root}>
                        <Grid container>
                            <Grid item xs={match1 ? 8 : 12}>
                                <CryptoInfo 
                                    cryptoPairList={cryptoPairList}
                                />
                            </Grid>
                            <Grid item xs={match1 ? 4 : 12}>
                                <Payment />
                            </Grid>
                        </Grid>
                    </Box> :
                    <Loading 
                        height={'100vh'}
                    />
            }
        </>
        
    )
}

const mapStateToProps = state => ({
    cryptoPairList : state.stream.cryptoPairList
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(BuyCrypto) ;