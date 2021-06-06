import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
require('dotenv').config()

const Map = ({clickedRestaurant}) => {
    const location = {lat: clickedRestaurant.latitude, lng: clickedRestaurant.longitude}
    const mapStyles = {
        height: "70vh",
        width: "100%"
    }

    return (
        Object.keys(clickedRestaurant).length !== 0  ?
            <LoadScript
                googleMapsApiKey= {process.env.REACT_APP_API_KEY}>
            <GoogleMap
                mapContainerStyle = { mapStyles }
                zoom = { 13 }
                center = { location } 
            >
            {
                <Marker 
                    key={clickedRestaurant.name} 
                    position={location} />
            })
            </GoogleMap >
            </LoadScript>
            :
            <div className="mobile-empty">Click a restaurant card to load the map</div>
    )
}

export default Map;