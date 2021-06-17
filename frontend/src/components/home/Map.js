import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
require('dotenv').config()

const Map = ({ companies, clickedCompany, setClickedCompany }) => {

    const location = {lat: 32.74544, lng: -117.14369}
    const mapStyles = {
        height: "70vh",
        width: "100%"
    }

    return (
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_API_KEY}>
            <GoogleMap
                mapContainerStyle = { mapStyles }
                zoom = { 12 }
                center = { location } 
            >

            {companies.map(company => (
                <Marker key={company.id}
                    position={{lat: company.lat, lng: company.lng}}
                    labelInBackground={true}
                    label={clickedCompany.id === company.id ? company.name : null}
                />
                ))
            })
            </GoogleMap >
            </LoadScript>
    )
}

export default Map;