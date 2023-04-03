import React from 'react' ;

import {
    Box
} from '@mui/material' ;


import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "35px" ,
        color : theme.palette.common.label,
        ['@media (max-width : 1500px)'] : {
            height : '33px'
        },

        boxSizing : 'border-box',
        borderBottom:"2px solid " + theme.palette.common.black,

        display : "flex" ,
        alignItems : "flex-end" ,
        paddingLeft : "20px" ,
        fontWeight : "bold"
    }
}));

const TradeSelect = () => {

    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            Market Trade
        </Box>
    )
}


export default TradeSelect ;