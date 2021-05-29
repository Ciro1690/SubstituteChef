import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import testData from './RestaurantData';

const Search = () => {

    const [restaurants, setRestaurants] = useState([]);
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
        <>
            {!isLoaded ? <div>Loading...</div> : null}
            {isLoaded && restaurants.length > 0 ?
            restaurants.map(restaurant => (
                <RestaurantCard
                    key={restaurant.id}
                    restaurant={restaurant}
                />
            )) 
            : getRestaurantInfo()
            }
        </>
    )
}

export default Search;