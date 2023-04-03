
import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom';

import {
    FormControl,
    Select,
    InputLabel,
    MenuItem
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
    currencyCtrl : {
        minWidth : "100% !important"
    },
}))

const CurrencySelect = (props) => {
    
    const {
        currency ,
        handleCurrency
    } = props ;

    const classes = useStyles() ;
    const location = useLocation();

    const [isDisableSelect, setIsDisableSelect] = useState(false);

    const currencyList = [
        "USD",
        "EUR",
        "AWG"
    ]
    
    useEffect(() => {
        if(location.state && location.state.currency){
            setIsDisableSelect(true)
        }
    }, [])
    
    return (
        <FormControl variant="outlined" className={classes.currencyCtrl}>
            <InputLabel >Currency</InputLabel>
            <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                size={'small'}
                value={currency}
                onChange={(e)=>handleCurrency(e.target.value)}
                label="Currency"
                disabled={isDisableSelect}
            >
                {
                    currencyList.map((currency , index) => {
                        return (
                            <MenuItem key={index} value={index+1}>{currency}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>
    )
}

export default CurrencySelect;