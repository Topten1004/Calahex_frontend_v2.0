import React from 'react' ;

import { useState } from 'react';

import {
    Box ,
    List,
    ListItem,
    Collapse
} from '@mui/material' ;

import ExpandMoreIcon from '@mui/icons-material/ExpandMore' ;
import ExpandLessIcon from '@mui/icons-material/ExpandLess' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,
        overflow : 'auto',
        background : theme.palette.background.default,

        ['@media (max-width : 375px)'] : {
            height :'calc(100vh - 141.5px)'
        },

        ['@media (max-width : 299px)'] : {
            height :'calc(100vh - 182.5px)'
        },

        paddingLeft : "10px" ,
        paddingRight : "10px" ,

        "& .MuiListItem-root" : {
            borderRadius : "10px",
            fontSize : "14px",
            fontWeight : "bold",

            color : theme.palette.common.label
        }
    },
    inList : {
        "& .MuiListItem-root" : {
            paddingLeft : "30px"
        }
    },
    active : {
        backgroundColor : theme.palette.primary.main + " !important" ,
        color : "white !important"
    }
}))

const SideBar = (props) => {
    
    const classes = useStyles() ;
    
    const {
        handleChangeTab,
        selectedTab
    } = props ;

    const [ isVisible , setIsVisible ] = useState(true) ;
    
    return (
        <Box className={classes.root}>
            <List spacing={2}>
                <ListItem button 
                    selected={selectedTab === 1 ? true : false} 
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab(1)}
                >
                    Accounts Overview
                </ListItem>

                <ListItem button
                    selected={selectedTab === 'transfer' ? true : false}
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab('transfer')}
                >
                    Transfer Balances
                </ListItem>

                <ListItem button 
                    onClick={() => setIsVisible(!isVisible)} 
                    sx={{display : "flex", justifyContent:'space-between'}}>
                    <>Exchange Account</> <>{ isVisible ? <ExpandMoreIcon /> : <ExpandLessIcon /> }</>
                </ListItem>

                <Collapse in={isVisible} unmountOnExit timeout='auto' className={classes.inList}>
                    <ListItem button 
                        selected={selectedTab === 'exchangeWallet' ? true : false} 
                        classes={{selected : classes.active}} 
                        onClick={() => handleChangeTab('exchangeWallet')}
                    >
                        Wallet
                    </ListItem>
                    <ListItem button 
                        selected={selectedTab === 'exchangeDeposit' ? true : false} 
                        classes={{selected : classes.active}} 
                        onClick={() => handleChangeTab('exchangeDeposit')}
                    >
                        Deposit
                    </ListItem>
                    <ListItem button 
                        selected={selectedTab === 'exchangeWithdraw' ? true : false} 
                        classes={{selected : classes.active}} 
                        onClick={() => handleChangeTab('exchangeWithdraw')}
                    >
                        Withdraw
                    </ListItem>
                </Collapse>

                <ListItem button
                    selected={selectedTab === 'margin' ? true : false}
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab('margin')}
                >
                    Margin Account
                </ListItem>
                <ListItem button
                    selected={selectedTab === 'future' ? true : false}
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab('future')}
                >
                    Future Account
                </ListItem>
                <ListItem button
                    selected={selectedTab === 'savings' ? true : false}
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab('savings')}
                >
                    Savings Account
                </ListItem>
                <ListItem button
                    selected={selectedTab === 'pool' ? true : false}
                    classes={{selected : classes.active}} 
                    onClick={() => handleChangeTab('pool')}
                 >
                    Pool Account
                </ListItem>
            </List>
        </Box>
    )
}

export default SideBar ;