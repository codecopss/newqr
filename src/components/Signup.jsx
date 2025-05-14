import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser, getUserData } from "../utils/storage";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    const existingUser = getUserData(username);

    if (existingUser) {
      alert("Username already exists. Please choose a different username.");
    } else {
      signupUser(username, details);
      alert("Signup successful! Please log in.");
      navigate("/login");
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      {/* Uncomment and modify if additional details are required */}
      {/* <textarea
        placeholder="Enter your emergency details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      /> */}
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
