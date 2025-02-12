import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = () => {
    const { food_list = [] } = useContext(StoreContext);

    const [activeCategory, setActiveCategory] = useState('All Category');

    useEffect(() => {
        console.log("Updated food_list in context:", food_list);
    }, [food_list]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const filteredFoodItems = food_list.filter((item) => {
        return activeCategory === 'All Category' || item.category === activeCategory;
    });

    return (
        <>
            <div className="menu-category">
                <p className={`category-item All ${activeCategory === 'All Category' ? 'active' : ''}`} onClick={() => handleCategoryClick('All Category')}>
                    All Category</p>
                <p className={`category-item ${activeCategory === 'Pure Veg' ? 'active' : ''}`} onClick={() => handleCategoryClick('Pure Veg')}>
                    Pure Veg</p>
                <p className={`category-item ${activeCategory === 'Non Veg' ? 'active' : ''}`} onClick={() => handleCategoryClick('Non Veg')}>
                    Non Veg</p>
                <p className={`category-item ${activeCategory === 'Fast Food' ? 'active' : ''}`} onClick={() => handleCategoryClick('Fast Food')}>
                    Fast Food</p>
                <p className={`category-item ${activeCategory === 'Sweets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Sweets')}>
                    Sweets</p>
                <p className={`category-item ${activeCategory === 'Cake' ? 'active' : ''}`} onClick={() => handleCategoryClick('Cake')}>
                    Cake</p>
            </div>

            <div className="food-display" id="food-display">
                <h2>Top dishes near you</h2>
                <div className="food-display-list">
                    {filteredFoodItems.length > 0 ? (
                        filteredFoodItems.map((item, index) => (
                            <FoodItem
                                key={index}
                                id={item.id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={`http://127.0.0.1:8000${item.image}`}
                            />
                        ))
                    ) : (
                        <p>No food items available for this category.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default FoodDisplay;
