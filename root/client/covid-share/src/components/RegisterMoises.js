import React, { useState, useRef, useEffect } from 'react';
import AuthService from '../services/AuthService';
import Message from '../components/Message';

const Register = (props) => {
    const [user, setUser] = useState({ username: "", email: "", fullName: "", password: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null); // Creates instance var to set timeout method

    // Cleans what useRef does
    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, [])

    const onChangeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        //console.log(user);
    }

    const resetForm = () => {
        setUser({ username: "", password: "", privilege: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.messageError) {
                timerID = setTimeout(() => {
                    props.history.push('/login');
                }, 2000)
            }
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <h3>Please Register</h3>

                <label htmlFor="fullName" classname="sr-only" />
                <input type="text"
                    name="fullName"
                    value={user.privilege}
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Full Name" />

                <label htmlFor="username" classname="sr-only" />
                <input type="text"
                    name="username"
                    value={user.username}
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Username" />

                <label htmlFor="email" classname="sr-only" />
                <input type="text"
                    name="email"
                    value={user.privilege}
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Email" />

                <label htmlFor="password" classname="sr-only" />
                <input type="password"
                    name="password"
                    value={user.password}
                    onChange={onChangeHandler}
                    className="form-control"
                    placeHolder="Password" />


                <button className="btn btn-lg btn-primary btn-block"
                    type="submit">Register</button>
            </form>

            {message ? <Message message={message} /> : null}
        </div>
    );
}

export default Register;