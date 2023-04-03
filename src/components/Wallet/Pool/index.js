import React from 'react' ;

import CommingSoon from '../../Common/CommingSoon';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles(() => ({
    root : {
        height : "calc(100vh - 115px)" ,

        paddingLeft : 15,
        paddingRight : 15,

        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center'
    }
}))

const Pool = () => {
    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <CommingSoon />
        </Box>
    )
}

export default Pool ;