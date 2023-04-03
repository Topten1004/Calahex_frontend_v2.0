
import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom' ;

import Method from './Method' ;
import BankDetail from './BankDetail';
import VisaDetail from './VisaDetail';
import FiatHistory from './FiatHistory';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    root : {
      paddingLeft : "20px",
      paddingRight : "20px"
    },
}))

const Fiat = () => {
    
    const classes = useStyles() ;
    const location = useLocation() ;

    const match1 = useMediaQuery('(min-width : 680px)') ;

    const [ methodType, setMethodType ] = useState(1);
    const [ currency , setCurrency ] = useState(1) ;

    const handleMethodType = (type) => {
        setMethodType(type) ;
    }

    const handleCurrency = (value) => {
        setCurrency(value);
    }

    useEffect(() => {
        if(location.state) {
            switch(location.state.currency) {
                case "USD" :
                    setCurrency(1);
                    break ;
                case "EUR" :
                    setCurrency(2);
                    break;
                case "AWG" :
                    setCurrency(3);
                    break;
                default:
                    break;
            }
        }
    },[]) ;

    return (
        <Box  className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={match1 ? 6 : 12}>
                    <Method 
                        methodType={methodType}
                        currency={currency}
                        handleMethodType={handleMethodType}
                        handleCurrency={handleCurrency}
                    />
                </Grid>
                <Grid item xs={match1 ? 6 : 12}>
                    {
                        methodType === 1 ? <BankDetail 
                            currency={currency}
                        /> : <VisaDetail 
                            currency={currency}
                        />
                    }
                </Grid>
            </Grid>

            <Grid container>
                <Grid item xs={12}>
                    <FiatHistory />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Fiat;