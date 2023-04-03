import React, { useEffect } from 'react';

import { Navigate , Outlet, useLocation } from 'react-router-dom';

import { connect } from 'react-redux' ;
import { ConfirmAuthentication } from '../redux/actions/auth';

const ProtectedRoute = (props) => {

    const {
      isAuthenticated,
      ConfirmAuthentication
    } = props ;

    const location = useLocation() ;

    useEffect(() => {
      ConfirmAuthentication() ;
    }, []) ;

    return !isAuthenticated ? <Navigate to="/login"  replace state={{ from: location }} /> : <Outlet />
       
}
  
const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
})
const mapDispatchToProps = {
  ConfirmAuthentication
}
export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute) ;