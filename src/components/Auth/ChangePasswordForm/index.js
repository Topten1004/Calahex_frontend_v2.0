

import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;


import validate from 'validate.js';
import CalaHexImg from '../../../assets/logo_footer.png' ;
import swal from 'sweetalert';
import clsx from 'clsx' ;

import {
    Box ,
    TextField ,
    Button,
    Grid
} from '@mui/material' ;

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    flex : {
        display : "flex" ,
        justifyContent : "center" ,
        alignItems : "center" ,
        flexDirection : "column",
    },
    root : {
        width : "400px" ,

        paddingTop : "15px" ,
        paddingBottom : "15px" ,

        boxShadow : "1px 1px 8px 0px gray",

        "& .MuiGrid-item" : {
            marginBottom : 15
        },

        "& .MuiSvgIcon-root" : {
            color : theme.palette.common.label
        }
    } , 
    title : {
        color : theme.palette.primary.main ,
        fontSize : "35px"
    } , 
    controls : {
        width : "80%"
    } ,
    advertise : {
        color : theme.palette.primary.main ,
        fontSize : "12px" ,
        marginBottom : "15px"
    }
}));

const schema = {
    email: {
        presence: { allowEmpty: false, message: 'is required' },
        email: true,
        length: {
            maximum: 300,
        },
    },
    resend_code: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const ChangePasswordForm = (props) => {

    const classes = useStyles() ;

    const navigate = useNavigate() ;
    
    const {
         error
    } = props ;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    useEffect(() => {
        if(error) {
            swal({
                title : "Confirm User Failed" ,
                text : error,
                icon : "warning",
                buttons : false ,
                timer : 2000
            })
        }
    } , [error])

    useEffect(()=>{
        const errors = validate(formState.values, schema);
        
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
    
    }, [formState.values] );  

    const handleChange = event => {
        event.persist();
    
        setFormState(formState => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleSubmit = async () => {
        if(formState.isValid){
            
        }
    }
    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box component={"img"} src={CalaHexImg} sx={{marginBottom : "15px"}} height={40} />
            <Box className={classes.controls }>
                <Grid container>
                    <Grid item xs={12}>
                        <TextField
                            name={"email"}
                            type="email"
                            size={'small'}
                            placeholder={'E-mail'}
                            fullWidth
                            
                            helperText={hasError('email') ? formState.errors.email[0] : null}
                            error={hasError('email')}
                            onChange={handleChange}
                            value={formState.values.email || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name={"resend_code"}
                            type={"text"}
                            size={'small'}
                            placeholder={'Key'}
                            fullWidth
                            
                            helperText={
                                hasError('resend_code') ? formState.errors.resend_code[0] : null
                            }
                            error={hasError('resend_code')}
                            onChange={handleChange}
                            value={formState.values.resend_code || ''}
                        />
                    </Grid>
                </Grid>
                <Button 
                    variant={"contained"}
                    fullWidth
                    sx={{marginTop : "15px"}}
                    onClick={handleSubmit}
                >
                    CHANGE
                </Button>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    error : state.auth.error
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps , mapDispatchToProps)(ChangePasswordForm) ;