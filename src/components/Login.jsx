import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/storage";

const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const success = loginUser(username);
    if (success) {
      // Redirect to /home/{username} or /home/{userId}
      navigate(`/home/${username}`); 
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
