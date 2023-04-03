

import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types';
import { ClearAuthError, SignInUser } from '../../../redux/actions/auth';

import ReCAPTCHA from 'react-google-recaptcha' ;
import validate from 'validate.js';
import CalaHexImg from '../../../assets/logo_footer.png' ;
import swal from 'sweetalert';
import clsx from 'clsx' ;

import {
    Box ,
    TextField ,
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
};

const LoginForm = (props) => {

    const classes = useStyles() ;

    const {
        SignInUser , 
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

    useEffect(async () => {
        if(error) {
            swal({
                title : "Error" ,
                text : error,
                icon : "warning" ,
                buttons : false ,
                timer : 5000
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
            await  SignInUser(formState , navigate) ;
        }
    }
    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box component={"img"} src={CalaHexImg} sx={{marginBottom : "15px", height : '35px'}} />
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

                <ReCAPTCHA 
                    sitekey='6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA'
                    onChange={onHandleRecaptcha}
                />

                <Button 
                    variant={"contained"}
                    fullWidth
                    sx={{marginTop : "15px"}}
                    onClick={handleSubmit}
                    disabled={captcha ? false : true}
                >
                    Log In
                </Button>

                <Box className={classes.advertise} sx={{marginTop : "15px"}}>
                    Don't you have an account? Sign Up
                </Box>
            </Box>
        </Box>
    )
}

LoginForm.propTypes = {
    SignInUser : PropTypes.func.isRequired,
    ClearAuthError : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error : state.auth.error,
})
const mapDispatchToProps = {
    SignInUser ,
    ClearAuthError
}

export default connect(mapStateToProps , mapDispatchToProps)(LoginForm) ;