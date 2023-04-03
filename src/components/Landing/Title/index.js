import React from 'react' ;

import {
    Box, Typography
} from "@mui/material" ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "40px" ,
        marginBottom : "40px" ,
    } ,
    title : {
        color: theme.palette.primary.main ,
        fontSize: "60px" ,
        textAlign: "center" ,
        fontFamily: "Segoe UI, Arial, sans-serif" ,
        fontWeight : 600,
        ['@media (max-width:830px)'] : { 
           fontSize : "50px"
        },
        ['@media (max-width:690px)'] : { 
            fontSize : "40px"
        },
        ['@media (max-width:560px)'] : { 
            fontSize : "30px"
        }
    }
}));
const Title = () => {

    const classes = useStyles() ;

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title}>
                Caribbean and Latin America
            </Box>
            <Box  className={classes.title}>
                Hybrid Exchange
            </Box>
        </Box>
    )
}

export default Title ;