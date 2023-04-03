

import React, { useEffect } from 'react' ;

import Sidebar from '../../../components/Common/Auth/Sidebar';
import ProfileForm from '../../../components/Auth/ProfileForm';

import {
    Box,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    flex : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center"
    },
    root :{
        marginTop : theme.layout.headerHeight ,
    } ,
    signUp : {
        overflow :"hidden" ,
        overflowY : "scroll" ,
        height : "calc(100vh - 60px)" ,
    }
})) ;

const Profile = () => {

    const classes = useStyles() ;
    const match1 = useMediaQuery('(min-width : 785px)') ;

    return (
        <Box className={classes.root}>
            <Grid container>
                {
                    match1 && <Grid item xs={3}>
                                    <Sidebar />
                                </Grid>
                }
                <Grid item xs={match1 ? 9 : 12} >
                    <Grid container className={classes.signUp}>
                        <Grid item xs={12} className={classes.flex}>
                            <ProfileForm 
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Profile ;