

import React from 'react' ;

import  {
    Box,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
    },
    title : {
        fontWeight : "bold",
        fontSize : "15px",
        paddingBottom : "15px",
        paddingTop : "15px",

        color : theme.palette.primary.main
    },
    description : {
        fontSize : "14px",
        color : theme.palette.common.label
    }
}))

const Section = (props) => {

    const classes = useStyles() ;
    const {
        title,
        description
    } = props ;

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title}>
                {title}
            </Box>
            <Box  className={classes.description}>
                {description}
            </Box>
        </Box>
    )
}

export default Section ;