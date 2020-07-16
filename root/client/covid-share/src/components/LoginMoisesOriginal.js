import React, { useState, useContext } from 'react';
import AuthService from '../services/AuthService'
import Message from '../components/Message';
import { AuthContext } from '../context/AuthContext';

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name] : e.target.value});
        //console.log(user);
    }

    const onSubmitHanlder = (e) => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            const { isAuthenticated, user, message} = data;
            //console.log(data);
            if(isAuthenticated){
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
            }
            else
                setMessage(message);
        });
    }

    return (
        <div>
            <form onSubmit={onSubmitHanlder}>
                <h3>Sign up</h3>
                <label htmlFor="username" classname="sr-only"/>
                <input type="text"
                    name="username"
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Enter Username" />

                <label htmlFor="password" classname="sr-only"/>
                <input type="password"
                    name="password"
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Enter Password" />

                <button className="btn btn-lg btn-primary btn-block"
                    type="submit">Log in</button>
            </form>

            { message ? <Message message = {message}/> : null }
        </div>
    );
}

export default Login;