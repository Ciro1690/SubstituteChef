import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import testData from './RestaurantData';
import Map from './Map';

const Search = () => {

    const [restaurants, setRestaurants] = useState([]);
    const [clickedRestaurant, setClickedRestaurant] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    const getRestaurantInfo = () => {
        try {
            setRestaurants(testData);
            setIsLoaded(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                {!isLoaded ? <div>Loading...</div> : null}
                {isLoaded && restaurants.length > 0 ?
                restaurants.map(restaurant => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        clickedRestaurant={clickedRestaurant}
                        setClickedRestaurant={setClickedRestaurant}
                    />
                )) 
                : getRestaurantInfo()
                }
            </div>
            <div className="row">
                <Map 
                    clickedRestaurant={clickedRestaurant}
                />
            </div>
        </div>
    )
}

export default Search;