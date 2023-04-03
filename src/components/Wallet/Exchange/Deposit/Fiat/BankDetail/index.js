
import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useLocation } from 'react-router-dom';

import PaidIcon from '@mui/icons-material/Paid';
import EuroIcon from '@mui/icons-material/Euro';

import {
    Box,
    Card,
    CardHeader,
    CardContent,
    TextField,
    InputAdornment,
    Button,
    FormControl,
    InputLabel
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
            padding :5
        }
    },
    title : {
        minWidth : "100%",
        marginBottom : "15px",
        fontWeight : "bold",

        color : theme.palette.common.label
    },
    description : {
        fontSize : "12px",
        fontWeight : "bold",

        border : "1px solid" ,
        borderColor : theme.palette.primary.main,
        borderRadius : '10px',
        padding : "10px",

        marginBottom : 15

    },
    icon : {
        display : "flex" ,
        alignItems : "center",

        color : theme.palette.primary.main
    },
    balance : {
        fontSize : 15,

        display :"flex",
        justifyContent : "space-between"
    },
    notes : {
        marginTop : "20px"
    },
    noteTitle : {
        fontWeight : "bold",
        fontSize : "14px"
    },
    noteList : {
    },
    item : {
        fontSize : "12px"
    }
}))

const BankDetail = (props) => {
    
    const classes = useStyles() ;
    const [ amount, setAmount ] = useState(0);
    const [ isDisableAmount, setIsDisableAmount ] = useState(false) ;

    const location = useLocation() ;

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

    useEffect(() => {
        if(location.state && location.state.amount) {
            setAmount(Number(location.state.amount)) ;
            setIsDisableAmount(true);
        }
    }, []);

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
                        <Box className={classes.description}>
                            For this payment method, USD is automatically stored as USDT in a 1:0.90 ratio.
                        </Box>

                        <FormControl
                            fullWidth
                        >
                            <TextField 
                                variant='standard'
                                size='small'
                                value={amount}
                                disabled={isDisableAmount}
                                
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                                {
                                                    currency== 1 ? <PaidIcon /> : (currency === 2 ? <EuroIcon /> : 'ƒ')
                                                }
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </FormControl>
                        
                        <Box className={classes.balance}>
                            <Box component={'span'}>
                                You will get:
                            </Box>
                            <Box component={'span'} sx={{fontWeight:"bold"}}>
                                0.005 { currencyList[currency-1] }
                            </Box>
                        </Box>


                        <Box className={classes.notes}>
                            <Box className={classes.noteTitle}>Important notes.</Box>
                            <Box className={classes.noteList}>
                                <Box component={'ul'}>
                                    {
                                        noteList.map((item, index) => {
                                            return (
                                                <Box component={'li'} key={index} className={classes.item}>
                                                    { item }
                                                </Box>
                                            )
                                        })
                                    }
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{textAlign : "center"}}>
                            <Button variant={'contained'} size={'small'}>Continue</Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default BankDetail;