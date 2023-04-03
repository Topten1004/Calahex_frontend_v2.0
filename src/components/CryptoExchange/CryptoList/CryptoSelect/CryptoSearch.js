


import React from 'react' ;

import ManageSearchIcon from '@mui/icons-material/ManageSearch';

import {
    Box,
    FormControlLabel,
    FormGroup,
    Checkbox,
    Grid
} from '@mui/material';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root : {
        display : 'flex' ,
        alignItems : 'center',
        boxSizing : 'border-box',
        height : '30px',

        paddingLeft : '15px',
        paddingRight : '15px',

        borderBottom : '1px solid gray',
        background : theme.palette.background.default,
        color : theme.palette.common.label,

        "& .MuiGrid-item" : {
            display : 'flex',
            justifyContent : 'center',
            alignItems : 'center',
            
            fontSize : "14px" ,
            "& .MuiSvgIcon-root" : {
                fontSize : '16px'
            }
        }
    },
    search : {
        "& input" : {
            borderRadius : 5,
            border : "none" ,
            width : "100%" ,
            fontSize : "12px",

            background : theme.palette.common.lightBlack,
            color : theme.palette.common.label,

            paddingLeft : 5,
            paddingRight : 5
        },
        "& input:focus" : {
            outline : "none"
        }
    },
    check : {
        fontSize : '12px'
    }
}))

const CryptoSearch = (props) => {
    
    const classes = useStyles() ;
    
    const {
        handleSearchCrypto
    } = props ;

    return (
        <Box className={classes.root}>
            <Grid container>
                <Grid item xs={6} className={classes.search}>
                    <Box component={'span'} className={classes.check}><ManageSearchIcon /></Box>
                    <Box component={'input'} onChange={(e) => handleSearchCrypto(e.target.value)}/>
                </Grid>
                <Grid item xs={3}>
                    <Box component={'input'} type='radio' name='radio' defaultChecked/>
                    <Box component={'span'} className={classes.check}>Volume</Box>
                </Grid>
                <Grid item xs={3}>
                    <Box component={'input'} type='radio' name='radio'/>
                    <Box component={'span'} className={classes.check}>Balance</Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default CryptoSearch;