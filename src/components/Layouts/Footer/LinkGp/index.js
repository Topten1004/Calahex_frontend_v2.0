import React from 'react' ;

import { Link } from 'react-router-dom';

import {
    Box
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : "flex" ,
        flexDirection : "column" ,
        cursor : "pointer",
        "& a" : {
            textDecoration : 'none',
            color : theme.palette.common.label
        }
    } ,
    title : {
        textAlign : "center" ,
        fontSize : "19px" ,
        fontWeight : 500 ,
        marginBottom : "20px",
        color : theme.palette.primary.main,
    } ,
    linkList : {
        textAlign : "center" ,
        fontSize : "0.875rem" ,
        marginBottom : "10px",
        color : theme.palette.common.label
    }
}));

const LinkGp = (props) => {
    
    const { linkTitle , linkList } = props ;
    
    const classes = useStyles() ;

    return (
        <Box  className={classes.root}>
            <Box  className={classes.title}>
                { linkTitle }
            </Box>
            {
                linkList ? linkList.map((item , index) => {
                    if(typeof item === 'string')
                        return (
                            <Box key={index}  className={classes.linkList}>
                                { item }
                            </Box>
                        )
                    if(typeof item === 'object')
                        return (
                            <Box key={index} className={classes.linkList}>
                                <Link to={item.link}>
                                    {item.label}
                                </Link>
                            </Box>
                        )
                }) : <>
                </>
            }
        </Box>
    )
}

export default LinkGp ;