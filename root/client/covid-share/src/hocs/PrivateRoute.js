import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.js';

const PrivateRoute = ({component : Component, privileges, ...rest})=>{
    const { isAuthenticated, user} = useContext(AuthContext);
    return(
        <Route {...rest} render={props =>{
            if(!isAuthenticated)
                return <Redirect to={{ pathname: '/login', state : {from : props.location}}}/>
            
            if(!privileges.includes(user.privilege))
                return <Redirect to={{ pathname: '/', state : {from : props.location}}}/>
            return <Component {...props}/>
        }}/>
    )
}

export default PrivateRoute;