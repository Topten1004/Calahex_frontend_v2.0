


import React from 'react' ;

import { useState } from 'react' ;

import CryptoSelect from './CryptoSelect';
import CryptoInfoList from './CryptoInfoList';

import {
    Box,
    Collapse,
} from '@mui/material';


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : theme.palette.background.default,
        position : 'absolute',
        zIndex : 1000,
        top : 0,
        overflow : "hidden",
        height : "100%" ,

        width : '100%'
    }
}))

const CryptoList = (props) => {
    
    const classes = useStyles() ;
    
    const {
        isVisibleCryptoList,
        handleCurrentCrypto, handleCryptoList
    } = props ;

    const [ searchCrypto , setSearchCrypto ] = useState('') ;

    const handleSearchCrypto = (value) => {
        setSearchCrypto(value);
    }

    return (
        <Collapse in={isVisibleCryptoList} unmountOnExit timeout={'auto'} >
            <Box className={classes.root}>
                <CryptoSelect 
                    handleSearchCrypto={handleSearchCrypto}
                />
                <CryptoInfoList 
                    searchCrypto={searchCrypto}
                    handleCurrentCrypto={handleCurrentCrypto}
                    handleCryptoList={handleCryptoList}
                />
            </Box>
        </Collapse>
    )
}

export default CryptoList;