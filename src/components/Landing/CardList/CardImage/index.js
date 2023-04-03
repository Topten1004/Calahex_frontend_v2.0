


import React from 'react' ;

import {
    Box
} from "@mui/material" ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        "& img" : {
            width : "100%" ,
            borderRadius : "20px"
        }
    }
}));

const CardImage = (props) => {
    
    const { imageUrl } = props ;
    
    const classes = useStyles() ;

    return (
        <Box  className={classes.root}>
            <Box component={"img"} src={imageUrl} />
        </Box>
    )
}

export default CardImage ;