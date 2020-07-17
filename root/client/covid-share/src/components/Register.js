import React, { useState, useContext } from "react";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import Message from "../components/Message";
import logoN from "../assets/LogoNew.png";

const Register = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    //console.log(user);
  };

  const resetForm = () => {
    setUser({
      username: "",
      fullName: "",
      password: "",
      email: "",
  });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message, isAuthenticated } = data;
      setMessage(message);
      resetForm();
      if (!message.messageError) {
        setIsAuthenticated(isAuthenticated)
        props.history.push("/login");
      }
    });
  };

  return (
    <div className="loginContainer">
      <a href="/home">
        <img src={logoN} />
      </a>
      <h1>CREATE A NEW ACCOUNT</h1>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <div className="formContainer">
            <h3>Full Name</h3>

            <input
              type="text"
              name="fullName"
              value={user.fullName}
              className="name"
              onChange={onChangeHandler}
            />
          </div>
          <div className="formContainer">
            <h3>Username</h3>

            <input
              type="text"
              name="username"
              value={user.username}
              className="username"
              onChange={onChangeHandler}
            />
          </div>
          <div className="formContainer">
            <h3>Email </h3>

            <input
              type="text"
              name="email"
              value={user.email}
              onChange={onChangeHandler}
              className="email"
            />
          </div>
          <div className="formContainer">
            <h3>Password</h3>

            <input
              type="password"
              name="password"
              value={user.password}
              className="form"
              onChange={onChangeHandler}
            />
          </div>
          <button className="loginButton" type="submit">
            SIGN UP
          </button>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
