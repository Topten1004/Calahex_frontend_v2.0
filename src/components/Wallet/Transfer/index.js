import React,{ useState, useEffect } from 'react' ;

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import swal from 'sweetalert';

import { connect } from 'react-redux';
import { WholeCryptoBalance, TransferCrypto, WalletAccountInfo } from '../../../redux/actions/wallet';
import { Check2FAProfile } from '../../../redux/actions/auth';

import BalanceList from './BalanceList';
import Loading from '../../Common/Loading';
import Confirm2FAForm from '../../Auth/Confirm2FAForm';

import {
    Box,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {

        paddingTop : '20px',
        paddingBottom : '20px',

        height : 'calc(100vh - 115px)',
        
        overflow : 'hidden',
        overflowY : 'scroll',
        
        '& .MuiGrid-item' : {
            textAlign : 'center'
        },
        
        // when hover border color style
        '& .MuiOutlinedInput-root': {
            textTransform : 'capitalize',
        },
    },
    transfer : {
        textTransform : 'uppercase',
        fontWeight : 600,
        fontSize : '50px',
        color : theme.palette.common.label,

        ['@media (max-width : 620px)'] : {
            fontSize : '40px'
        },

        ['@media (max-width : 460px)'] : {
            fontSize : '30px'
        },

        ['@media (max-width : 345px)'] : {
            fontSize : '20px'
        },

        ['@media (max-width : 230px)'] : {
            fontSize : '15px'
        }
    },
    move : {
        color : theme.palette.primary.main,
        fontSize : '20px',

        ['@media (max-width : 600px)'] : {
            fontSize : '15px'
        },

        ['@media (max-width : 430px)'] : {
            fontSize : '12px'
        },
    },
    transferPn : {
        ['@media (max-width : 725px)'] : {
            width : 'auto'
        },

        marginLeft : '20px',
        marginRight : '20px',
        marginTop : '20px',
        backgroundColor : theme.palette.background.default,
        border : '2px solid ' + theme.palette.common.black,
        color : theme.palette.common.label,
        padding : '30px',
        borderRadius : '10px',
        width : 'auto',
    },
    menuItem : {
        textTransform : 'capitalize !important',
    },
    left : {
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : 'center',

        fontWeight : 500,
        fontSize : '20px',

        ['@media (max-width : 250px)'] : {
            fontSize : '14px'
        },

        ['@media (max-width : 215px)'] : {
            fontSize : '12px'
        }
    },
    right : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center',

        fontWeight : 500,
        fontSize : '20px',
    }
}))
const Transfer = (props) => {
    const classes = useStyles();

    const match1 = useMediaQuery('(min-width : 685px)') ;
    const match2 = useMediaQuery('(min-width : 405px)') ;

    const [ fromAccount, setFromAccount ] = useState(null) ;
    const [ toAccount, setToAccount ] = useState(null) ;
    const [ transferAmount, setTransferAmount ] = useState(0) ;
    const [ transferCoin, setTransferCoin ] = useState(null) ;
    const [ accountList , setAccountList ] = useState(null) ;

    const [ open, setOpen] = useState(false) ;

    const navigate = useNavigate() ;
    const location = useLocation() ;

    const {
        WholeCryptoBalance, wholeCryptoBalance,
        WalletAccountInfo,
        TransferCrypto,
        Check2FAProfile, check2FA
    } = props ;

    const handleClose2FAForm = () => {
        setOpen(false) ;
    }

    const handleConfirm2FA = async () => {
        handleClose2FAForm() ;

        await TransferCrypto(fromAccount, toAccount, transferAmount, transferCoin) ;
        await WholeCryptoBalance() ;
        await WalletAccountInfo() ;
    }

    const handleOpen2FAForm = async () => {
        setOpen(true) ;
    }

    const handleFromAccount = (account_type) => {
        setFromAccount(account_type)
    }

    const handleToAccount = (account_type) => {
        setToAccount(account_type) ;
    }

    const handleAccountList = (account_list) => {
        setAccountList(account_list)
    }

    const handleTransferCoin = (transferCoin) => {
        setTransferCoin(transferCoin) ;
    }

    const handleTransfer = async () => {

        if( fromAccount === toAccount ) {
            return swal({
                title : 'Warning',
                text : "You can't transfer between same accounts.",
                icon : 'warning',
                buttons : false,
                timer : 5000
            })
        }
        if(transferAmount === 0) {
            return swal({
                title : 'Warning',
                text : 'Amount is empty.',
                icon : 'warning',
                buttons : false,
                timer : 5000
            }) ;
        }
        if( transferAmount > wholeCryptoBalance[fromAccount][transferCoin].available) {
            return swal({
                title : 'Warning',
                text : 'Inffucient Fund.',
                icon : 'warning',
                buttons : false,
                timer : 5000
            }) ;
        }

        if(check2FA) handleOpen2FAForm();
        else {
            await TransferCrypto(fromAccount, toAccount, transferAmount, transferCoin) ;
            await WholeCryptoBalance() ;
            await WalletAccountInfo() ;
        }
    }

    const handleTransferAmount = (value) => {
        setTransferAmount(Number(value)) ;
    }

    useEffect(() => {
        if(wholeCryptoBalance) {
            let account_list = [] ;

            for(let account_type of Object.keys(wholeCryptoBalance)){
                if(account_type !== 'total') account_list.push(account_type) ;
            }

            if(!account_list.length) {
                navigate('/wallet') ;
                
                return swal({
                    title : 'Account',
                    text : "Your account does not exist.",
                    icon : 'warning',
                    buttons : false,
                    timer : 5000
                })
            }
            handleAccountList(account_list.sort((a, b) => {
                return a.localeCompare(b);
            })) ;

            if(location.state && location.state.fromAccount) {
                handleFromAccount(location.state.fromAccount)
            } else {
                handleFromAccount(account_list[0]) ;
            }

            handleToAccount(account_list[0]) ;

            if(location.state && location.state.transferCoin){
                console.log(location.state.transferCoin) ;
                handleTransferCoin(location.state.transferCoin) ;
                handleTransferAmount(wholeCryptoBalance['exchange'][location.state.transferCoin].available);
            } else {
                if(account_list.length) handleTransferCoin(Object.keys(wholeCryptoBalance[account_list[0]])[0]) ;
            }
        }
    }, [wholeCryptoBalance]) ;

    useEffect(() => {
        Check2FAProfile() ;
    }, []) ;

    return (
        <Box className={classes.root}>
            {
                ( wholeCryptoBalance && fromAccount && toAccount && accountList ) ?  <>
                                        <Grid container>
                                            <Grid item xs={12} className={classes.transfer}>
                                                Transfer balances
                                            </Grid>
                                            <Grid item xs={12} className={classes.move}>
                                                Move funds between your different accounts.
                                            </Grid>
                                        </Grid>
                                        <Box className={classes.transferPn}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={match1 ? 6 : 12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={match2 ? 6 : 12} className={match2 ? classes.right : classes.left}>
                                                                    Amount : 
                                                                </Grid>
                                                                <Grid item xs={match2 ? 6 : 12} className={classes.left}>
                                                                    <TextField
                                                                        label={'Amount'}
                                                                        size={'small'}
                                                                        type={'number'}
                                                                        fullWidth

                                                                        value={transferAmount}
                                                                        onChange={(e) => handleTransferAmount(e.target.value)}
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={match1 ? 6 : 12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={match2 ? 6 : 12} className={match2 ? classes.right : classes.left}>
                                                                    Coin : 
                                                                </Grid>
                                                                <Grid item xs={match2 ? 6 : 12} className={classes.left}>
                                                                    <FormControl
                                                                        fullWidth
                                                                    >
                                                                        <InputLabel>Coin</InputLabel>
                                                                        <Select
                                                                            label={'Coin'}
                                                                            value={transferCoin}
                                                                            size={'small'}
                                                                            onChange={(e) => handleTransferCoin(e.target.value)}
                                                                            
                                                                        >
                                                                            {
                                                                                Object.entries(wholeCryptoBalance[fromAccount]).map(([id, item]) => {
                                                                                    return (
                                                                                        <MenuItem value={id} className={classes.menuItem} key={id}>
                                                                                            { item.crypto.symbol }
                                                                                        </MenuItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Grid container spacing={1}>
                                                        <Grid item xs={match1 ? 6 : 12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={match2 ? 6 : 12 } className={match2 ? classes.right : classes.left}>
                                                                    From Account :
                                                                </Grid>
                                                                <Grid item xs={match2 ? 6 : 12} className={classes.left}>
                                                                    <FormControl
                                                                        fullWidth
                                                                    >
                                                                        <InputLabel>From</InputLabel>
                                                                        <Select
                                                                            label={'From'}
                                                                            value={fromAccount}
                                                                            size={'small'}
                                                                            onChange={(e) => handleFromAccount(e.target.value)}
                                                                            fullWidth
                                                                        >
                                                                            {
                                                                                accountList.map((item, index) => {
                                                                                    return (
                                                                                        <MenuItem value={item} className={classes.menuItem} key={index}>{item}</MenuItem>
                                                                                    )
                                                                                })
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid item xs={match1 ? 6 : 12}>
                                                            <Grid container spacing={1}>
                                                                <Grid item xs={match2 ? 6 : 12} className={match2 ? classes.right : classes.left}>
                                                                    To Account :
                                                                </Grid>
                                                                <Grid item xs={match2 ? 6 : 12} className={classes.left}>
                                                                    <FormControl
                                                                        fullWidth
                                                                    >
                                                                        <InputLabel>To</InputLabel>
                                                                        <Select
                                                                            label={'To'}
                                                                            value={toAccount}
                                                                            size={'small'}
                                                                            onChange={(e) => handleToAccount(e.target.value)}
                                                                            fullWidth
                                                                        >
                                                                            <MenuItem value={'exchange'} className={classes.menuItem}>exchange</MenuItem>
                                                                            <MenuItem value={'margin'} className={classes.menuItem}>margin</MenuItem>
                                                                            <MenuItem value={'future'} className={classes.menuItem}>future</MenuItem>
                                                                            <MenuItem value={'savings'} className={classes.menuItem}>savings</MenuItem>
                                                                            <MenuItem value={'pool'} className={classes.menuItem}>pool</MenuItem>
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button variant='contained' 
                                                            sx={{width : 150}}
                                                            onClick={() => handleTransfer()}
                                                    >Transfer</Button>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <BalanceList 
                                            totalBalanceData={wholeCryptoBalance['total']}
                                            handleTransferCoin={handleTransferCoin}
                                            handleTransferAmount={handleTransferAmount}
                                            accountBalanceData={wholeCryptoBalance[fromAccount]}
                                            account_type={fromAccount}
                                        />
                                    </>
                                    :<Loading 
                                        height={'calc(100vh - 115px)'}
                                    />
            }
            <Confirm2FAForm 
                open={open}
                handleClose2FAForm={handleClose2FAForm}
                handleConfirm2FA={handleConfirm2FA}
            />
        </Box>
    )
}

const mapStateToProps = state => ({
    wholeCryptoBalance : state.wallet.wholeCryptoBalance,
    check2FA : state.auth.check2FA
})

const mapDispatchToProps = {
    WholeCryptoBalance ,
    WalletAccountInfo,
    TransferCrypto,
    Check2FAProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(Transfer) ;