import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, getUserData, updateUserData } from "../utils/storage";

const EditProfile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  // Redirect to login if no user found
  useEffect(() => {
    if (!user) {
      alert("Please log in to edit your profile.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch existing data if user exists
  const initialData = getUserData(user) || {
    name: "",
    contact: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("No user found. Please log in.");
      return;
    }

    setLoading(true);

    try {
      await updateUserData(user, formData);
      alert("Details updated successfully!");
      navigate("/home/" + user); // Redirect to user home
    } catch (error) {
      alert("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
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

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
