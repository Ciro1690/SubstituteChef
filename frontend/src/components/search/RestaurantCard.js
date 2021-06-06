import React from 'react';
import '../../styles/RestaurantCard.css';

const RestaurantCard = ({restaurant, setClickedRestaurant, clickedRestaurant}) => {

    const {name, url, address, city, state, postal_code, latitude, longitude} = restaurant;
    const directions = `https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${latitude},${longitude}`;

    function mapRestaurant() {
        setClickedRestaurant(restaurant);
    }

    return (
        <div className="restaurant-card">
            <div className={clickedRestaurant.name === name ? "selected-card" : "inner-card"}>
                <h1>{name}</h1>
                <h3>{address}, {city} {state}, {postal_code}</h3>
                <a href={url} target="blank">{url}</a><br></br>
                <a href={directions} rel="noreferrer" target="_blank" className="btn btn-dark btn-sm">Directions</a>
                <button className="btn btn-dark btn-sm" onClick={mapRestaurant}>See on Map</button>
            </div>
        </div> 
    )
}

export default RestaurantCard;