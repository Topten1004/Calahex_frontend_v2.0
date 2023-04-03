

import React from 'react' ;

import { useState, useEffect, useMemo } from 'react' ;
import { useLocation, useNavigate } from 'react-router-dom' ;

import { connect } from 'react-redux' ;
import { Profile } from '../../../redux/actions/auth';

import validate from 'validate.js';
import countries from 'react-select-country-list'
import languages from 'language-list' ;
import clsx from 'clsx' ;

import {
    Box ,
    TextField ,
    Button ,
    Grid ,
    FormGroup,
    FormControl,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Select,
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
        width : "500px" ,

        paddingTop : "15px" ,
        paddingBottom : "15px" ,

        boxShadow : "1px 1px 8px 0px grey",

        "& .MuiFormControl-root" : {
            marginBottom : "15px"
        } ,
        "& .MuiGrid-item" : {
            color : theme.palette.primary.main,
            fontSize : "14px"
        },

        "& svg" : {
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
    first_name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    last_name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    city: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    street: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    country: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    postal_code: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    birthday : {
        presence: { allowEmpty: false, message: 'is required' },
    },
    is_enable_fa : {
        presence: { allowEmpty: false, message: 'is required' },
    }
};

const schema2FA = {
    hobby: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300,
      },
    },
    mother_name: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300,
      },
    },
    father_name: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300,
      },
    },
    nick_name: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300,
      },
    },
    best_friend: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        maximum: 300,
      },
    },
}

