import React, { Component, useState, useContext } from "react";
import axios from "axios";
import cheerio from "cheerio";
import NavBar from "./NavBar.js";
import logoN from "../assets/LogoNew.png";
import AuthService from "../services/AuthService";
import { AuthContext } from "../context/AuthContext";
import PreventionLinks from "./PreventionLinks.js";
import { Nav } from "react-bootstrap";
import "../styles/Prevention.css";
const Prevention = (props) => {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedUser = () => {
    return (
      <>
        <a href="/login">
          <button className="logIn_logOut">Log In</button>
        </a>

        <a href="/register">
          <button className="signUp">Sign Up</button>
        </a>
      </>
    );
  };

  const authenticatedUser = () => {
    return (
      <>
        <button
          type="button"
          className="logIn_logOut"
          onClick={onClickLogoutHandler}
        >
          Logout
        </button>

        <a href="/profile">
          <button className="signUp">Profile</button>
        </a>
      </>
    );
  };
  return (
    <div className="home">
      <a href="/home">
        <img src={logoN} alt="logo" class="center" />
      </a>
      {!isAuthenticated ? unauthenticatedUser() : authenticatedUser()}
      <NavBar></NavBar>
      <div className="preventionContainer">
        <h1>Your Guide to the Latest COVID-19 Prevention Tips from the CDC</h1>
        <p>
          This page is dedicated to providing the latest articles about how to
          protect yourself and others from getting the coronavirus. This page
          updates automatically each time the CDC uploads a new article about
          Coronavirus prevention.
        </p>

        <PreventionLinks></PreventionLinks>
      </div>
    </div>
  );
};

export default Prevention;
