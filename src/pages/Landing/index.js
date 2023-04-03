
import React from 'react' ;

import {
    Box
} from '@mui/material' ;


import Title from '../../components/Landing/Title' ;
import AuthLink from '../../components/Landing/AuthLink' ;
import MenuLink from '../../components/Landing/MenuLink';
import CardList from '../../components/Landing/CardList' ;

import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
    root : {
        marginTop : theme.layout.headerHeight ,
    }
}));
const Landing = () => {

    const classes = useStyles () ;

    return (
        <Box className={classes.root}>
            
            <Title />
            
            <AuthLink />

            <MenuLink />

            <CardList />

        </Box>
    )
}

export default Landing ;