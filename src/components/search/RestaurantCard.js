import React from 'react';
import '../../styles/RestaurantCard.css';

const RestaurantCard = ({restaurant}) => {

    const {name, url, address, city, state, postal_code, latitude, longitude} = restaurant;

    return (
        <div className="restaurant-card">
            <h1>{name}</h1>
            <h3>{address}, {city} {state}, {postal_code}</h3>
            <a href={url} target="blank">{url}</a>
        </div> 
    )
}

export default RestaurantCard;