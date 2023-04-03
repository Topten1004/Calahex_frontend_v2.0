import React, { memo, lazy, Suspense, Fragment } from "react";
// import PropTypes from "prop-types";

import { Routes , Route } from "react-router-dom";

// Pages
import Landing from "../pages/Landing" ;
import CryptoExchange from "../pages/CryptoExchange" ;
import Wallet from '../pages/Wallet' ;
import BuyCrypto from "../pages/BuyCrypto";
import AboutUs from '../pages/AboutUs' ;
import FeeInfo from '../pages/FeeInfo' ;

import SignUp from "../pages/Auth/SignUp" ;
import Login from "../pages/Auth/Login" ;
import Profile from "../pages/Auth/Profile" ;
import Confirm from '../pages/Auth/Confirm' ;
import ProfileEdit from "../pages/Auth/ProfileEdit";
import ChangePassword from "../pages/Auth/ChangePassword";

import NotFound from '../components/Common/NotFound' ;

const ProtectedRoute = lazy(() => import('../utils/ProtectedRoute')) ;

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={< Landing/>} />
            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/confirm" element={<Confirm />} />
            
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path='/feeinfo' element={<FeeInfo />} />

            <Route path="/cryptoexchange" element={<CryptoExchange />} />

            <Route element={<ProtectedRoute />}>
                <Route path='/editprofile' element={<ProfileEdit />} />
                <Route path='/changepassword' element={<ChangePassword />} />
                <Route path="/buycrypto" element={<BuyCrypto />} />
                <Route path="/wallet" element={<Wallet />} />
            </Route>

            <Route path='/*' element={<NotFound />} />
        </Routes>
    );
}

Routing.propTypes = {
    // selectLanding: PropTypes.func.isRequired,
};

export default memo(Routing);
