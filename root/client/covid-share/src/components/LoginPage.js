import React, { useRef } from "react";
import logoN from "../assets/LogoNew.png";
import "../styles/LoginPage.css";

const LoginPage = (props) => {
  let user = React.createRef();
  let password = React.createRef();
  let input1, input2;
  const userUpdate = () => {
    input1 = user.current.value;
    props.userUpdate(input1);
  };
  const passwordUpdate = () => {
    input2 = password.current.value;
    props.passwordUpdate(input2);
  };
  return (
    <div className="loginContainer">
      <img src={logoN} />
      <h1>LOG IN</h1>
      <div className="formContainer">
        <h3>Username</h3>
        <form>
          <input
            type="text"
            ref={user}
            onChange={userUpdate}
            className="form"
          />
        </form>
      </div>
      <div className="formContainer">
        <h3>Password</h3>
        <form>
          <input
            type="password"
            ref={password}
            onChange={passwordUpdate}
            className="form"
          />
        </form>
      </div>
      <button className="loginButton">LOG IN</button>
    </div>
  );
};

export default LoginPage;
