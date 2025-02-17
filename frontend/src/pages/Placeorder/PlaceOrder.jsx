import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const [orders, setOrders] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    phone_number: "",
    total: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrders((prevOrders) => ({ ...prevOrders, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    const requiredFields = ['first_name', 'email', 'street', 'city', 'state', 'zip_code', 'country', 'phone_number'];
    requiredFields.forEach((field) => {
      if (!orders[field]) {
        newErrors[field] = `${field.replace('_', ' ')} is required`;
      }
    });

    // Email format validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (orders.email && !emailRegex.test(orders.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number format validation (example: only numbers and a specific length)
    const phoneRegex = /^[0-9]{10}$/;
    if (orders.phone_number && !phoneRegex.test(orders.phone_number)) {
      newErrors.phone_number = 'Phone number must be 10 digits';
    }

    return newErrors;
  };

  const orderList = (e) => {
    e.preventDefault(); // Prevent page refresh

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Calculate total amount with delivery fee
    const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);

    setOrders((prevOrders) => {
      const updatedOrders = {
        ...prevOrders,
        total: totalAmount,
      };

      const orderPayload = {
        ...updatedOrders,
        total_amount: totalAmount,
      };

      fetch("http://127.0.0.1:8000/orders/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(JSON.stringify(err));
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Order Response:", data);
          alert("Order successfully placed!");
          // Store the login state in localStorage if successful (optional)
          localStorage.setItem("isLoggedIn", "true");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("There was an error placing the order. Please try again.");
        });

      return updatedOrders; // Return the updated orders state
    });
  };


  const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2);

  return (
    <form className="place-order" onSubmit={orderList}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={orders.first_name}
            onChange={handleInputChange}
          />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={orders.last_name}
            required
            onChange={handleInputChange}
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={orders.email}
          onChange={handleInputChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="text"
          name="street"
          placeholder="Street"
          value={orders.street}
          onChange={handleInputChange}
        />
        {errors.street && <span className="error">{errors.street}</span>}
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={orders.city}
            onChange={handleInputChange}
          />
          {errors.city && <span className="error">{errors.city}</span>}
          <input
            type="text"
            name="state"
            placeholder="State"
            value={orders.state}
            onChange={handleInputChange}
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div className="multi-fields">
          <input
            type="text"
            name="zip_code"
            placeholder="Zip code"
            value={orders.zip_code}
            onChange={handleInputChange}
          />
          {errors.zip_code && <span className="error">{errors.zip_code}</span>}
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={orders.country}
            onChange={handleInputChange}
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <input
          type="text"
          name="phone_number"
          placeholder="Phone number"
          value={orders.phone_number}
          onChange={handleInputChange}
        />
        {errors.phone_number && <span className="error">{errors.phone_number}</span>}
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹ {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹ {getTotalCartAmount() === 0 ? 0 : 2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹ {totalAmount}</b>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
