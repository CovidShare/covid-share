import React, { useState, useContext } from "react";
//import { Redirect } from 'react-router'
import AuthService from "../services/AuthService";
import Message from "../components/Message";
import { AuthContext } from "../context/AuthContext";
import logoN from "../assets/LogoNew.png";
import "../styles/Login.css";

const Login = (props) => {
  const authContext = useContext(AuthContext);
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  //const [redirect, setRedirect] = useState(false);


  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      //console.log(data);
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      } else setMessage(message);
      if (!message.messageError) {
        //setRedirect(true);
        props.history.push("/");
      }
    });
  };

  return (
    <div className="loginContainer">
      <a href="/home">
        <img src={logoN} />
      </a>
      <h1>LOG IN</h1>
      <form onSubmit={onSubmitHandler}>
        <div className="form-group">
          <div className="formContainer">
            <h3>Username</h3>
            <input
              type="text"
              name="username"
              onChange={onChangeHandler}
              className="form"
            />
          </div>
          <div className="formContainer">
            <h3>Password</h3>

            <input
              type="password"
              name="password"
              onChange={onChangeHandler}
              className="form"
            />
          </div>
          <button className="loginButton" type="submit">
            LOG IN
          </button>
        </div>
        {message ? <Message className="message" message={message} /> : null}
        {/*redirect ? <Redirect to="/home"/> : null*/}
      </form>
    </div>
  );
};


export default Login;
