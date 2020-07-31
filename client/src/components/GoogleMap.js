import React, {useEffect, useState} from "react";
import Card from 'react-bootstrap/Card';
import CardDeck from "react-bootstrap/CardDeck";
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import NumberFormat from 'react-number-format';

const GoogleMap = (props) => {
    const [update, setUpdate] = useState("");
    const [results, setResults] = useState([]);

    useEffect(() => {

        axios
            .all([
                axios.get("https://corona.lmao.ninja/v2/all"),
                axios.get("https://corona.lmao.ninja/v2/countries?sort=country"),
            ])
            .then((responseArr) => {
                setUpdate(responseArr[0].data);
                setResults(responseArr[1].data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const date = new Date(parseInt(update.updated));
    const lastUpdated = date.toString();

    const countriesLocation = results.map((data, i) => {
        return <div
            lat={data.countryInfo.lat}
            lng={data.countryInfo.long}
            style={{
                color:"red",
                backgroundColor: "#FFF",
                height: "25px",
                width: "35px",
                textAlign: "center",
                borderRadius: "20%",
            }}>
                <img height="10px" src={data.countryInfo.flag}/>
                <br />
                <NumberFormat value={data.cases} displayType={'text'} thousandSeparator={true}/>
        </div>;
    });

    return (
        <div>
            <br />
            <h2 style={{textAlign: "center"}}>Covid-19 Live Statistics</h2>
            <br />
    <CardDeck>
        <Card bg="secondary" text={"white"} className="text-center" style={{margin: "10px"}}>
            <Card.Body>
                <Card.Title>Global Cases</Card.Title>
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
                <Card.Title>Global Deaths</Card.Title>
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
                <Card.Title>Global Recoveries</Card.Title>
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
            bootstrapURLKeys={{ key: "AIzaSyDt3hVkd0WJIwHOQwq5KffunRA67AsmbT4" }}
            defaultCenter={{
                lat: 38,
                lng: -97}}
            defaultZoom={4}>
                {countriesLocation}
        </GoogleMapReact>
        </div>
    </div>
    );
};

export default GoogleMap;