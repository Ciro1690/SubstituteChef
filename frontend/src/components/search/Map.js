import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
require('dotenv').config()

const Map = ({companies}) => {

    const [coordinates, setCoordinates] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        async function loadCoordinates() {
            let coordsArr = [];
            for (let company of companies) {
                const location = company.address
                await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params:{
                        address: location,
                        key: process.env.REACT_APP_API_KEY
                    }
                })
                    .then(function(response){
                        let location = response.data.results[0].geometry.location
                        let coordinates = [company.id.toString(), {lat: location.lat, lng: location.lng}]
                        coordsArr.push(coordinates)      
                    })
                    .catch(function(error) {
                        console.log(error)
                    }) 
            }
            setCoordinates(coordsArr);
            setIsLoaded(true)
        }
        loadCoordinates();
    }, [companies]);

    const location = {lat: 32.74544, lng: -117.14369}
    const mapStyles = {
        height: "70vh",
        width: "100%"
    }

    return (
        isLoaded  ?
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_API_KEY}>
            <GoogleMap
                mapContainerStyle = { mapStyles }
                zoom = { 13 }
                center = { location } 
            >
            {coordinates.map(coord => (
                <Marker key={coord[0]}
                    label={coord[0]} 
                    position={coord[1]}
                    labelInBackground={true}
                />
                ))
            })
            </GoogleMap >
            </LoadScript>
            :
            <p>Loading...</p>
    )
}

export default Map;