import React, { useEffect, useState } from 'react';
import './Order.css';

function Orders() {
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
  }, []); 

  const updateDeliveryStatus = async (orderId, status) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/orders/${orderId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: status }),
      });

      if (!response.ok) {
        console.log(response);
        
        throw new Error('Failed to update status');
      }

      const updatedOrder = await response.json();

      setOrders((prevOrders) => 
        prevOrders.map((order) => 
          order.id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (error) {
      setError(error.message);
    }
  };

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
              <h3>Order : {order.id}</h3>
              <div className="order-details">
                <div>
                  <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Phone:</strong> {order.phone_number}</p>
                </div>
                <div>
                  <p><strong>Address:</strong> {order.street}, {order.city}, {order.state}, {order.zip_code}, {order.country}</p>
                  <p><strong>Total:</strong> ₹ {order.total}</p>
                </div>

                {/* Loop over the food items and display their images */}
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
                  <select
                    onChange={(e) => updateDeliveryStatus(order.id, e.target.value)}
                    value={order.status || ''}
                  >
                    <option value="">Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
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
