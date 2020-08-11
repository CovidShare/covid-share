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

const StatesMap = (props) => {
    const { isAuthenticated, setIsAuthenticated, user, setUser } = useContext(AuthContext);
    const [update, setUpdate] = useState("");
    const [stateLocation, setStateLocation] = useState([]);

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
                axios.get("https://corona.lmao.ninja/v2/countries/USA"),
                axios.get("https://www.trackcorona.live/api/provinces"),
            ])
            .then((responseArr) => {
                setUpdate(responseArr[0].data);
                //console.log(responseArr[0].data);
                setStateLocation(responseArr[1].data.data);
                //console.log(responseArr[1].data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const date = new Date(parseInt(update.updated));
    const lastUpdated = date.toString();

    const statesLocation = stateLocation.map((data, i) => {
        return <div
            lat={data.latitude}
            lng={data.longitude}
            style={{
                color:"red",
                backgroundColor: "#FFF",
                height: "25px",
                width: "35px",
                textAlign: "center",
                borderRadius: "20%",
            }}>
                {data.location}
                <br />
                <NumberFormat value={data.confirmed} displayType={'text'} thousandSeparator={true}/>
        </div>;
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
            <h2 style={{textAlign: "center"}}>United States Covid-19 Live Statistics</h2>
            <br />
    <CardDeck>
        <Card bg="secondary" text={"white"} className="text-center" style={{margin: "10px"}}>
            <Card.Body>
                <Card.Title>United States Cases</Card.Title>
                <Card.Text>
                    <NumberFormat value={update.cases} displayType={'text'} thousandSeparator={true}/>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small>Last Updated: {lastUpdated}</small>
            </Card.Footer>
        </Card>
        <Card bg="danger" text={"white"} className="text-center" style={{margin: "10px"}}>
            <Card.Body>
                <Card.Title>United States Deaths</Card.Title>
                <Card.Text>
                    <NumberFormat value={update.deaths} displayType={'text'} thousandSeparator={true}/>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small>Last Updated: {lastUpdated}</small>
            </Card.Footer>
        </Card>
        <Card bg="success" text={"white"} className="text-center" style={{margin: "10px"}}> 
            <Card.Body>
                <Card.Title>United States Recoveries</Card.Title>
                <Card.Text>
                    <NumberFormat value={update.recovered} displayType={'text'} thousandSeparator={true}/>
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <small>Last Updated: {lastUpdated}</small>
            </Card.Footer>
        </Card>
    </CardDeck>
    <br />
    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyCJlCzPlcCW5K87KfXNdjNUpg7V3CDQVuY" }}
            defaultCenter={{
                lat: 38,
                lng: -97}}
            defaultZoom={4}>
                {statesLocation}
        </GoogleMapReact>
        </div>
        </Container>
    </div>
    <br></br>
    <div className="footer">
        <p>COVIDSHARE</p>
      </div>
        
    </div>
        
    );
};

export default StatesMap;