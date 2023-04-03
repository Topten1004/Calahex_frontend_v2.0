


import React from 'react' ;

import { connect } from 'react-redux' ;
import { Link } from 'react-router-dom';

import {
    Box ,
    Grid,
    useMediaQuery
} from '@mui/material' ;

import LinkGp from './LinkGp';
import LinkAuth from './LinkAuth';

import LogoImg from '../../../assets/logo_footer.png' ;

import { makeStyles } from '@mui/styles' ;

const useStyles = makeStyles((theme) => ({
    root : {
        backgroundColor : theme.palette.background.default ,
        borderTop : '1px solid ' + theme.palette.common.black,
        paddingTop : "20px",
        paddingBottom : "20px",
    },
    divider : {
        border : "1px solid white" ,
        marginBottom : "20px"
    },
    linkAuth : {
        display : "flex" ,
        alignItems : "center" ,
        justifyContent : "center" , 
    },
    linkBottom : {
        display : "flex" ,
        flexDirection : "row" ,
        justifyContent : "flex-end" ,
        
        ['@media (max-width : 835px)'] : {
            justifyContent : "center"
        },
        ['@media (max-width : 580px)'] : {
            flexDirection : "column !important" ,
            alignItems : 'center'
        },
    },
    logo : {
        textAlign : "center"
    },
    link : {
        minWidth : "150px" ,
        textAlign : "center" ,

        marginTop : "5px",
        marginBottom : "5px",

        color : theme.palette.common.label,
        cursor : 'pointer'
    }
}));

const Footer = (props) => {

    const classes = useStyles() ;
    const match1 = useMediaQuery('(min-width : 985px)') ;
    const match2 = useMediaQuery('(min-width : 550px)') ;
    const match3 = useMediaQuery('(min-width : 350px)') ;
    const match4 = useMediaQuery('(min-width : 835px)') ;

    const {
        isAuthenticated
    } = props ;

    const linkGpTitleList = [
        {
            title : "ABOUT CA1EX" ,
            items : [
                {
                    label : 'Fee Info',
                    link : '/feeinfo'
                },
                {
                    label : 'Listed Assets' ,
                    link : '#'
                },
                {
                    label : 'Refferal' ,
                    link : '#'
                },
                {
                    label : 'Job Opportunities' ,
                    link : '#'
                }
                // "Fee Info" ,
                // "Listed Assets" ,
                // "Refferal" ,
                // "Job Opportunities"
            ]
        } ,
        {
            title : "SOCIAL" ,
            items : [
                "Twitter" ,
                "Facebook" ,
                "Instagram" ,
                "LinkIn"
            ]
        } ,
        {
            title : "SUPPORT" ,
            items : [
                "Contract"
            ]
        } ,
        {
            title : "LANGUAGE" , 
            items : [
                "English" , 
            ]
        }
    ]

    const linkBottomList = [
        "Term of Use" ,
        "Privacy Policy",
        "Cookie Policy" ,
        "E-Sign Consent"
    ]

    return (
        <Box className={classes.root}>
            <Grid container sx={{marginBottom : "20px"}} spacing={2}>
                {
                    !isAuthenticated && <Grid item xs={match2 ? 4  : 12} className={classes.linkAuth}>
                                            <LinkAuth />
                                        </Grid>
                }
                <Grid item xs={match2 ? !isAuthenticated ? 8 : 12 : 12}>
                    <Grid container >
                        {
                            linkGpTitleList.map(( linkGp , index ) => {
                                return (
                                    <Grid item xs={match1 ? 3 : match3 ? 6 : 12 } key={index}>
                                        <LinkGp 
                                            linkTitle={linkGp.title}
                                            linkList={linkGp.items}
                                        />
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
            <Box  className={classes.divider}> 

            </Box>
            <Grid container>
                <Grid item xs={match4 ? 4 : 12} className={classes.logo}>
                    <Box component={"img"} src={LogoImg} height={40}/>
                </Grid>
                <Grid item xs={match4 ? 8 : 12} className={classes.linkBottom}>
                    {
                        linkBottomList.map((element, index) => {
                            return (
                                <Box component={'span'} key={index} className={classes.link}>
                                    { element }
                                </Box>
                            )
                        })
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer) ;