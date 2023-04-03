import React from 'react' ;

import { connect } from 'react-redux';

import Notification from './Notification';

import {
    Box,
    Collapse,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        height : "calc(100vh - 60px)" ,
        width : 350 ,

        ['@media (max-width : 350px)'] : {
            width : 280
        },

        padding : '15px',

        overflow : 'hidden',
        overflowY : 'scroll',

        position: 'fixed' ,
        top : "60px !important",
        right : '0px',
        zIndex : 3000,
        wordBreak : 'break-word',

        boxShadow : "-3px 0px 7px -2px gray",
        background : theme.palette.common.lightBlack,
        border : '1px solid gray'
    }
}))

const NotificationList = (props) => {

    const classes = useStyles() ;

    const {
        isVisibleNotifyList,
        allNotifications
    } = props ;

    return (
        <Collapse in={isVisibleNotifyList} unmountOnExit timeout={'auto'} >
            <Box className={classes.root}>
                <Grid container spacing={2}>
                    {
                        allNotifications && allNotifications.map((notify, index) => {
                            return (
                                <Grid item xs={12} key={index}>
                                    <Notification
                                        title={notify.title}
                                        description={notify.description}
                                    />
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Box>
        </Collapse>
    )
}

const mapStateToProps = state => ({
    allNotifications : state.stream.allNotifications
}) ;

const mapDispatchToProps = {

} ;

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList) ;
