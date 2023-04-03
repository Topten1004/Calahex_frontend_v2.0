

import React from 'react' ;

import { useState, useEffect } from 'react' ;
import { useNavigate } from 'react-router-dom';

import { connect } from 'react-redux' ;
import PropTypes from 'prop-types' ;
import { ConfirmUser } from '../../../redux/actions/auth';

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
        border : '1px solid lightgray',

        paddingTop : "15px" ,
        paddingBottom : "15px" ,

        boxShadow : "3px 5px 13px -2px lightblue",

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
    resend_code: {
        presence: { allowEmpty: false, message: 'is required' },
    },
};

const ConfirmForm = (props) => {

    const classes = useStyles() ;

    const navigate = useNavigate() ;
    
    const {
        ConfirmUser , error
    } = props ;

    const [captcha, setCaptcha] = useState(true);

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

    const onHandleRecaptcha = (value) => {
        setCaptcha(value);
    };

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

    const handleSubmit = async () => {
        if(formState.isValid){
            await ConfirmUser(formState , navigate);
        }
    }
    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box component={"img"} src={CalaHexImg} sx={{marginBottom : "15px"}} height={40}/>
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

                <ReCAPTCHA 
                    sitekey='6LeKxQwaAAAAAGPOpMltsXMf5Jv5s8_iuIPgn7jA'
                    onChange={onHandleRecaptcha}
                />
                
                <Box className={classes.advertise} sx={{marginTop : "15px" , textAlign:"right" , cursor:"pointer"}}>
                    Resend Confirm Email
                </Box>
                
                <Button 
                    variant={"contained"}
                    fullWidth
                    sx={{marginTop : "15px"}}
                    onClick={handleSubmit}
                    disabled={captcha ? false : true}
                >
                    Confirm
                </Button>
            </Box>
        </Box>
    )
}

ConfirmForm.propTypes = {
    ConfirmUser : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    error : state.auth.error
})

const mapDispatchToProps = {
    ConfirmUser
}

export default connect(mapStateToProps , mapDispatchToProps)(ConfirmForm) ;