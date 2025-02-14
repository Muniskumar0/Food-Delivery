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

const handleInputChange = (e) => {
const { name, value } = e.target;
setOrders((prevOrders) => ({ ...prevOrders, [name]: value }));
};

const orderList = (e) => {
e.preventDefault();

// Make sure all required fields are filled out
const requiredFields = ['first_name', 'email', 'street', 'city', 'state', 'zip_code', 'country', 'phone_number'];
for (let field of requiredFields) {
if (!orders[field]) {
alert(`Please fill out the ${field} field.`);
return;
}
}

const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2); // Calculate the total with delivery fee

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
})
.catch((error) => {
console.error("Error:", error);
alert("There was an error placing the order. Please try again.");
});

return updatedOrders; // Return the updated orders state
});
};

const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 2); // Calculate the total dynamically

return (
<form className="place-order" onSubmit={orderList}>
<div className="place-order-left">
<p className="title">Delivery Information</p>
<div className="multi-fields">
<input
type="text"
name="first_name"
placeholder="First name"
required
value={orders.first_name}
onChange={handleInputChange}
/>
<input
type="text"
name="last_name"
placeholder="Last name"
required
value={orders.last_name}
onChange={handleInputChange}
/>
</div>
<input
type="email"
name="email"
placeholder="Email address"
required
value={orders.email}
onChange={handleInputChange}
/>
<input
type="text"
name="street"
placeholder="Street"
required
value={orders.street}
onChange={handleInputChange}
/>
<div className="multi-fields">
<input
type="text"
name="city"
placeholder="City"
required
value={orders.city}
onChange={handleInputChange}
/>
<input
type="text"
name="state"
placeholder="State"
required
value={orders.state}
onChange={handleInputChange}
/>
</div>
<div className="multi-fields">
<input
type="text"
name="zip_code"
placeholder="Zip code"
required
value={orders.zip_code}
onChange={handleInputChange}
/>
<input
type="text"
name="country"
placeholder="Country"
required
value={orders.country}
onChange={handleInputChange}
/>
</div>
<input
type="text"
name="phone_number"
placeholder="Phone number"
required
value={orders.phone_number}
onChange={handleInputChange}
/>
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
<b>₹ {totalAmount}</b> {/* Dynamically calculated total */}
</div>
<button type="submit">PROCEED TO PAYMENT</button>
</div>
</div>
</form>
);
};

export default PlaceOrder;