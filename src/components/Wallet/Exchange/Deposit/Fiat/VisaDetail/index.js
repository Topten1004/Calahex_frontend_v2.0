
import React from 'react' ;

import { useState } from 'react' ;

import PaidIcon from '@mui/icons-material/Paid';
import EuroIcon from '@mui/icons-material/Euro';

import {
    Box,
    Card,
    CardHeader,
    CardContent,
    TextField,
    InputAdornment,
    Button
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "20px",
        display : "flex" ,
        justifyContent : "center",
        alignItems : "center" ,

        flexDirection : "column",

        "& .MuiCard-root" : {
            borderRadius : "10px",
            border : "2px solid " + theme.palette.common.black,
            backgroundColor : theme.palette.background.default,
            color : theme.palette.common.label
        },
        "& .MuiCardHeader-root" : {
            background : theme.palette.background.default + " !important",
            borderBottom : '2px solid ' + theme.palette.common.black
        },
        "& .MuiCardHeader-title" : {
            fontSize : 15,
            fontWeight : "bold",
        },

        "& .MuiTextField-root" : {
            padding : 10
        }
    },
    title : {
        minWidth : "100%",
        marginBottom : "15px",
        fontWeight : "bold",

        color : theme.palette.common.label
    },
    icon : {
        display : "flex" ,
        alignItems : "center",

        color : theme.palette.primary.main
    },
    balance : {
        fontSize : 15,

        marginBottom : "20px"
    },
}))

const VisaDetail = (props) => {
    
    const classes = useStyles() ;
    const {
        currency
    } = props ;

    const currencyList = [
        "USD",
        "EUR",
        "AWG"
    ]

    const noteList = [
        "You can find your deposited amount in your Wallet Exchange Crypto Balance.",
        "Bank transfer fee depend on the bank you use.",
        "The arrival time of your deposit depends on the region of your sending bank",
        "Usually it takes a couple of minutes."
    ]

    return (
        <Box className={classes.root}>
            <Box className={classes.title}>
                2.Payment details
            </Box>

            <Box sx={{width : "100%"}}>
                <Card>
                    <CardHeader 
                        title={'Enter Amount'}
                    />
                    <CardContent>
                        <TextField 
                            fullWidth
                            size={'small'}
                            variant={'standard'}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Box className={classes.icon}>
                                            {
                                                currency== 1 ? <PaidIcon /> : (currency === 2 ? <EuroIcon /> : 'ƒ')
                                            }
                                        </Box>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box className={classes.balance}>
                            Amount should be between 50 and 5,000
                        </Box>

                        <Box sx={{textAlign : "center"}}>
                            <Button variant={'contained'} size={'small'}>Deposit</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default VisaDetail;