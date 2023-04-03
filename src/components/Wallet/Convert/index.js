import React,{useEffect, useState} from 'react' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types' ;
import { CryptoConvert, WalletAccountInfo, ExchangeWalletAccountInfo, WholeCryptoBalance } from '../../../redux/actions/wallet' ;

import * as config from '../../../static/constants';

import swal from 'sweetalert';

import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    FormControl,
    Select,
    InputLabel,
    InputAdornment,
    MenuItem,
    Button,
    Divider,
    ListSubheader
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        
    },
    dlgPaper : {
        "& .MuiGrid-item" : {
            marginBottom : 20
        },
        width : '50%',
        background : theme.palette.background.default + " !important",
        color : theme.palette.common.label + " !important",
        boxShadow : '1px 1px 8px 0px gray !important',

        // label css style
        "& .MuiInputAdornment-root" : {
            "& p" :{
                color : theme.palette.common.label
            } 
        },
        "& .MuiInputLabel-root" : {
            color : theme.palette.common.label + " !important",
        },

        // form control background style
        "& .MuiFormControl-root" : {
            background : "#2a2d35",
            borderRadius : 5,
            "& svg" :{
                color : 'white'
            }
        },

        // when hover border color style
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.common.black,
            },
            '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
                border : '1px solid ' + theme.palette.primary.main + '!important'
            },
        },

        // textfield color style or disabled color style
        "& .MuiInputBase-input" :{
            color : 'white !important',
            display : 'flex !important',
            alignItems : 'center !important',
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: '#848e9c',
        },
        "& .MuiButtonBase-root" : {
            "&.Mui-disabled": {
                backgroundColor : theme.palette.common.lightBlack,
                color : theme.palette.common.disabledBlack
            }
        },
        "& .MuiFormHelperText-root" : {
            background : theme.palette.background.default,
            margin : '0px !important'
        }
    }
})) ;

