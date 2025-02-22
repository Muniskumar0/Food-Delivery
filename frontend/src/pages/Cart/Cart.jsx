import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isLoggedIn, setShowLogin }) => {
    const { cartItem, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/order');
        } else {
            setShowLogin(true); // ✅ 
        }
    };

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
                    if (cartItem[item.id] > 0) {
                        return (
                            <React.Fragment key={item.id}>
                                <div className="cart-items-title cart-items-item">
                                    <img src={`http://127.0.0.1:8000${item.image}`} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>₹ {item.price}</p>
                                    <p>{cartItem[item.id]}</p>
                                    <p>₹ {item.price * cartItem[item.id]}</p>
                                    <p className="cross" onClick={() => removeFromCart(item.id)}>X</p>
                                </div>
                                <hr />
                            </React.Fragment>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>₹ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>₹ {getTotalCartAmount() === 0 ? 0 : 20}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>₹ {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 20}</b>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <div>
                        <p>If you have a promo code, enter it here</p>
                        <div className="cart-promocode-input">
                            <input type="text" placeholder='Promo code' />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
