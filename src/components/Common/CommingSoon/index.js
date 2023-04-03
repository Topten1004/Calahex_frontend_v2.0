import React from "react";

import LogoImg from '../../../assets/logo_footer.png' ;

import {
    Box
} from '@mui/material';

import {makeStyles} from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor: theme.palette.common.lightBlack,
        color: 'white',
        border: '1px solid ' + theme.palette.common.black,
        borderRadius: '10px',
        textAlign: 'center',
        color : theme.palette.primary.main,
        padding : 40
    },
    soon : {
        fontSize : 30,
        fontWeight : 600,
        marginBottom : 20
    },
    update : {
        marginTop : 20,
        fontSize : 18
    }
}))

const CommingSoon = () => {
    const classes = useStyles();

    return(
        <Box className={classes.root}>
            <Box className={classes.soon}>Coming Soon</Box>
            <Box component={'img'} src={LogoImg} height={40}/>
            <Box className={classes.update}>We're launching soon, follow us for update...</Box>
        </Box>
    );
}

export default CommingSoon;