import React from "react";
import "../styles/index.css";
import "../styles/LandingPage.css";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div className="background">
      <img src={logo} alt="Logo" />
      <p>
        Welcome to CovidShare, your all in one COVID-19 information center!
        <br />
        This project was founded by University of Florida students seeking to
        <br />
        create an interactive Coronavirus information center. Enjoy!
      </p>
      <a href="/home">
        <button className="ExploreButton">Explore!</button>
      </a>
    </div>
  );
};
export default LandingPage;
