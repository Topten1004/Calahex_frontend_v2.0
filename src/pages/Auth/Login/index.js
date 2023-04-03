

import React, { useEffect } from 'react' ;

import { useNavigate } from 'react-router-dom';

import Sidebar from '../../../components/Common/Auth/Sidebar';
import LoginForm from '../../../components/Auth/LoginForm';

import { connect } from 'react-redux';

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

const Login = (props) => {

    const classes = useStyles() ;
    const match1 = useMediaQuery('(min-width : 785px)') ;
    const navigate = useNavigate() ;

    const {
        isAuthenticated
    } = props ;

    useEffect(() => {
        if(isAuthenticated) navigate('/');
    } , [isAuthenticated]) ;

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
                            <LoginForm />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps,  mapDispatchToProps)(Login) ;