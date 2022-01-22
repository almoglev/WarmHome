import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import {ReactComponent as SpinnerSVG} from '../assets/svg/spinner.svg';


export const PrivateRoute = () => {
    const {loggedIn, checkingStatus} = useAuthStatus()

    if (checkingStatus) {
            return <SpinnerSVG />
    }
 
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};
