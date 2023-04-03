


import React from 'react' ;

import ControlledAccordions from './ControlledAccordions';

import {
    Box ,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        boxSizing : "border-box" ,
        height : "calc(100vh - 60px)" ,

        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,
        flexDirection : "column",

        color : "white" ,

        backgroundColor : theme.palette.common.lightBlack
    }
}))

const Sidebar = () => {
    
    const classes = useStyles() ;

    const accordions = [
        {
            title : "CA1DEX" ,
            content : "Our DEX is currently under development. Hopefully we will be operational in the last week of February. Our first Dapp called Ca1dex is almost finished. We hope you will our trade or stake CAX our utility token once we go live with the DEX part on February 14th, 2022"
        }
    ]
    return (
        <Box  className={classes.root}>
            CA1EX NEWS
            {
                accordions.map((accordion , index) => {
                    return (
                        <ControlledAccordions
                            key={index}
                            title={accordion.title}
                            content={accordion.content}
                        /> 
                    )
                })
            }
        </Box>
    )
}

export default Sidebar ;