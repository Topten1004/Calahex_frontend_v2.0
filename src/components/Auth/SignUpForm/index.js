

import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom' ;

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ClearAuthError, SignUpUser } from '../../../redux/actions/auth';

import ReCAPTCHA from 'react-google-recaptcha' ;
import validate from 'validate.js';
import swal from 'sweetalert' ;
import clsx from 'clsx' ;

import {
    Box ,
    TextField ,
    FormGroup,
    FormControlLabel,
    Checkbox ,
    Button
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

        "& .MuiFormControl-root" : {
            marginBottom : "15px"
        },

        "& .MuiSvgIcon-root" : {
            color : 'white'
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
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
        minimum: 8,
        },
    },
    password_confirmation: {
        presence: { allowEmpty: false, message: 'is required' },
        equality: "password",
    },
    refferal_code: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const SignUpForm = (props) => {

    const classes = useStyles() ;

    const {
        SignUpUser ,
        ClearAuthError, error
    } = props ;

    const navigate = useNavigate() ;

    const [captcha, setCaptcha] = useState(true);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

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

    const onHandleRecaptcha = (value) => {
        setCaptcha(value);
    };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleSubmit = async () => {
        if(formState.isValid){
            await SignUpUser(formState, navigate) ;
        }
    }

    useEffect(async () => {
        if(error) {
            swal({
                title : "Error" ,
                text : error ,
                icon : "warning" ,
                buttons : false ,
                timer : 2000
            })

            await ClearAuthError() ;
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

    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box className={classes.title}>
                SIGN UP
            </Box>
            <Box className={classes.controls }>
                
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
                <TextField
                    name={"password"}
                    type={"password"}
                    size={'small'}
                    placeholder={'Password'}
                    fullWidth
                    
                    helperText={
                        hasError('password') ? formState.errors.password[0] : null
                    }
                    error={hasError('password')}
                    onChange={handleChange}
                    value={formState.values.password || ''}
                />
                <TextField
                    name={"password_confirmation"}
                    size={'small'}
                    type={"password"}
                    placeholder={'Confirm Password'}
                    fullWidth

                    helperText={
                        hasError('password_confirmation') ? formState.errors.password_confirmation[0] : null
                    }
                    error={hasError('password_confirmation')}
                    onChange={handleChange}
                    value={formState.values.password_confirmation || ''}
                />
                <TextField
                    name="refferal_code"
                    type="text"
                    size={'small'}
                    placeholder={'Refferal Code'}
                    fullWidth

                    helperText={
                        hasError('refferal_code') ? formState.errors.refferal_code[0] : null
                    }
                    error={hasError('refferal_code')}
                    onChange={handleChange}
                    value={formState.values.refferal_code || ''}
                />
                
                <Box className={classes.advertise}>
                    If you were invited by a friend, enter his/her code here. You will not be able to apply a refferal code once your account has been created.
                </Box>

                <ReCAPTCHA 
                    sitekey='6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA'
                    onChange={onHandleRecaptcha}
                />

                <FormGroup row sx={{marginTop : "15px"}}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="checkedB"
                        color="primary"
                        onChange={handleChange}
                      />
                    }
                    label={<span className={classes.advertise}>Agree on Privacy and Cookie policy</span>}
                  />
                </FormGroup>

                <Button 
                    variant={"contained"}
                    fullWidth
                    sx={{marginTop : "15px"}}
                    onClick={handleSubmit}
                    disabled={captcha ? false : true}
                >
                    Sign Up
                </Button>

            </Box>
        </Box>
    )
}

SignUpForm.propTypes = {
    SignUpUser : PropTypes.func.isRequired,
    ClearAuthError : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error : state.auth.error,
})
const mapDispatchToProps = {
    SignUpUser ,
    ClearAuthError
}

export default connect(mapStateToProps , mapDispatchToProps)(SignUpForm) ;