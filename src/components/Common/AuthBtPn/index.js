


import React from 'react' ;

import { Link } from 'react-router-dom';

import {
    Box, Button
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)" ,
        
        ['@media (max-width : 1500px)'] : {
            height : 'calc(150vh - 190px)'
        },

        ['@media (max-width : 1040px)'] : {
            height : 'calc(50vh - 90px)',

        },


        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center",
        flexDirection : "column" ,

        "& .MuiButtonBase-root" : {
            borderRadius : "15px" ,
            marginLeft : "15px" ,
            marginRight : "15px" ,
            textTransform : "capitalize",
        },
        "& a" : {
            textDecoration : "none" ,
        }
    } ,
    title : {
        fontSize : "21px" ,
        color : theme.palette.primary.main ,
        fontWeight : "bold" ,
        marginBottom : "20px"
    },
    signup : {
        color : "white"
    },
    login : {
        color : "black"
    }
}));

const AuthBtPn = () => {
    
    const classes = useStyles() ;

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title} >
                Start Trading
            </Box>
            <Box  >
                <Button variant={"contained"}>
                    <Link to='/signup'>
                        <Box className={classes.signup}>
                            Sign Up
                        </Box>
                    </Link>
                </Button>
                <Button variant={"contained"} color={"inherit"} sx={{color : "black"}}>
                    <Link to='/login'>
                        <Box className={classes.login}>
                            Log In
                        </Box>
                    </Link>
                </Button>
            </Box>
        </Box>
    )
}

export default AuthBtPn ;