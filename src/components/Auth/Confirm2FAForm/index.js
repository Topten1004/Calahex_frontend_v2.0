import React, { useEffect, useState } from 'react' ;

import { connect } from 'react-redux';
import { Confirm2FAProfile, ClearConfirm2FA } from '../../../redux/actions/auth' ;

import validate from 'validate.js';

import {
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Grid,
    TextField,
    Button,
    Divider,
    Alert,
    AlertTitle
} from '@mui/material' ;

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

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    root : {
        
    },
    dlgPaper : {
        "& .MuiGrid-container" : {
            marginBottom : 10
        }
    }
})) ;

const Confirm2FAForm = (props) => {

    const classes = useStyles() ;

    const {
        Confirm2FAProfile, confirm2FA, 
        ClearConfirm2FA,
        open, 
        handleClose2FAForm, handleConfirm2FA
    } = props ;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
    });

    const hasError = field => formState.touched[field] && formState.errors[field] ? true : false;

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

    const handleSubmit = async() => {
        
        if(formState.isValid) {
        //    handleClose();
            await Confirm2FAProfile(formState.values) ;
        }
    }
    
    useEffect(()=>{
        const errors = validate(formState.values, schema2FA);
        
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {},
        }));
    
    }, [formState.values] );  

    useEffect(() => {
        if(confirm2FA) {
            if(confirm2FA.code === 200) {
                ClearConfirm2FA() ;
                setFormState({
                    isValid : false,
                    values : {},
                    touched : {},
                    errors : {}
                });
                handleConfirm2FA() ;
            }
        }
    }, [confirm2FA]) ;

    return (
        <Box className={classes.root}>
            <Dialog open={open} 
                    classes={{
                        paper : classes.dlgPaper
                    }}
            >
                <DialogTitle>
                    2FA Authentication
                </DialogTitle>
                <Divider />
                <DialogContent>
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

                    {
                        confirm2FA &&  ( confirm2FA.code !== 200 && <Alert severity="error">
                                                                        <AlertTitle>{confirm2FA.message}</AlertTitle>
                                                                        { confirm2FA.status }
                                                                    </Alert> 
                                        )
                    }

                </DialogContent>
                <DialogActions>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant='contained' fullWidth onClick={() => handleSubmit()}>Confirm</Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' fullWidth onClick={handleClose2FAForm}>Cancel</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
        </Box>
    )
}


const mapStateToProps = state => ({
    confirm2FA : state.auth.confirm2FA
})

const mapDispatchToProps = {
    Confirm2FAProfile,
    ClearConfirm2FA
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm2FAForm) ;