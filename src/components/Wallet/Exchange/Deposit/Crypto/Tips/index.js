

import React from 'react';

import tipImg from '../../../../../../assets/lamp.png'

import {
    Box,
    Stack
} from '@mui/material' ;

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "15px",

        width : "100%",

        padding : "20px" ,
        borderRadius : "5px" ,

        backgroundColor : "#212458" ,
        color : theme.palette.common.label,

        overflow : "auto" ,
    },
    header : {
        display : "flex",
        alignItems : "center" ,

        marginBottom : "10px"
    },
    circle : {
        minWidth : "10px",
        height : "10px" ,

        marginTop : "8px" ,
        marginRight :"5px" ,

        backgroundColor : "gray"
    },
    tipContent : {
        fontSize : "16px"
    }
}))

const Tips = () => {
    const classes = useStyles();


    const tipList = [
        "If you have deposited, please pay attention to the text messages, site letters and emails we send to you.",
        "Coins will be deposited after 1 network confirmations",
        "Until 2 confirmations are made, an equivalent amount of your assets will be temporarily unavailable for withdrawals."
    ]

    const Tip = (props)  => {
        return (
            <Stack flexDirection='row'>
                <Box borderRadius="50%" className={classes.circle}/>
                <Box className={classes.tipContent}>
                    {
                        props.content
                    }
                </Box>
            </Stack>
        )
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.header}>
                <Box component={'img'} src={tipImg} width='25px' height='25px' /> 
                <Box component={'span'} sx={{fontSize : '14px' , fontWeight: "bold"}}>Tips:</Box>
            </Box>

            {
                tipList.map((tip, index) => {
                    return (
                        <Tip content={tip} key={index}/>
                    )
                })
            }
        </Box>
    )
}

export default Tips;