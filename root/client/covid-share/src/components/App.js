import React, { useState, useEffect } from "react";
import LandingPage from "./components/LandingPage.js";
import NavBar from "./components/NavBar.js";
import HomePage from "./components/HomePage.js";
import TwitterContainer from "./components/TwitterContainer.js";
import LoginPage from "./components/LoginPage.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = (props) => {
  //these states hold the values for username and password
  const [username, getUsername] = useState("");
  const [password, getPassword] = useState("");
  const userUpdate = (value) => {
    // this function gets the value of the username
    getUsername(value);
  };
  const passwordUpdate = (value) => {
    //this function gets the value of the password
    getPassword(value);
  };
  //return <LandingPage></LandingPage>;
  return (
    <LoginPage
      userUpdate={userUpdate}
      passwordUpdate={passwordUpdate}
      password={password}
      username={username}
    ></LoginPage>
  );
};

export default App;
