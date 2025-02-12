import React, { useEffect, useState } from 'react';
import './Order.css';

function Orders() {
  const [orders, setOrders] = useState([]); // State to hold the fetched orders
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/orders/");
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data); // Store fetched data in state
        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message); // Handle errors
        setLoading(false); // Stop loading
      }
    };

    fetchOrders();
  }, []); // Empty dependency array means this will run once after the first render

  // Render loading, error, or the list of orders
  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Order List</h2>
      </div>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <h3>Order #{order.id}</h3>
              <div className="order-details">
                <div>
                  <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Phone:</strong> {order.phone_number}</p>
                </div>
                <div>
                  <p><strong>Address:</strong> {order.street}, {order.city}, {order.state}, {order.zip_code}, {order.country}</p>
                  <p><strong>Total:</strong> ₹ {order.total_amount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
