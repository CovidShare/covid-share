import React from "react";
import NavBar from "../components/NavBar.js";
import "../styles/HomePage.css";
import logoN from "../assets/LogoNew.png";
import TwitterContainer from "../components/TwitterContainer.js";
import CDC from "../components/CDC.js";
import { Container, Row, Col } from 'react-bootstrap';


const HomePage = (props) => {
  return (
    <div className="home">
      <img src={logoN} alt="logo" class="center" />
      <button className="logIn">Log In</button>
      <NavBar></NavBar>
        <main>
          <Container fluid>
            <Row>
              <Col>
                <CDC className="pls"></CDC>
              </Col>
              <Col sm='auto'>
                <TwitterContainer></TwitterContainer>
              </Col>
            </Row>
            
          </Container>
        </main>
        <div className="footer">
          <p>
            COVIDSHARE
          </p>
        </div>
    </div>
  );
};

export default HomePage;
