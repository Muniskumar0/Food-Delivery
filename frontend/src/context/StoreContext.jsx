import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [food_list, setFoodList] = useState([]);
    const urls = "http://127.0.0.1:8000/food/";

    const addToCart = (itemId) => {
        const itemKey = String(itemId); // Convert to string for consistency
        setCartItem((prev) => ({
            ...prev,
            [itemKey]: (prev[itemKey] || 0) + 1
        }));

        console.log("Cart Updated:", cartItem);
    };

    const removeFromCart = (itemId) => {
        const itemKey = String(itemId);
        setCartItem((prev) => {
            const updatedCart = { ...prev };
            if (updatedCart[itemKey] > 1) {
                updatedCart[itemKey] -= 1;
            } else {
                delete updatedCart[itemKey];
            }
            return updatedCart;
        });

        console.log("Cart Updated:", cartItem);
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const key in cartItem) {
            if (cartItem[key] > 0) {
                let keyInfo = food_list.find((product) => String(product.id) === key); // Ensure ID match
                if (keyInfo) {
                    total += keyInfo.price * cartItem[key];
                }
            }
        }
        return total;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(urls);
            console.log("API Response:", response.data);
            setFoodList(response.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    useEffect(() => {
        fetchFoodList();
    }, []);


    

    return (
        <StoreContext.Provider value={{ food_list, cartItem, addToCart, removeFromCart, getTotalCartAmount }}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;



   