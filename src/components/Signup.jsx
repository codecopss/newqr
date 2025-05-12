import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../utils/storage";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [details, setDetails] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    signupUser(username, details);
    navigate("/login");
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
      <textarea
        placeholder="Enter your emergency details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
