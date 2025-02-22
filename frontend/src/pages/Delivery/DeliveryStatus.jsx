import React, { useState, useEffect } from 'react';
import './DeliveryStatus.css';  

function DeliveryStatus() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/orders/");
        
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []); // Only run on mount (no need for 'refresh' anymore)

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <h2>Delivery Status</h2>
      </div>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
               <div className="order-details">
                <div>
                  <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
                  <p><strong>Phone:</strong> {order.phone_number}</p>
                </div>
                <div>
                  <p><strong>Address:</strong> {order.street}, {order.city}, {order.state}, {order.zip_code}, {order.country}</p>
                  <p><strong>Total:</strong> ₹ {order.total}</p>
                </div>
                
                {order.food_items && order.food_items.length > 0 && (
                  <div className="food-images">
                    <h4>Food Items:</h4>
                    {order.food_items.map((foodItem, idx) => (
                      <div key={idx} className="food-item">
                        <img src={foodItem.image_url} alt={foodItem.name} className="food-image" />
                        <p>{foodItem.name}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div>
                  <p><strong>Delivery Status:</strong> {order.status || 'Not updated'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DeliveryStatus;
