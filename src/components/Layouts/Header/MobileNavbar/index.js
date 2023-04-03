
import React, { useContext, useState } from 'react';

import { Link } from 'react-router-dom' ;

import { connect } from 'react-redux';
import {
    SignOutUser
} from '../../../../redux/actions/auth' ;

import { LanguageContext } from '../../../../utils/Language';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SettingsIcon from '@mui/icons-material/Settings';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';

import { makeStyles } from '@mui/styles';

import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    Collapse,
    useMediaQuery
} from '@mui/material' ;

import { ArrowDownward, ArrowDropDown, ArrowDropUp, ArrowUpward } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
    drawer: {
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& a" : {
            textDecoration : "none",
            color : theme.palette.common.label + " !important",
            "& :hover" : {
                color : "white !important"
            }
        },
    },
    drawerPaper: {
        width : "100%",
        top : "60px !important",
        backgroundColor : theme.palette.common.lightBlack + " !important",
        color : theme.palette.common.label + " !important",
        '& ::-webkit-scrollbar': {
            display: 'none !important',
        },
    },
    inList : {
        "& .MuiListItem-root" : {
            paddingLeft : "30px",
        }
    },
    cancel : {
        width : '100%',
        textAlign : 'right',
        cursor : 'pointer'
    }
})) ;

const MobileNavbar = (props) => {
  
    const { dictionary } = useContext(LanguageContext) ;

    const [ isVisibleSetting, setIsVisibleSetting ] = useState(false) ;

    const classes = useStyles() ;
    
    const match1 = useMediaQuery('(min-width : 470px)') ;

    const menuItems = [
        {
            name : dictionary.cryptochange ,
            link : "/cryptoexchange"
        },
        {
            name : dictionary.futurestrading ,
            link : "/futuretrading"
        } ,
        {
            name : dictionary.buycrypto ,
            link : "/buycrypto"
        },
        {
            name : dictionary.caxrewards ,
            link : "caxrewards"
        },
        {
            name : dictionary.aboutus ,
            link : "aboutus"
        }
    ]
    
    const menuOtherItems = [
        {
            name : <>
                <AccountBalanceWalletIcon /> &nbsp; Wallet
            </> ,
            link : "/wallet"
        },
        {
            name : <>
                <SettingsIcon /> &nbsp; Setting
            </> ,
            link : "/"
        } ,
    ] ;

    const menuAuthItems = [
        {
            name : <>
                <HowToRegIcon /> &nbsp; Sign Up
            </> ,
            link : "/signup"
        },
        {
            name : <>
                <LoginIcon /> &nbsp; Log In
            </> ,
            link : "/login"
        } ,
    ]

    const {
        isDrawMobileNavbar, handleDrawMobileNavbar,
        SignOutUser,
        isAuthenticated,
    } = props ;

    const handleVisibleSetting = () => {
        setIsVisibleSetting(!isVisibleSetting) ;
    }

    const handleSignOut = () => {
        handleDrawMobileNavbar() ;
        SignOutUser() ;
    }

    return (
            <Drawer
                variant='persistent'
                anchor='left'
                open={isDrawMobileNavbar}
                className={classes.drawer}
                classes={{
                    paper : classes.drawerPaper
                }}
            >
            <List>
                <ListItem>
                    <Box className={classes.cancel}>
                        <Box onClick={handleDrawMobileNavbar} component={'span'}>
                            &times;
                        </Box>
                    </Box>
                </ListItem>
                <Divider />
                {
                    menuItems.map((item , index) => {
                        return (
                            <Box key={index}>
                                <Link to={item.link}>
                                    <ListItem button onClick={handleDrawMobileNavbar}>
                                        {item.name}
                                    </ListItem>
                                    <Divider />
                                </Link>
                            </Box>
                        )
                    })
                }
                {
                    ( !match1 && !isAuthenticated)   &&   menuAuthItems.map((item, index) => {
                                                            return(
                                                                <Box key={index}>
                                                                    <Link to={item.link}>
                                                                        <ListItem button onClick={handleDrawMobileNavbar}>
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </ListItem>
                                                                        <Divider />
                                                                    </Link>
                                                                </Box>
                                                            )
                                                    
                        
                                                        })
                }
                {
                    ( !match1 && isAuthenticated)   &&  <Box >
                                                            <Link to={menuOtherItems[0].link}>
                                                                <ListItem button onClick={handleDrawMobileNavbar}>
                                                                    {
                                                                        menuOtherItems[0].name
                                                                    }
                                                                </ListItem>
                                                                <Divider />
                                                            </Link>
                                                        </Box>
                                                            
                }
                {
                    ( !match1 && isAuthenticated ) && <Box >
                                    <ListItem onClick={handleVisibleSetting} sx={{cursor : "pointer"}}>
                                        {
                                            menuOtherItems[1].name
                                        }
                                        {
                                            isVisibleSetting ? <ArrowDropUp/> : <ArrowDropDown />
                                        }
                                    </ListItem>
                                    <Divider />
                                    <Collapse in={isVisibleSetting} unmountOnExit timeout='auto' className={classes.inList}>
                                        <Link to={'/editprofile'} >
                                            <ListItem button onClick={handleDrawMobileNavbar}>
                                                Edit Profile
                                            </ListItem>
                                        </Link>
                                        <Divider />
                                        <Link to={'/changepassword'}>
                                            <ListItem button onClick={handleDrawMobileNavbar}>
                                                Change Password
                                            </ListItem>
                                        </Link>
                                        <Divider />
                                        <ListItem button onClick={handleSignOut}>
                                            Sign Out
                                        </ListItem>
                                    </Collapse>
                                    <Divider />
                                </Box>
                }
            </List>
            </Drawer> 
    )  
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
const mapDispatchToProps = {
    SignOutUser
}
export default connect(mapStateToProps, mapDispatchToProps)(MobileNavbar) ;