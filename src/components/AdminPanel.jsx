import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch all user data stored in localStorage
    const allUsers = Object.keys(localStorage)
      .filter(key => key.startsWith("formData_"))
      .map(key => key.replace("formData_", ""));
    
    setUsers(allUsers); // Set users list
  }, []); // Only run this once on mount

  const handleDeleteUser = (userId) => {
    // Delete the user's data from localStorage
    localStorage.removeItem(`formData_${userId}`);

    // Re-fetch and update the users list after deletion
    const updatedUsers = Object.keys(localStorage)
      .filter(key => key.startsWith("formData_"))
      .map(key => key.replace("formData_", ""));
    
    setUsers(updatedUsers); // Update state with the new list
    alert(`User ${userId} deleted.`);
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>
      <h3>Users List</h3>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="2">No users found</td></tr>
          ) : (
            users.map((userId) => (
              <tr key={userId}>
                <td>{userId}</td>
                <td>
                  <Link to={`/view/${userId}`}>View</Link>
                  <button onClick={() => handleDeleteUser(userId)} style={{ marginLeft: "10px", color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
