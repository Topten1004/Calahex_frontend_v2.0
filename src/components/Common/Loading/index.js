

import React from 'react' ;

import {
    Box,
    CircularProgress
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {

        display : 'flex',
        alignItems : 'center' ,
        justifyContent : 'center' ,

        height : props => props.height ,
    }
}))
const Loading = (props) => {

    const classes = useStyles(props) ;

    return (
        <Box className={classes.root}>
            <CircularProgress />
        </Box>
    )
}

export default Loading ;