import React, {useContext, useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import NumberFormat from 'react-number-format';

import NavBar from "../components/NavBar.js";
import "../styles/HomePage.css";
import logoN from "../assets/LogoNew.png";
import AuthService from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col } from "react-bootstrap";

const TestingCenters = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [centers, setCenters] = useState([]);
    const [cards, setCards] = useState([]);

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

      useEffect(() => {
        axios
            .all([
                axios.get('./testinglocations.json'),
                axios.get("https://covid-19-testing.github.io/locations/florida/complete.json"),
            ])
            .then((responseArr) => {
                setCenters(responseArr[0].data);
                //console.log(responseArr[0].data)
                setCards(responseArr[1].data);

            })
            .catch(err => {
                console.log(err);
            })
    }, []);

      const centersLocation = centers.map((data, i) => {
        return <div
            lat={data.lat}
            lng={data.long}
            style={{
                color:"red",
                backgroundColor: "#000",
                height: "25px",
                width: "35px",
                textAlign: "center",
                borderRadius: "20%",
            }}>
                {data.alternate_name}
                <br />
                {/* <NumberFormat value={data.confirmed} displayType={'text'} thousandSeparator={true}/> */}
        </div>;
    });

    const centersList = cards.map(data => {
        //console.log(data.physical_address + " ");
        return(
            <CardDeck>
            <Card
                bg="info"
                text="light"
                className="text-center"
                style={{margin: "10px"}}
                border="warning"
                key={data.id}
            >
                <Card.Header as="h4">{data.name}</Card.Header>
                <Card.Body>
                    {/* <Card.Header as="h4">{data.name}</Card.Header> */}
                    <Card.Text>Description: {data.description}</Card.Text>
                    <Card.Text>City: {data.physical_address.map((sub) => 
                        sub.city
                    )}</Card.Text>
                    <Card.Text>Address: {data.physical_address.map((sub) => 
                        sub.address_1
                    )}, {data.physical_address.map((sub)=> 
                        sub.city
                    )}, {data.physical_address.map((sub)=> 
                        sub.state_province
                    )}, {data.physical_address.map((sub) =>
                        sub.postal_code
                    )}</Card.Text>
                    {/* <Card.Text>Phone Number: {data.phones.map((sub) =>
                        sub.number
                    )}</Card.Text> */}
                    
                    {/* <Card.Text>Hours: {data.regular_schedule.map((sub)=>
                        sub.opens_at
                    )} to {data.regular_schedule.map((sub)=>
                        sub.closes_at
                    )}</Card.Text> */}
                </Card.Body>
                <Card.Footer>Phone Number: {data.phones.map((sub) =>
                        sub.number
                )}</Card.Footer>
            </Card>
            </CardDeck>
        );
    });

    return (
        <div className="home">
            <img src={logoN} alt="logo" class="center" />
            <div>
                {!isAuthenticated ? unauthenticatedUser() : authenticatedUser()}
            </div>
        <NavBar></NavBar>
            <div>
            <br />
            <Container fluid>
                <h2 style={{textAlign: "center"}}>Florida Covid-19 Testing Centers</h2>
                <br></br>
                {/* {centersList} */}
                  {/* {initMap()}
                  {createMarker(request)} */}
                  <Row>
                    <Col>
                  <div style={{ height: '100vh', width: '100%' }}>
                  <GoogleMapReact
                  bootstrapURLKeys={{ key: "AIzaSyCY9hX-wQ9vfAgQXMvd45xFTC6yolmjQ2Q" }}
                  defaultCenter={{
                      lat: 26,
                      lng: -80}}
                  defaultZoom={8}>
                    {centersLocation}
                  </GoogleMapReact>
                  </div>
                  </Col>
                  <Col xs="auto">
                    {centersList}
                  </Col>
                  </Row>
            </Container>
            </div>
    <br></br>
    <div className="footer">
        <p>COVIDSHARE</p>
      </div>
    </div>
    );
};

export default TestingCenters;
