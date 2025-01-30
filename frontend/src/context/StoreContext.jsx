import { createContext, useState } from "react";
import { food_list } from "../assets/frontend_assets/assets";
export const StoreContext = createContext(null);


const StoreContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});

    const addToCart = (itemId) => {
        if (!cartItem[itemId]) {
            setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    }


    const getTotalCartAmount = () => {
        let total = 0;
        for (const key in cartItem) {
            if (cartItem[key] > 0) {

                let keyInfo = food_list.find((product) => product._id === key)
                total += keyInfo.price * cartItem[key];
            }

        }
        return total;

    }



        const contextValue = {
            food_list,
            cartItem,
            setCartItem,
            addToCart,
            removeFromCart,
            getTotalCartAmount


        }
        return (
            <StoreContext.Provider value={contextValue}>
                {props.children}
            </StoreContext.Provider>
        )
    }
    export default StoreContextProvider