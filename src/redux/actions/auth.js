import ActionTypes from './actionTypes' ;
import * as config from '../../static/constants';

import { eraseCookie, setCookie, authorization, errorHandler, getCookie } from '../../utils/helper' ;

import axios from 'axios' ;

export const ClearAuthError = () => async dispatch => {
    return dispatch({
        type : ActionTypes.ClearAuthError
    })
}

export const SignUpUser = (formState, navigate) => async dispatch => {
    try {
        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/signup` , {
            email : formState.values.email,
            password : formState.values.password,
            refferal_code : formState.values.refferal_code
        }) ;

        if(res.status === 200) {
            return navigate('/login' , formState.values.email) ;
        }

    } catch(err) {
        return dispatch({
            type : ActionTypes.SignUpUserError ,
            payload : errorHandler(err)
        })
    }
}

export const SignInUser = (formState , navigate) => async dispatch => {
    try {
        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/signin` , {
            email : formState.values.email,
            password : formState.values.password
        })

        if(res.status === 200) {
            setCookie('access_token', res.data.access_token) ;
            return dispatch({
                type : ActionTypes.SignInUser,
                payload : {
                    profile : res.data.profile ,
                    accessToken : res.data.access_token,
                }
            })
        } 

    } catch(err) {
        dispatch({
            type : ActionTypes.SignInUserError ,
            payload : errorHandler(err) 
        })

        if(errorHandler(err) === "Email isn't verified") {
            navigate('/confirm')
        }
        if(errorHandler(err) === "Profile does not exist") {
            navigate('/profile',{
                state : {
                    email : formState.values.email
                }
            })
        }

        return ;
    }
}

export const SignOutUser = () => async dispatch => {
    eraseCookie('access_token');

    dispatch({
        type : ActionTypes.SignOutUser
    })
}

export const ConfirmUser = (formState , navigate) => async dispatch => {
    try {
        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/confirm` , {
            email : formState.values.email,
            email_verify_code : formState.values.resend_code
        })

        if(res.status === 200) {
            dispatch({
                type : ActionTypes.ConfirmUser ,
                payload : {
                    profile : res.data.profile,
                }
            }) ;

            navigate('/profile', {
                state : {
                    email : formState.values.email
                }
            }) ;
        }
    } catch(err) {
        return dispatch({
            type : ActionTypes.ConfirmUserError,
            payload : errorHandler(err)
        })
    }
}

export const Profile = (formState , navigate) => async dispatch => {
    try {
        const header = authorization() ;

        let json = {
            first_name : formState.values.first_name,
            last_name : formState.values.last_name,
            postal_code : formState.values.postal_code,
            street : formState.values.street,
            country : formState.values.country,
            language : formState.values.language,
            birthday : formState.values.birthday,
            city : formState.values.city,
            is_enable_fa : formState.values.is_enable_fa,
            email : formState.email
        } ;

        if(formState.values.is_enable_fa) {
            json = {
                ...json ,
                nick_name : formState.values.nick_name,
                mother_name : formState.values.mother_name,
                father_name : formState.values.father_name,
                hobby : formState.values.hobby,
                best_friend : formState.values.best_friend
            }
        }

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/profile`, json, header ) ;

        if(res.status === 200){
            setCookie('access_token', res.data.access_token) ;

            dispatch({
                type : ActionTypes.Profile ,
                payload : {
                    profile : res.data.profile,
                    accessToken : res.data.access_token
                }
            })

            navigate('/') ;
        }
    } catch(err) {
        console.log(errorHandler(err));
        return dispatch({
            type : ActionTypes.ProfileError,
            payload : errorHandler(err)
        })
    }
}

export const ProfileInfo = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/profileInfo`, {}, header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.ProfileInfo,
                payload : res.data.profile
            })
        }
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.ProfileInfoError,
        })
    }
}

export const ProfileEdit = (formState , navigate) => async dispatch => {
    try {

        const header = authorization( );

        let json = {
            first_name : formState.values.first_name,
            last_name : formState.values.last_name,
            postal_code : formState.values.postal_code,
            street : formState.values.street,
            country : formState.values.country,
            language : formState.values.language,
            birthday : formState.values.birthday,
            city : formState.values.city,
            is_enable_fa : formState.values.is_enable_fa,
            _id : formState.values._id
        } ;

        if(formState.values.is_enable_fa) {
            json = {
                ...json ,
                nick_name : formState.values.nick_name,
                mother_name : formState.values.mother_name,
                father_name : formState.values.father_name,
                hobby : formState.values.hobby,
                best_friend : formState.values.best_friend
            }
        }

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/editprofile`, json, header ) ;

        if(res.status === 200){
            await dispatch({
                type : ActionTypes.ProfileEdit ,
                payload : {
                    profile : res.data.profile,
                }
            })
            navigate('/') ;
        }
    } catch(err) {
        console.log(errorHandler(err));
        return dispatch({
            type : ActionTypes.ProfileEditError,
            payload : err.response.data.message
        })
    }
}

export const Check2FAProfile = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/check2FAProfile`, {}, header) ;

        if(res.status === 200){
            return dispatch({
                type : ActionTypes.Check2FAProfile,
                payload : res.data.check2FA
            })
        } 
    } catch(err) {
        console.log(errorHandler(err)) ;

        return dispatch({
            type : ActionTypes.Check2FAProfileError
        })
    }
}

export const Confirm2FAProfile = (values) => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/confirm2FAProfile`, values , header) ;

        return dispatch({
            type : ActionTypes.Confirm2FAProfile,
            payload : res.data
        }) ;

    } catch(err) {
        console.log(errorHandler(err)) ;
        return dispatch({
            type : ActionTypes.Confirm2FAProfileError
        }) ;
    }
}

export const ClearConfirm2FA = () => async dispatch => {
    return dispatch({
        type : ActionTypes.ClearConfirm2FA
    })
}

export const ConfirmAuthentication = () => async dispatch => {
    try {
        const header = authorization() ;

        let res = await axios.post(`${config.PRIVATE_CA1EX_API}auth/isAuthenticated`, {} , header) ;

        if(res.status === 200) {
            return dispatch({
                type : ActionTypes.ConfirmAuth,
                payload : {
                    isAuthenticated : true,
                    accessToken : getCookie('access_token') 
                }
            })
        }
        return dispatch({
            type : ActionTypes.ConfirmAuthError,
            payload : {
                isAuthenticated : false,
                accessToken : null
            }
        })
    } catch(err) {
        console.log(errorHandler(err));

        return dispatch({
            type : ActionTypes.ConfirmAuthError,
            payload : {
                isAuthenticated : false,
                accessToken : null
            }
        })
    }
}