const Convert = (props) => {
    const classes = useStyles() ;

    const {
        open,
        handleClose,
        convertCrypto,
        CryptoConvert,
        WholeCryptoBalance,
        WalletAccountInfo,
        ExchangeWalletAccountInfo
    } = props ;

    const [ exchangeCryptoBalance, setExchangeCryptoBalance ] = useState(null) ;
    const [ exchangePairBalance, setExchangePairBalance ] = useState(null) ;

    const [ openPairList, setOpenPairList ] = useState(false) ;

    const [ convertPair, setConvertPair ] = useState(false) ;
    const [ convertAmount, setConvertAmount ] = useState(0) ;
    const [ convertTotal, setConvertTotal ] = useState(0) ;
    const [ convertFoucs, setConvertFocus ] = useState('pairCtrl') ;

    const handleConvertPercent = (percent) => {
        handleConvertAmount(Number(convertCrypto.available) * Number(percent) );
        console.log(Number(Number(convertCrypto.pair[convertPair].price)));
        handleConvertTotal(Number(Number(convertCrypto.pair[convertPair].price)) * Number(convertCrypto.available) * Number(percent));
    }

    const handleConvertAmount = (amount) => {
        if(Number(amount) > convertCrypto.available) {
            return swal({
                title : 'Warning',
                text : "Inffucient Funds",
                buttons : false,
                timer : 5000,
                icon : 'warning'
            })
        }

        setConvertAmount(Number(amount)) ;
    }

    const handleConvertTotal = ( total ) => {
        setConvertTotal(Number(total)) ;
    }

    const handleConvertFocus = (focus) => {
        setConvertFocus(focus) ;
    }

    const handleConvertPair = (pair_id) => {
        setConvertPair(pair_id) ;
    }

    const handleConvertPrice = (price) => {
        if(convertFoucs === 'pairCtrl') {
            handleConvertTotal(price * Number(convertAmount)) ;
        }
    }

    const handleConvertSubmit = async () => {
        await CryptoConvert(convertCrypto.id, convertPair, convertAmount) ;
        handleClose() ;
        WholeCryptoBalance() ;
        WalletAccountInfo() ;
        ExchangeWalletAccountInfo() ;
    }

    useEffect(() => {
        if(convertFoucs === 'totalCtrl') {
            handleConvertAmount(Number(convertCrypto.pair[convertPair].price) ? Number(convertTotal) / (convertCrypto.pair[convertPair].price) : 0) ;
        }
    }, [convertTotal]) ;

    useEffect(() => {
        if(convertFoucs === 'amountCtrl') {
            handleConvertTotal(Number(convertCrypto.pair[convertPair].price) * Number(convertAmount)) ;
        }
    }, [convertAmount]) ;

    useEffect(() => {
        if(convertCrypto) {
            handleConvertPair(Object.keys(convertCrypto.pair)[0]) ;
        }
    }, [convertCrypto]) ;

    useEffect(() =>{
        if(convertPair) handleConvertTotal(Number(convertCrypto.pair[convertPair].price) * Number(convertAmount));
    }, [convertPair]) ;

    useEffect(() => {
        if(!open) {
            handleConvertPair(null) ;
        }
    }, [open]) ;

    return (
        <Box className={classes.root}>
            {
                (convertCrypto && convertPair )&&  <Dialog
                    open={open}
                    onClose={handleClose}
                    classes={{
                        paper : classes.dlgPaper
                    }}
                >
                    <DialogTitle >
                        Convert
                    </DialogTitle>
                    <Divider 
                        sx={{bgcolor : 'lightgray !important'}}
                    />
                    <DialogContent>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                disabled
                                size='small'
                                label='From Coin'

                                value={convertCrypto.symbol}
                            />
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <FormControl
                                    fullWidth
                                >
                                    <InputLabel>To Coin</InputLabel>
                                    <Select 
                                        label='To Coin'
                                        size='small'

                                        value={convertPair}
                                        onChange={(e) => handleConvertPair(e.target.value)}
                                        onFocus={() => handleConvertFocus('pairCtrl')}
                                        onBlur={() => handleConvertFocus(null)}

                                        // MenuProps={{
                                        //     autoFocus : false
                                        // }}
                                    >
                                        
                                        {/* <ListSubheader>
                                            <TextField
                                                size="small"
                                                // Autofocus on textfield
                                                autoFocus
                                                placeholder="Symbol to search..."
                                                fullWidth
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SearchIcon />
                                                        </InputAdornment>
                                                    )
                                                }}
                                                onChange={(e) => handleSearchValue(e.target.value)}
                                                onKeyDown={(e) => {
                                                    if (e.key !== "Escape") {
                                                        // Prevents autoselecting item while typing (default Select behaviour)
                                                        e.stopPropagation();
                                                    }
                                                }}
                                            />
                                        </ListSubheader> */}
                                        {
                                            Object.entries(convertCrypto.pair).map(([id, item]) => {
                                                return (
                                                    <MenuItem value={id} key={id}>
                                                        <Box component={'img'} src={`${config.PUBLIC_CA1EX_API}${item.logo}`} 
                                                                width={20} height={20}
                                                        />&nbsp;&nbsp;&nbsp;{item.symbol}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label='Price'
                                    size='small'
                                    type='number'
                                    color=''

                                    value={convertCrypto.pair[convertPair].price}
                                    onChange={(e) => handleConvertPrice(e.target.value)}
                                    onFocus={() => handleConvertFocus('priceCtrl')}
                                    onBlur={() => handleConvertFocus(null)}

                                    InputProps={{
                                        endAdornment : <InputAdornment position='end'>
                                            { }
                                        </InputAdornment>,
                                        inputProps : {
                                            min : 0,
                                        }
                                    }}

                                    disabled
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label='Amount'
                                    size='small'
                                    type='number'

                                    value={convertAmount}
                                    onChange={(e) => handleConvertAmount(e.target.value)}
                                    onFocus={() => handleConvertFocus('amountCtrl')}
                                    onBlur={() => handleConvertFocus(null)}

                                    InputProps={{
                                        endAdornment : <InputAdornment position='end'>
                                            { convertCrypto.symbol }
                                        </InputAdornment>,
                                        inputProps : {
                                            min : 0,
                                        }
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={3}>
                                <Button variant='contained' size='small' fullWidth onClick={() => handleConvertPercent(0.25)}>25%</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant='contained' size='small' fullWidth onClick={() => handleConvertPercent(0.5)}>50%</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant='contained' size='small' fullWidth onClick={() => handleConvertPercent(0.75)}>75%</Button>
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant='contained' size='small' fullWidth onClick={() => handleConvertPercent(1)}>100%</Button>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label='Total'
                                    size='small'
                                    type='number'
                                    value={convertTotal}

                                    onChange={(e) => handleConvertTotal(e.target.value)}
                                    onFocus={() => handleConvertFocus('totalCtrl')}
                                    onBlur={() => handleConvertFocus(null)}

                                    InputProps={{
                                        endAdornment : <InputAdornment position='end'>
                                            { convertCrypto.pair[convertPair].symbol }
                                        </InputAdornment>,
                                        inputProps : {
                                            min : 0,
                                        }
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    label='Available'
                                    size='small'
                                    type='number'
                                    value={convertCrypto.available}

                                    InputProps={{
                                        endAdornment : <InputAdornment position='end'>
                                            { convertCrypto.symbol }
                                        </InputAdornment>,
                                        inputProps : {
                                            min : 0
                                        }
                                    }}
                                    disabled
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} >
                                Transaction Fee : { convertCrypto.transaction_fee } %
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button variant={'contained'} size={'small'}
                                onClick={() => handleConvertSubmit()}
                        >
                            Convert
                        </Button>
                    </DialogActions>
                </Dialog>
            }
        </Box>
    )
}

Convert.propTypes = {
    CryptoConvert : PropTypes.func.isRequired,
    WholeCryptoBalance : PropTypes.func.isRequired,
    WalletAccountInfo : PropTypes.func.isRequired,
    ExchangeWalletAccountInfo : PropTypes.func.isRequired
}

const mapStateToProps = state => ({

}) ;
const mapDispatchToProps = {
    CryptoConvert,
    WholeCryptoBalance,
    WalletAccountInfo,
    ExchangeWalletAccountInfo
} ;
export default connect(mapStateToProps, mapDispatchToProps)(Convert) ;
