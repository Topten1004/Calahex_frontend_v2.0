import React from 'react' ;

import { useState } from 'react' ;

import CryptoBalance from './CryptoBalance' ;

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import {
    Box, 
    Button,
    Collapse,
    FormControl,
    Select,
    MenuItem
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,

        overflow : "hidden" ,
        overflowY : "scroll",

        "& svg" : {
            color : theme.palette.common.label
        }
    },
    header : {
        minHeight : "60px",

        borderBottom : "1px solid gray" ,
        fontSize : "14px" ,
        padding : "15px",

        "& .MuiButtonBase-root" : {
            textTransform : "capitalize",
            fontWeight : "bold",
            "& svg" : {
                color : "black !important"
            }
        }
    },
    hide : {
        borderRadius : "10px",
        padding : "20px",
        margin : "15px",

        display : "flex",
        flexDirection : "column",
        alignItems:"flex-start",

        backgroundColor : theme.palette.common.lightBlack,
        color : theme.palette.common.label,

        overflow : "hidden"
    },
    estimate : {
        fontSize : "13px",
        marginBottom : "10px"
    },
    number : {
        marginRight : "10px",
        fontWeight : "bold"
    },
    wallet : {
        fontWeight : "bold" ,
        fontSize : "18px",
        marginRight : "20px",

        color : theme.palette.primary.main
    }
}))

const ExchangeWallet = (props) => {
    const classes = useStyles() ;

    const [ isVisible , setIsVisible ] = useState(true) ;
    const [ currency,  setCurrency ] = useState(1);

    const {
        handleChangeTab,
        setIsDrawerSider
    } = props ;

    const currencyList = [
        "USD",
        "EUR",
        "AWG"
    ]
    return (
        <Box className={classes.root}>

            <Box className={classes.header}>
                <Box component={'span'} className={classes.wallet}>
                    Exchange Wallet
                </Box>
                <Button 
                    startIcon={!isVisible ? <VisibilityIcon /> : <VisibilityOffIcon/>}
                    variant='contained' color={'inherit'} size={'small'}
                    onClick={() => setIsVisible(!isVisible)}
                >
                    {
                        !isVisible ? "Show " : "Hide "
                    }
                    Balance
                </Button>
            </Box>

            <Collapse unmountOnExit timeout={"auto"} in={isVisible}>
                <Box className={classes.hide}>

                    <Box component='span' className={classes.estimate}>Estimated Balance</Box>

                    <Box className={classes.balance}>
                        <Box component='span' className={classes.number}>316.93865418</Box>
                        <FormControl>
                            <Select
                                size={'small'}
                                value={currency}
                                variant={'standard'}
                            >
                                {
                                    currencyList.map((item ,index) => {
                                        return(
                                            <MenuItem key={index} value={index+1}>{item}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    
                </Box>
                
            </Collapse>
            
            <CryptoBalance 
                handleChangeTab={handleChangeTab}
                setIsDrawerSider={setIsDrawerSider}          
            />

        </Box>
    )
}

export default ExchangeWallet;