const ProfileForm = (props) => {

    const classes = useStyles() ;
    const {
        error , Profile
    } = props ;

    const languageList = useMemo(() => languages().getData()  , []) ;
    const countryList = useMemo(() => countries().getData() , []) ;

    const navigate = useNavigate() ;
    const location = useLocation() ;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            is_enable_fa : false
        },
        touched: {},
        errors: {},
    });
    
    useEffect(()=>{
        let allSchema = schema;
        if (formState.values.is_enable_fa) {
            allSchema = {
                ...schema,
                ...schema2FA
            }   
        }
        
        const errors = validate(formState.values, schema);
        
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
    
    }, [formState.values] );  

    const handleChange = event => {
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

    const handleSubmit = async() => {
        
        if(formState.isValid) {
            await Profile({
                ...formState,
                email : location.state.email
            } , navigate) ;
        }
    }

    useEffect(() => {
        if(!location.state || !location.state.email) {
            return navigate('/login') ;
        }
    }, [location]) ;

    return (
        <Box className={clsx( classes.root , classes.flex )}>
            <Box  className={classes.title}>
                PROFILE
            </Box>
            <Box  className={classes.controls }>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        First name
                        <TextField
                            name={"first_name"}
                            type={"text"}
                            size={"small"}
                            placeholder={"First name"}

                            helperText={
                                hasError('first_name') ? formState.errors.first_name[0] : null
                            }
                            error={hasError('first_name')}
                            onChange={handleChange}
                            value={formState.values.first_name || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        Last name
                        <TextField
                            name={"last_name"}
                            type={"text"}
                            size={"small"}
                            placeholder={"Last name"}

                            helperText={
                                hasError('last_name') ? formState.errors.last_name[0] : null
                            }
                            error={hasError('last_name')}
                            onChange={handleChange}
                            value={formState.values.last_name || ''}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Country
                        <FormControl fullWidth>
                            <Select
                                name={"country"}
                                value={formState.values.country || countryList[0].label}
                                onChange={handleChange}
                                size={"small"}
                            >
                                {
                                    countryList.map( (country , index) => {
                                        return (
                                            <MenuItem value={country.label} key={index}>{country.label}</MenuItem>
                                        )
                                    } )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        City
                        <TextField
                            name={"city"}
                            type={"text"}
                            size={"small"}
                            placeholder={"City"}

                            helperText={
                                hasError('city') ? formState.errors.city[0] : null
                            }
                            error={hasError('city')}
                            onChange={handleChange}
                            value={formState.values.city || ''}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Street
                        <TextField
                            name={"street"}
                            type={"text"}
                            size={"small"}
                            placeholder={"Street"}

                            helperText={
                                hasError('street') ? formState.errors.street[0] : null
                            }
                            error={hasError('street')}
                            onChange={handleChange}
                            value={formState.values.street || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        Postal Code
                        <TextField
                            name={"postal_code"}
                            type={"text"}
                            size={"small"}
                            placeholder={"Postal code"}

                            helperText={
                                hasError('postal_code') ? formState.errors.postal_code[0] : null
                            }
                            error={hasError('postal_code')}
                            onChange={handleChange}
                            value={formState.values.postal_code || ''}
                            
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        Birthday
                        <TextField
                            name={'birthday'}
                            type={'date'}
                            size={'small'}
                            
                            helperText={
                                hasError('birthday') ? formState.errors.birthday[0] : null
                            }
                            error={hasError('birthday')}
                            onChange={handleChange}
                            value={formState.values.birthday || ''}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        Language
                        <FormControl fullWidth>
                            <Select
                                name={"language"}
                                value={formState.values.language || languageList[0].language}
                                onChange={handleChange}
                                size={"small"}
                            >
                                {
                                    languageList.map( (language , index) => {
                                        return (
                                            <MenuItem value={language.language} key={index}>{language.language}</MenuItem>
                                        )
                                    } )
                                }
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item xs={12}>
                        <FormGroup row sx={{marginTop : "15px"}}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    name="is_enable_fa"
                                    color="primary"
                                    onChange={handleChange}
                                />
                                }
                                label={<span className={classes.advertise}>Enable 2FA authentication</span>}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>

                {
                    formState.values.is_enable_fa && <>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Nick name
                                <TextField
                                    name={"nick_name"}
                                    type={"text"}
                                    size={"small"}
                                    placeholder={"Nick name"}

                                    helperText={
                                        hasError('nick_name') ? formState.errors.nick_name[0] : null
                                    }
                                    error={hasError('nick_name')}
                                    onChange={handleChange}
                                    value={formState.values.nick_name || ''}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                Mother name
                                <TextField
                                    name={"mother_name"}
                                    type={"text"}
                                    size={"small"}
                                    placeholder={"Mother name"}

                                    helperText={
                                        hasError('mother_name') ? formState.errors.mother_name[0] : null
                                    }
                                    error={hasError('mother_name')}
                                    onChange={handleChange}
                                    value={formState.values.mother_name || ''}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Father name
                                <TextField
                                    name={"father_name"}
                                    type={"text"}
                                    size={"small"}
                                    placeholder={"Father name"}

                                    helperText={
                                        hasError('father_name') ? formState.errors.father_name[0] : null
                                    }
                                    error={hasError('father_name')}
                                    onChange={handleChange}
                                    value={formState.values.father_name || ''}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                Hobby
                                <TextField
                                    name={"hobby"}
                                    type={"text"}
                                    size={"small"}
                                    placeholder={"Hobby"}

                                    helperText={
                                        hasError('hobby') ? formState.errors.hobby[0] : null
                                    }
                                    error={hasError('hobby')}
                                    onChange={handleChange}
                                    value={formState.values.hobby || ''}
                                />
                            </Grid>
                        </Grid>


                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                Best friend
                                <TextField
                                    name={"best_friend"}
                                    type={"text"}
                                    size={"small"}
                                    placeholder={"Best friend"}

                                    helperText={
                                        hasError('best_friend') ? formState.errors.best_friend[0] : null
                                    }
                                    error={hasError('best_friend')}
                                    onChange={handleChange}
                                    value={formState.values.best_friend || ''}
                                />
                            </Grid>
                        </Grid>
                    </>
                    
                }
                <Grid container>
                    <Grid item xs={12}>
                        <Button variant='contained' fullWidth onClick={() => handleSubmit()}>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

const mapStateToProps = state => ({
    error : state.auth.error
})

const mapDispatchToProps = {
    Profile
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm) ;