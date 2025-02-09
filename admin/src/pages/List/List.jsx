import React, { useEffect, useState } from 'react';
import './List.css'; // Ensure the professional CSS is applied
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
  const url = "http://localhost:5000/data";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
  }, []);

  const fetchList = async () => {
    try {
      const response = await axios.get(url);
      if (response.data) {
        setList(response.data); // Assuming response.data contains the list of food items
      } else {
        toast.error("No food data available");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("Error fetching food list.");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${url}/${id}`);
      setList(list.filter(item => item.id !== id)); // Remove the deleted item from the list
      toast.success("Food item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Error deleting food item.");
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
              <img src={item.image} alt={item.name} />
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
