
import React from 'react' ;

import {
    Box, 
    Button, 
    Card,
    CardContent,
    Grid,
    useMediaQuery,
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiCard-root" : {
            margin : "15px",
            border : "2px solid " + theme.palette.common.black,

            backgroundColor : theme.palette.common.lightBlack
        }
    },
    title : {
        fontSize : "14px"
    },
    balance : {
        fontSize : "10px"
    },
    amount : {
        marginTop : '10px',
        display : 'flex',
        alignItems : 'center',
    },
    number : {
        marginRight : "10px",
        fontWeight : "bold",

        display : 'flex',
        alignItems : 'center'
    },
    description : {
        marginTop : "10px",
        fontSize : "11px"
    },
    account : {
        borderRadius : "5px",
        backgroundColor : "#e8e8e8",
        padding : "25px",

        backgroundColor : "#474d57",
        border : '1px solid ' + theme.palette.common.black,

        color : theme.palette.common.label
    },
    btGroup : {
        marginTop : "10px",
        "& .MuiButtonBase-root" : {
            borderRadius : "15px",
            marginLeft : "10px",
            marginRight : "10px",

            textTransform : "capitalize"
        }
    },
    symbol : {
        fontSize : "12px"
    }
}))

const AccountCard = (props) => {

    const {
        handleChangeTab,
        balance,
        account_name
    } = props ;

    const match3 = useMediaQuery("(min-width : 550px)") ;

    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Card>
                <CardContent>
                    <Grid container>
                        <Grid item xs={ match3 ? 6 : 12} className={classes.account}>
                            <Box className={classes.title}>
                                { account_name && account_name.toUpperCase() } Account
                            </Box>
                            <Box className={classes.balance}>
                                { account_name && account_name.toUpperCase() } Balance
                            </Box>
                            <Box className={classes.amount}>
                                <Box className={classes.number}>
                                    { 
                                        balance !== null ? Number(balance).toFixed(4) 
                                                : <CircularProgress size={20} />
                                    }
                                </Box>
                                <Box className={classes.symbol}>USDT</Box>
                            </Box>
                            <Box className={classes.description} >
                                This is your spot trading account.Simply transfer funds to start trading on the world's coolest crypto exchange instantly!
                            </Box>
                            <Box className={classes.btGroup}>
                                <Button variant='contained' size='small' onClick={() => handleChangeTab(account_name+'Deposit')}>Deposit</Button>
                                <Button variant='contained' size='small' onClick={() => handleChangeTab(account_name+'Withdraw')}>Withdraw</Button>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>
                    
                </CardContent>
            </Card>
        </Box>
    )
}

export default AccountCard;