import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';

const Cart = () => {
    const { cartItem, food_list, removeFromCart } = useContext(StoreContext);

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <><div>
                                <div key={item._id} className="cart-items-title cart-items-item">
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>{item.price}</p>
                                    <p>{cartItem[item._id]}</p>
                                    <p>{item.price * cartItem[item._id]}</p>
                                    <p className="cross" onClick={() => removeFromCart(item._id)}>X</p>
                                </div>
                            </div><hr /></>
                        )
                    }
                    return null;
                })}

            </div>
        </div>
    );
};

export default Cart;
