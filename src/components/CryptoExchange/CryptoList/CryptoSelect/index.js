


import React from 'react' ;

import CryptoLabel from './CryptoLabel';
import CryptoSearch from './CryptoSearch';

import {
    Box,
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        boxSizing : 'border-box',
    }
}))

const CryptoSelect = (props) => {
    
    const classes = useStyles() ;

    const {
        handleSearchCrypto
    } = props ;
    
    return (
        <Box className={classes.root}>
            <CryptoLabel 
                handleSearchCrypto={handleSearchCrypto}
            />
            <CryptoSearch 
                handleSearchCrypto={handleSearchCrypto}
            />
        </Box>
    )
}

export default CryptoSelect;