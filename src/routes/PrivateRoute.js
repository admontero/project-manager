import React from 'react';
import { Navigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const PrivateRoute = ({ children, ...props }) => {

    const cookies = new Cookies();

    return !cookies.get('_id') ? 
            <Navigate to="/" /> : 
        !props.roles.includes(cookies.get('tipo')) ? 
            <Navigate to="/forbidden" /> 
        : 
            children ;
};
 
export default PrivateRoute;