

import React, { useMemo } from 'react' ;

import { Link } from 'react-router-dom';

import { 
    Grid ,
    Box, 
    useMediaQuery
}
from '@mui/material';

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : "30px" ,

        marginLeft : "10%",
        marginRight : "10%",
        textAlign : "center" ,
        fontSize : "20px" ,
        color : theme.palette.primary.main ,
        fontFamily : "Roboto,  Helvetica, Arial, sans-serif" ,

        "& .MuiGrid-item" : {
            paddingTop : "15px",
        },
        "& a" : {
            textDecoration : "none" ,
            color : theme.palette.primary.main
        }
    } , 
    menuLink : {
        textAlign : "center !important",
    } ,
}));


const MenuLink = () => {

    const classes = useStyles() ;

    const match1 = useMediaQuery("(min-width : 840px)");
    const match2 = useMediaQuery("(min-width : 400px)");

    const menuLinkList = [
        {
            linkName : "Crpyto Exchange",
            link : "/cryptoexchange"
        } ,
        {
            linkName : "Wallet",
            link : "/wallet"
        } ,
        {
            linkName : "Buy Crpyto",
            link : "/buycrypto"
        },
        {
            linkName : "CAX Rewards",
            link : "/caxrewards"
        }
    ]

    return (
        <Box  className={classes.root}>
            <Grid container>
                {
                    menuLinkList.map(( element , index ) => {
                        return (
                            <Grid item xs={match1 ? 3 : match2 ? 6 : 12 } className={classes.menuLink} key={index} >
                                <Link to={element.link}>
                                    { element.linkName }
                                </Link>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </Box>
    )
}


export default MenuLink ;

