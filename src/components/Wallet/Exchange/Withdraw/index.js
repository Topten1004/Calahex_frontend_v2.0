
import React from 'react' ;

import { useState } from 'react' ;

import { connect } from 'react-redux' ;

import Crypto from './Crypto';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,

        overflow : "hidden" ,
        overflowY : "scroll",

        "& input" : {
            background : theme.palette.common.lightBlack,
            color : theme.palette.common.label,
            borderRadius : 5,
            cursor :'pointer'
        }
    },
    header : {
        minHeight : "70px" ,
        borderBottom : "1px solid gray" ,

        fontSize : "14px" ,
        padding : "15px"
    },
    breadCumb : {
        color : theme.palette.common.label
    },
    label : {
        color : theme.palette.primary.main,
        fontSize : 18,
        fontWeight : 600
    },
    tab : {
        paddingLeft : "15px" ,

        display : "flex" ,
        flexDirection : "row" ,
        alignItems : 'center' ,

        borderBottom : "1px solid lightgray",

        height : "40px",

        "& div" :{
            paddingLeft : "10px" ,
            paddingRight : "10px",

            minWidth : "65px",
            textAlign : "center" ,

            cursor : "pointer"
        }
    },
    active : {
        borderBottom : "1px solid",
        color : theme.palette.primary.main,
        fontWeight : "bold"
    }
}))

const Withdraw = (props) => {
    const classes = useStyles() ;

    const [ selectedTab,  setSelectedTab ] = useState(1) ;

    const handleChangeTab = (tab) => {
        setSelectedTab(tab) ;
    }

    return (
        <Box  className={classes.root}>

            <Box className={classes.header}>
                <Box className={classes.breadCumb}>
                    Exchange &rsaquo; Withdraw
                </Box>
                <Box  className={classes.label}>
                    Withdraw
                </Box>
            </Box>

            <Box className={classes.tab}>
                <Box  className={selectedTab === 1 ? classes.active : ""} onClick={() => handleChangeTab(1)}>
                    Crypto
                </Box>
            </Box>

            <Crypto />
        </Box>
    )
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {    
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Withdraw) ;