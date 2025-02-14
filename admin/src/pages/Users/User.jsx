import React, { useEffect, useState } from 'react';
import './User.css';  // Add a custom CSS file for styling (optional)

function UserList() {
  const [users, setUsers] = useState([]);  // State to hold the fetched users
  const [loading, setLoading] = useState(true);  // State for loading state
  const [error, setError] = useState(null);  // State for error handling

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/users/");
        
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);  // Store the fetched users in state
        setLoading(false);  // Stop loading
      } catch (error) {
        setError(error.message);  // Handle errors
        setLoading(false);  // Stop loading
      }
    };

    fetchUsers();
  }, []);  // The empty array ensures this runs once when the component mounts

  // Loading state
  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="user-list-container">
      <div className="title">
      <h2>User List</h2>
      </div>
      
      {users.length === 0 ? (
        <p>No users available.</p>
      ) : (
        <div className="user-list">
          {users.map((user, index) => (
            <div key={index} className="user-item">
              <h3>User #{user.id}</h3>
              <div className="user-details">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Password:</strong> {user.password}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserList;
