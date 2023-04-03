import React, {useEffect, useRef} from 'react' ;

import {
    Box, 
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        border : '1px solid ' + theme.palette.primary.main,
        borderRadius : '10px',
        padding : '15px',
        wordBreak : 'break-word !important',

        backgroundColor : 'none !important',
        
        "& span" : {
            backgroundColor : theme.palette.common.lightBlack + ' !important',
            color : theme.palette.common.label + " !important",
            fontFamily : 'sans-serif !important',
        },
        "& a" : {
            color : theme.palette.common.label + " !important",
            backgroundColor : theme.palette.common.lightBlack + ' !important',
        }
    },
    title : {
        color : theme.palette.primary.main,
        fontSize : '14px',
        fontWeight : 'bold'
    },
    description : {

    }
}))

const Notification = (props) => {
    const classes = useStyles() ;

    const {
        title, description
    } = props ;

    const decodeHtml = (html) => {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const CreateMarkUp = (props) => {

        const {
            description
        } = props ;

        const ctrl = useRef(null) ;

        useEffect(() => {
            if(ctrl) ctrl.current.innerHTML = decodeHtml(description) ;
        }, []);

        return (
            <Box ref={ctrl} >
            </Box>
        )
    }

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.title}>
                    { title }
                </Grid>
                <Grid item xs={12} className={classes.description}>
                    <CreateMarkUp 
                        description={description}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Notification ;