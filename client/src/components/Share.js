import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar.js";
import "../styles/HomePage.css";
import logoN from "../assets/LogoNew.png";
import { Container, Row, Col } from "react-bootstrap";
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';
import Comments from "./Comments.js";

const Share = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
  
    const onClickLogoutHandler = () => {
      AuthService.logout().then(data => {
        if (data.success) {
          setUser(data.user);
          setIsAuthenticated(false);
        }
      })
    }
  
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
      )
    }
  
    const authenticatedUser = () => {
      setIsAuthenticated(isAuthenticated);
      return (
        <>
          <button type="button"
            className="logIn_logOut"
            onClick={onClickLogoutHandler}>
            Logout
        </button>
  
          <a href="/profile">
            <button className="signUp">Profile</button>
          </a>
        </>
      )
    }
return (
    <div className="home">
        <img src={logoN} alt="logo" class="center" />
        <div>
        {!isAuthenticated ? unauthenticatedUser() : authenticatedUser()}
        </div>
        <NavBar></NavBar>
        <main>
        <Container fluid>
            <Comments></Comments>
        </Container>
        </main>
        <div className="footer">
        <p>COVIDSHARE</p>
        </div>
    </div>
    );
};

export default Share;
