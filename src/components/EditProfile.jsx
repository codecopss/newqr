import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserData, updateUserData } from "../utils/storage";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Fetch existing data without JSON parsing again
  const initialData = getUserData(user) || {
    name: "",
    contact: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!user) {
      alert("No user found. Please log in.");
      return;
    }

    updateUserData(user, formData);
    alert("Details updated successfully!");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Edit Profile</h2>

      <form onSubmit={handleUpdate} className="qr-form">
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
          <label>Contact:</label>
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

        <button type="submit" className="btn-submit">Update</button>
      </form>
    </div>
  );
};

export default EditProfile;
