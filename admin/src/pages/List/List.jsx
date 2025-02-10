import React, { useEffect, useState } from 'react';
import './List.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
  const url = "http://127.0.0.1:8000/food/";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        setList(response.data);
      } else {
        toast.error("No food data available");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching food list.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (id) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/food/${id}/`);
        if (response.status === 204) {
          setList(list.filter(item => item.id !== id)); // Remove the deleted item from the list
          toast.success("Food item deleted successfully!");
        } else {
          toast.error("Failed to delete the food item.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Error deleting food item.");
      }
    } else {
      console.error("ID is undefined. Cannot delete item.");
      toast.error("Invalid food item ID.");
    }
  };

  return (
    <div className="list">
      <h2>Food List</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : list.length === 0 ? (
        <div className="empty">No food items available.</div>
      ) : (
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item) => (
            <div className="list-table-format" key={item.id}>
              <img 
                src={`http://127.0.0.1:8000${item.image}`} 
                alt={item.name} 
                width={50} 
                height={50} 
                style={{ objectFit: 'cover' }}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹ {item.price}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
