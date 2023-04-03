
import React from 'react' ;

import { useState, useEffect } from 'react' ;

import { connect } from 'react-redux';
import { WalletAccountInfo } from '../../../redux/actions/wallet' ;

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import AccountCard from './AccountCard';
import Loading from '../../Common/Loading';

import {
    Box, 
    Button,
    Collapse,
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,

        overflow : "hidden" ,
        overflowY : "scroll"
    },
    header : {
        minHeight : "60px",

        borderBottom : "1px solid gray" ,
        fontSize : "14px" ,
        padding : "15px",
        color : theme.palette.primary.main,

        "& .MuiButtonBase-root" : {
            textTransform : "capitalize",
            fontWeight : "bold",
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
        color : theme.palette.common.label
    },
    estimate : {
        fontSize : "13px",
        marginBottom : "10px"
    },
    balance : {
        display : "flex",
        alignItems : 'center'
    },
    number : {
        marginRight : "10px",
        fontWeight : "bold",

        display : 'flex',
        alignItems : 'center'
    },
    symbol : {
        fontSize : "12px"
    },
    overview : {
        fontWeight : "bold",
        fontSize : "18px",
        marginRight : "20px"
    }
}))

const Account = (props) => {

    const {
        handleChangeTab ,
        walletAccountInfo, WalletAccountInfo
    } = props ;

    const classes = useStyles() ;

    const [ isVisible , setIsVisible ] = useState(true) ;
    
    useEffect(() => {
        WalletAccountInfo() ;
    }, []) ;

    return (
        <Box className={classes.root}>
            {
                walletAccountInfo ? <>
                    <Box className={classes.header}>
                        <Box component={'span'} className={classes.overview}>
                            Overview
                        </Box>
                        <Button 
                            startIcon={!isVisible ? <VisibilityIcon /> : <VisibilityOffIcon/>}
                            variant='contained' size={'small'}
                            onClick={() => setIsVisible(!isVisible)}
                        >
                            {
                                !isVisible ? "Show " : "Hide "
                            }
                            Balance
                        </Button>
                    </Box>
                    {
                        Object.entries(walletAccountInfo).map(([id, item]) => {
                            if(id === 'total_balance') return (
                                <Collapse unmountOnExit timeout={"auto"} in={isVisible} key={id}>
                                    <Box className={classes.hide}>

                                        <Box component='span' className={classes.estimate}>Estimated Balance</Box>

                                        <Box className={classes.balance}>
                                            <Box component='span' className={classes.number}>
                                                { walletAccountInfo ? Number(walletAccountInfo.total_balance).toFixed(4) 
                                                                        : <CircularProgress size={20}/>
                                                }
                                            </Box>
                                            <Box component='span' className={classes.symbol}>USDT</Box>
                                        </Box>
                                        
                                    </Box>
                                </Collapse>
                            ) ;
                            else return (
                                <AccountCard 
                                    key={id}
                                    handleChangeTab={handleChangeTab}
                                    balance={item}
                                    account_name={id.split('_')[0]}
                                />
                            )
                        })
                    }
                </> : <Loading
                        height={'100%'}
                    />
            }
        </Box>
    )
}

const mapStateToProps = state => ({
    walletAccountInfo : state.wallet.walletAccountInfo
})

const mapDispatchToProps = {
    WalletAccountInfo
}
export default connect(mapStateToProps, mapDispatchToProps)(Account) ;