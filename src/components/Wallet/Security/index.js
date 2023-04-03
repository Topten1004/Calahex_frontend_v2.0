import React from 'react' ;

import { useNavigate } from 'react-router-dom' ;

import cloudImg from '../../../assets/cloud-check.png' ;

import {
    Box,
    Button,
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 115px)",

        ['@media (max-width : 374px)'] : {
            height :'calc(100vh - 141.5px)'
        },

        ['@media (max-width : 299px)'] : {
            height :'calc(100vh - 182.25px)'
        },
        
        boxShadow : "-5px 0px 14px -2px"
    },
    header : {
        height : "40px" ,

        paddingLeft : "15px" ,
        paddingRight : "15px" ,

        fontWeight : "bold" ,
        fontSize : "14px",

        display : "flex" ,
        alignItems : "center",
        justifyContent : "space-between",

        borderBottom : "1px solid gray",

        color : theme.palette.common.label
    },
    card : {
        backgroundColor : theme.palette.common.lightBlack,
        borderRadius : "5px",
        margin : "15px",

        color : "white",
        fontSize : "12px",

        padding : "10px",

        "& div" : {
            marginTop : "10px" ,
            marginBottom : "20px"
        }
    },
    bottom : {
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : 'space-between' ,

        "& .MuiButtonBase-root" :{
            borderRadius : "15px !important" ,
            textTransform : "capitalize !important"
        }
    }
}))

const Security = (props) => {

    const {
        setIsVisibleSecurity,
        handleCloseSecure
    } = props ;

    const classes = useStyles(props) ;

    const navigate = useNavigate() ;

    const onExitButton = () => {
        setIsVisibleSecurity(false) ;
        handleCloseSecure() ;
    }
    const handleGoto2FA = () => {
        navigate('/editprofile') ;
    }

    return (
        <Box  className={classes.root}>
            <Box className={classes.header}>
                <Box >
                    Profile &amp; Security
                </Box>
                <Box  sx={{cursor : "pointer"}} onClick={() => onExitButton()}>
                    &times;
                </Box>
            </Box>

            <Box  className={classes.card}>
                <Box >
                    Security
                </Box>
                <Box>
                    Protect your assets by adding an extra layer of security with 2-Step Verification.
                </Box>
                <Box  className={classes.bottom}>
                    <Button size='small' variant='contained'
                        onClick={() => handleGoto2FA()}
                    >Enable 2FA</Button>
                    <Box component={"img"} src={cloudImg} height='50px' width='70px'/>
                </Box>
            </Box>
            
        </Box>
    )
}

export default Security ;