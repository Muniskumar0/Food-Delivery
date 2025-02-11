import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = ({ category }) => {
    const { food_list = [] } = useContext(StoreContext);

    useEffect(() => {
        console.log("Updated food_list in context:", food_list);
    }, [food_list]);

    return (
        <div className="food-display" id="food-display">
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.length > 0 ? (
                    food_list.map((item, index) => (
                        (category === "All" || category === item.category) && (
                            <FoodItem
                                key={index}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={`http://127.0.0.1:8000${item.image}`} // Ensure correct image URL
                            />
                        )
                    ))
                ) : (
                    <p>Loading food items...</p>
                )}
            </div>
        </div>
    );
};

export default FoodDisplay;
