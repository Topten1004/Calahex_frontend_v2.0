import React from 'react' ;

import { Link } from 'react-router-dom';

import {
    Box ,
    Button 
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles =  makeStyles((theme) => ({
    root : {
        textAlign : "center",
        "& .MuiButtonBase-root" : {
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)' ,
            borderRadius : "20px" ,
            marginLeft : "10px" ,
            marginRight : "10px" ,
        } ,
        "& .MuiButton-contained" : {
            textTransform : "captialize !important"
        },
        "& a" :{
            textDecoration : "none" ,
        }
    },
    signup : {
        color : "white"
    },
    login : {
        color : theme.palette.primary.main
    }
}));

const AuthLink = () => {
    
    const classes = useStyles() ;

    return (
        <Box className={classes.root}>
            <Button variant='contained' size='large' >
                <Link to="/signup" >
                    <Box className={classes.signup}>
                        Sign Up
                    </Box>
                </Link>
            </Button>
            <Button variant='outlined' size='large'>
                <Link to={'/login'}>
                    <Box className={classes.login}>
                        Log In
                    </Box>
                </Link>
            </Button>
        </Box>
    )
}

export default AuthLink ;