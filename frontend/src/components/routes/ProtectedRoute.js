import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({exact, path, children}) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        return <Redirect to='/login' />
    }

    else {
        return (
            <Route exact={exact} path={path}>
                {children}
            </Route>
        )
    }
}

export default ProtectedRoute;