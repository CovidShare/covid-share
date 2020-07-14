import React from "react";
import LandingPage from "./components/LandingPage.js";
import NavBar from "./components/NavBar.js";
import HomePage from "./components/HomePage.js";
import TwitterContainer from "./components/TwitterContainer.js";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = (props) => {
  //return <LandingPage></LandingPage>;
  return <HomePage></HomePage>;
};

export default App;
