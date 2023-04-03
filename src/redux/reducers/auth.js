import ActionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
    isAuthenticated : false ,
    accessToken : null,
    error : null ,
    profile : null,

    confirm2FA : null,
    check2FA : false
}

export default (state=INITIAL_STATE , action) => {
    switch(action.type){
        case ActionTypes.ConfirmAuth : 
            return ({
                ...state ,
                isAuthenticated : action.payload.isAuthenticated,
                access_token : action.payload.accessToken
            }) ;
        case ActionTypes.SignOutUser : 
            return ({
                ...state,
                isAuthenticated : false,
                accessToken : null
            })
        case ActionTypes.ClearAuthError : 
            return ({
                ...state,
                error : null
            })
        case ActionTypes.SignInUser : 
            return ({
                ...state ,
                isAuthenticated : true,
                accessToken : action.payload.accessToken,
                profile : action.payload.profile,
                error : null
            })
        case ActionTypes.ConfirmUser :
            return ({
                ...state,
                profile : action.payload.profile,
                error : null
            })
        case ActionTypes.Profile : 
            return ({
                ...state , 
                profile : action.payload.profile,
                isAuthenticated : true,
                accessToken : action.payload.accessToken
            })
        case ActionTypes.ProfileEdit : 
            return ({
                ...state , 
                profile : action.payload.profile
            })
        case ActionTypes.ProfileInfo :
            return ({
                ...state,
                profile : action.payload
            })
        case ActionTypes.SignUpUserError :
            return({
                ...state,
                error : action.payload
            })
        case ActionTypes.SignInUserError :
            return ({
                ...state,
                error : action.payload
            })
        case ActionTypes.ConfirmUserError :
            return ({
                ...state,
                error : action.payload
            })
        case ActionTypes.ProfileError :
            return ({
                ...state ,
                error : action.payload
            })
        case ActionTypes.ProfileEditError :
            return ({
                ...state ,
                error : action.payload
            })
        case ActionTypes.Confirm2FAProfile :
            return ({
                ...state,
                confirm2FA : action.payload,
            })
        case ActionTypes.ClearConfirm2FA :
            return ({
                ...state,
                confirm2FA : null
            })
        case ActionTypes.Check2FAProfile :
            return ({
                ...state,
                check2FA : action.payload
            })
        case ActionTypes.Check2FAProfileError :
            return ({
                ...state,
                check2FA : false
            })
        case ActionTypes.ConfirmAuthError :
            return ({
                ...state,
                isAuthenticated : action.payload.isAuthenticated,
                accessToken : action.payload.accessToken,
                profile : null,
                error : null
            })
        case ActionTypes.Confirm2FAProfileError :
        case ActionTypes.SignUpUser :
        default :
            return state ;
    }
}