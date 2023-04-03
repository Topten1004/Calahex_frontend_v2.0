

import React from 'react' ;

import { Link } from 'react-router-dom' ;

import {
    Box ,
    Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        "& .MuiButtonBase-root" : {
            borderRadius : "15px" ,
            marginRight : "15px" ,
            textTransform : "capitalize" ,
            fontWeight : "bold"
        },
        "& a" : {
            textDecoration : "none",
            color : 'black'
        }
    } ,
    title : {
        textAlign : "center" ,
        fontSize : "36px" ,
        fontWeight : "bold" ,
        color : theme.palette.primary.main
    } ,
    btnGp : {
        marginTop : "35px",
        textAlign : "center"
    }
}));

const LinkAuth = () => {

    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Box  className={classes.title}>
                LET'S TRADE
            </Box>
            <Box  className={classes.btnGp}>
                <Button size={"small"} variant={"contained"} >
                    <Link to="/signup">
                        Sign Up
                    </Link>
                </Button>
                <Button size={"small"} variant={"contained"} >
                    <Link to='/login'>
                        Log In
                    </Link>
                </Button>
            </Box>
        </Box>
    )
}

export default LinkAuth ;