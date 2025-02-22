import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.css';

const FoodDisplay = () => {
    const { food_list = [] } = useContext(StoreContext);

    const [activeCategory, setActiveCategory] = useState('All Category');
    const [randomFoodItems, setRandomFoodItems] = useState([]);

    useEffect(() => {
        console.log("Updated food_list in context:", food_list);

        const shuffleArray = (array) => {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        };

        const getRandomFoodItems = () => {
            const shuffledList = shuffleArray(food_list);
            const randomCount = 100;
            setRandomFoodItems(shuffledList.slice(0, randomCount));
        };

        getRandomFoodItems();

    }, [food_list]);

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const filteredFoodItems = randomFoodItems.filter((item) => {
        return activeCategory === 'All Category' || item.category === activeCategory;
    });

    return (
        <>
            <div className="menu-category">
                <p className={`category-item All ${activeCategory === 'All Category' ? 'active' : ''}`} onClick={() => handleCategoryClick('All Category')}>
                    All Category
                </p>
                <p className={`category-item ${activeCategory === 'Pure Veg' ? 'active' : ''}`} onClick={() => handleCategoryClick('Pure Veg')}>
                    Pure Veg
                </p>
                <p className={`category-item ${activeCategory === 'Non Veg' ? 'active' : ''}`} onClick={() => handleCategoryClick('Non Veg')}>
                    Non Veg
                </p>
                <p className={`category-item ${activeCategory === 'Fast Food' ? 'active' : ''}`} onClick={() => handleCategoryClick('Fast Food')}>
                    Fast Food
                </p>
                <p className={`category-item ${activeCategory === 'Sweets' ? 'active' : ''}`} onClick={() => handleCategoryClick('Sweets')}>
                    Sweets
                </p>
                <p className={`category-item ${activeCategory === 'Cake' ? 'active' : ''}`} onClick={() => handleCategoryClick('Cake')}>
                    Cake
                </p>
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
