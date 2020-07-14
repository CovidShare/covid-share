import React from "react";
import NavBar from "../components/NavBar.js";
import "../styles/HomePage.css";
import logoN from "../assets/LogoNew.png";
import TwitterContainer from "../components/TwitterContainer.js";
import CDC from "../components/CDC.js";

const HomePage = (props) => {
  return (
    <div className="home">
      <img src={logoN} alt="logo" class="center" />
      <button className="logIn">Log In</button>
      <NavBar></NavBar>
      <div className="apis">
        <CDC className="pls"></CDC>
        <TwitterContainer></TwitterContainer>
      </div>
      <div className="footer">COVIDSHARE</div>
    </div>
  );
};

export default HomePage;
