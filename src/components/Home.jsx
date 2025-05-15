import React, { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { getUserData, logoutUser, updateUserData } from "../utils/storage";
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { userId } = useParams(); // Extract userId from URL
  const navigate = useNavigate();
  const [qrData, setQrData] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
  });

  // Fetch user data when component mounts or when userId changes
  useEffect(() => {
    if (userId) {
      const savedData = getUserData(userId);
      console.log("Loaded data for user:", savedData);
      if (savedData) {
        setFormData(savedData);
      }
    }
  }, [userId]);

  const handleGenerateQR = () => {
    if (userId) {
      setQrData(`/view/${userId}`);
    } else {
      alert("Please log in to generate QR");
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      updateUserData(userId, formData);
      alert("Form data updated successfully!");
    }
  };

  const userData = getUserData(userId);

  return (
    <div className="container">
      <h2>Home</h2>

      {userId ? (
        <>
          <h3>Welcome, {userId}</h3>

          {userData ? (
            <div className="user-details">
              <h4>Your Details:</h4>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Emergency Contact:</strong> {userData.contact}</p>
              <p><strong>Blood Type:</strong> {userData.bloodType}</p>
              <p><strong>Allergies:</strong> {userData.allergies}</p>
              <p><strong>Medical Conditions:</strong> {userData.medicalConditions}</p>
            </div>
          ) : (
            <p>No data found. Please fill in the form below.</p>
          )}

          <form onSubmit={handleSubmit} className="qr-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Emergency Contact:</label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
            </div>
            <div className="form-group">
              <label>Blood Type:</label>
              <input
                type="text"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                placeholder="Enter blood type"
              />
            </div>
            <div className="form-group">
              <label>Allergies:</label>
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Enter allergies"
              />
            </div>
            <div className="form-group">
              <label>Medical Conditions:</label>
              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                placeholder="Enter medical conditions"
              ></textarea>
            </div>

            <button type="submit" className="btn-submit">Submit</button>
          </form>

          <button onClick={handleGenerateQR}>Generate QR</button>
          {qrData && <QRCode value={window.location.origin + qrData} />}

          <br />
          <Link to="/edit">Edit Details</Link>
          <br />
          <button onClick={handleLogout} style={{ marginTop: "10px" }}>
            Logout
          </button>
        </>
      ) : (
        <p>Please log in to see your details and generate a QR code.</p>
      )}
    </div>
  );
};

export default Home;
