

import React from 'react' ;

import { useState , useEffect} from 'react' ;
import { useLocation } from 'react-router-dom';

import { connect } from 'react-redux' ;
import { WalletAccountInfo, WholeCryptoBalance } from '../../redux/actions/wallet' ;
import { Check2FAProfile } from '../../redux/actions/auth' ;

import PayBanner from '../../components/Wallet/PayBanner';
import SideBar from '../../components/Wallet/SideBar';
import Security from '../../components/Wallet/Security';
import Account from '../../components/Wallet/Account';

import Transfer from '../../components/Wallet/Transfer';

import Deposit from '../../components/Wallet/Exchange/Deposit';
import ExchangeWallet from '../../components/Wallet/Exchange/ExchangeWallet';
import Withdraw from '../../components/Wallet/Exchange/Withdraw';

import Pool from '../../components/Wallet/Pool';
import Margin from '../../components/Wallet/Margin';
import Savings from '../../components/Wallet/Savings';
import Future from '../../components/Wallet/Future';

import {
    Box ,
    Grid,
    Drawer,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh-60px)",
        minHeight :"calc(100vh - 115px)",

        marginTop : '115px',
        
        "&.MuiBackdrop-root" : {
            backgroundColor : "none !important"
        }
    },
    drawer: {
        "& .MuiBackdrop-root": {
          display: "none"
        },
    },
    drawerPaper: {
        top : "115px !important" ,
        maxWidth : '250px',

        ['@media (max-width : 375px)'] : {
            top :'141.5px !important'
        },

        ['@media (max-width : 299px)'] : {
            top :'182.25px !important'
        },

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}));

const Wallet  = (props) => {

    const {
        WalletAccountInfo,
        WholeCryptoBalance,
        Check2FAProfile,
        check2FA
    } = props ;

    const classes = useStyles() ;
    const location = useLocation() ;

    const match1 = useMediaQuery("(min-width : 1280px)") ;
    const match2 = useMediaQuery("(min-width : 960px)") ;

    const [ selectedTab, setSelectedTab ] = useState(1) ;
    const [ isVisibleSecurity,  setIsVisibleSecurity ] = useState(false) ;
    const [ isDrawerSider , setIsDrawerSider ] = useState(false);
    const [ isDrawerSecure , setIsDrawerSecure ] = useState(false);

    const handleChangeTab = (tab) => {
        if(!match1) handleCloseSider() ;
        setSelectedTab(tab) ;
    }

    const handleCloseSider = () => {
        setIsDrawerSider(!isDrawerSider) ;
    }

    const handleCloseSecure = () => {
        setIsDrawerSecure(!isDrawerSecure) ;
    }

    useEffect(() => {
        WalletAccountInfo() ;
        WholeCryptoBalance() ;
        
        if(location.state){
            if(location.state.selectedSideTab) setSelectedTab(location.state.selectedSideTab);
        }
    },[]) ;

    useEffect(() => {
        if(match1) setIsDrawerSider(false) ;
        if(match2) setIsDrawerSecure(false) ;
    }, [match1, match2]) ;

    useEffect(() => {
        Check2FAProfile() ;
    }, []) ;

    useEffect(() => {
        if(!check2FA) setIsVisibleSecurity(true) ;
        else setIsVisibleSecurity(false) ;
    }, [check2FA]) ;

    return (
        <Box className={classes.root}>
            <Box>
                <PayBanner 
                    handleCloseSider={handleCloseSider}
                    setIsDrawerSider={setIsDrawerSider}
                    handleCloseSecure={handleCloseSecure}
                    handleChangeTab={handleChangeTab}
                    isVisibleSecurity={isVisibleSecurity}
                />
            </Box>
            <Drawer
                anchor="left"
                variant="persistent"
                onClose={handleCloseSider}
                open={isDrawerSider}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <SideBar
                    selectedTab={selectedTab}
                    handleChangeTab={handleChangeTab}
                />  
            </Drawer>
            <Drawer
                anchor="right"
                variant="persistent"
                onClose={handleCloseSecure}
                open={isDrawerSecure}
                className={classes.drawer}
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <Security 
                    setIsVisibleSecurity={setIsVisibleSecurity}
                    handleCloseSecure={handleCloseSecure}
                /> 
            </Drawer>
            <Grid container>
                {
                    match1 &&   <Grid item xs={2}>
                                    <SideBar
                                        selectedTab={selectedTab}
                                        handleChangeTab={handleChangeTab}
                                    />  
                                </Grid>
                }
                
                <Grid item xs={ match1 ? (match2 ? (isVisibleSecurity ? 7 : 10) : (isVisibleSecurity ? 9 : 12)) : (match2 ? (isVisibleSecurity ? 9 : 12) : 12 )}>
                    {
                        selectedTab === 1 && <Account 
                            handleChangeTab={handleChangeTab}
                        />
                    }
                    {
                        selectedTab === 'exchangeWallet' && <ExchangeWallet 
                            handleChangeTab={handleChangeTab}
                            setIsDrawerSider={setIsDrawerSider}
                        />
                    }
                    {
                        selectedTab === 'exchangeDeposit' && <Deposit 
                        />
                    }
                    {
                        selectedTab === 'exchangeWithdraw' && <Withdraw />
                    }
                    {
                        selectedTab === "transfer" && <Transfer />
                    }
                    {
                        selectedTab === "margin" && <Margin />
                    }
                    {
                        selectedTab === "future" && <Future />
                    }
                    {
                        selectedTab === "savings" && <Savings />
                    }
                    {
                        selectedTab === "pool" && <Pool />
                    }
                </Grid>
                {
                    (isVisibleSecurity && match2) && <Grid item xs={isVisibleSecurity ? 3 : 0}>
                        <Security 
                            setIsVisibleSecurity={setIsVisibleSecurity}
                        />
                    </Grid>
                }

                
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    check2FA : state.auth.check2FA
})
const mapDispatchToProps = {
    WalletAccountInfo,
    WholeCryptoBalance,
    Check2FAProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);