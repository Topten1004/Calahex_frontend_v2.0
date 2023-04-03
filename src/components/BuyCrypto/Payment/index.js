import React from "react";

import { useState } from 'react' ;
import { useNavigate } from 'react-router-dom';

// __________ redux ___________
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ExchangeFiatDeposit } from '../../../redux/actions/wallet';

import clsx from 'clsx' ;
import swal from 'sweetalert' ;

import visaImg from '../../../assets/newcard.png' ;
import bankImg from '../../../assets/bank.png' ;

import PaidIcon from '@mui/icons-material/Paid';
import EuroIcon from '@mui/icons-material/Euro';

import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    TextField,
    InputAdornment ,
    Select ,
    MenuItem,
    FormControl,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 60px)" ,

        paddingLeft : "10px" ,
        paddingRight : "10px",
        paddingTop : "82px",
        
        "& .MuiCard-root" : {
            minHeight : "420px",
            boxSizing : "border-box",

            background : theme.palette.background.default
        },
        "& .MuiInputBase-root" : {
            border : "none !important"
        },
        "& .MuiCardHeader-title" : {
            fontSize : "20px",
            fontWeight : 600
        },
    },
    cardContainer: {
        border : "1px solid " + theme.palette.common.label ,
        width :"100%",
    },
    card : {
        border : "1px solid gray" ,

        display : "flex" ,
        alignItems : "center",

        marginTop : "15px" ,
        marginBottom : "15px" ,
        paddingLeft : "20px",

        borderRadius : "10px" ,
        minHeight : "100px",

        cursor : 'pointer'
    } ,
    active : {
        backgroundColor : theme.palette.common.lightBlack ,
        border : '1px solid ' + theme.palette.common.label
    },
    label : {
        minWidth : "70px" ,
        fontWeight : "bold",

        color : theme.palette.primary.main,
        cursor : 'pointer'
    } ,
    cardImg : {
        display : "flex" ,
        alignItems : "center",
        justifyContent : "center" ,
        
        width : "calc(100% - 70px)"
    },
    icon : {
        display : "flex" ,
        alignItems : "center",

        color : theme.palette.primary.main
    },
    title : {
        borderBottom : '1px solid ' + theme.palette.common.black,
        color : theme.palette.primary.main,
    }
}))

const Payment = (props) => {

    const classes = useStyles() ;
    const match1 = useMediaQuery("(min-width : 400px)");
    const navigate = useNavigate() ;

    const [ selectedCard , setSelectedCard ] = useState(0) ;
    const [ currency, setCurrency ] = useState("USD") ;
    const [ amount,  setAmount ] = useState(0) ;

    const {
        userInfo , ExchangeFiatDeposit
    } = props ;
    
    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value) ;
    }

    const handleAmount = (e) => {
        setAmount(parseFloat(Number(e.target.value))) ;
    }
    const handleBuy = async () => {
        if( amount <= 0 ) {
            return swal({
                title : "Warning",
                text : "Underflow Amount.",
                icon : 'warning',
                buttons : false ,
                timer : 3000
            })
        }

        if(selectedCard == 1){
            navigate('/wallet' , {
                state : {
                    userInfo : userInfo,
                    currency : currency,
                    amount : amount,
                    selectedSideTab : 22,
                    selectedDepositTab : 2,
                }
            });
        } else {
           await ExchangeFiatDeposit(currency, amount) ;
        }
    }

    return (
        <Box  className={classes.root}>
            <Card className={classes.cardContainer}>
                <CardHeader
                    title={'Buy Crypto'}
                    className={classes.title}
                />
                <CardContent>
                    <TextField 
                        fullWidth
                        size={'small'}
                        type={'number'}
                        label={'Amount'}
                        value={amount}
                        onChange={handleAmount}

                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Box  className={classes.icon}>
                                        {
                                            currency == "USD" ? <PaidIcon /> : (currency === "EUR" ? <EuroIcon /> : "ƒ")
                                        }
                                    </Box>
                                    <FormControl variant="standard" sx={{marginLeft : "5px"}}>
                                        <Select
                                            disableUnderline
                                            value={currency}
                                            onChange={handleChangeCurrency}
                                        >
                                            <MenuItem value="USD">USD</MenuItem>
                                            <MenuItem value="EUR">EUR</MenuItem>
                                            <MenuItem value="AWG">AWG</MenuItem>
                                        </Select>
                                    </FormControl>
                                </InputAdornment>
                            ),
                            inputProps : {
                                min : 0,
                            }
                        }}
                    />
                    <Box  className={clsx( classes.card , selectedCard === 0 ? classes.active : "")} onClick={() => setSelectedCard(0)}>
                        <Box component={"span"} className={classes.label}>
                            Pay With
                        </Box>
                        <Box  className={classes.cardImg}>
                            <Box component={"img"} src={visaImg} height={match1 ? 50 : 30}/>
                        </Box>
                    </Box>
                    <Box className={clsx(classes.card , selectedCard == 1 ? classes.active : "")} onClick={() => setSelectedCard(1)}>
                        <Box component={"span"} className={classes.label}>
                            Pay With
                        </Box>
                        <Box  className={classes.cardImg}>
                            <Box component={"img"} src={bankImg} height={match1 ? 55 : 40} />
                        </Box>
                    </Box>
                    <Button variant={"contained"} fullWidth onClick={handleBuy}>Buy USDT</Button>
                </CardContent>
            </Card>
        </Box>
    )
}

Payment.propTypes = {
    ExchangeFiatDeposit : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    userInfo : state.auth.userInfo
})

const mapDispatchToProps = {
    ExchangeFiatDeposit
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment) ;