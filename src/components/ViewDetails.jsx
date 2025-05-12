import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUser, getUserData, updateUserData } from "../utils/storage";

const ViewDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  // Log to check if the userId param is being passed correctly
  console.log("Viewing details for userId:", userId);

  // Get user data from storage
  const userData = getUserData(userId);
  console.log("User data fetched for", userId, ":", userData); // Log user data

  const isEditable = currentUser === userId;

  const [formData, setFormData] = useState(() => {
    const initialData = userData || {}; // No need to parse, userData is already an object
    console.log("Initial form data:", initialData); // Log initial form data
    return {
      name: initialData.name || "",
      contact: initialData.contact || "",
      bloodType: initialData.bloodType || "",
      allergies: initialData.allergies || "",
      medicalConditions: initialData.medicalConditions || ""
    };
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserData(userId, JSON.stringify(formData));
    alert("Details updated successfully!");
  };

  return (
    <div className="container">
      <h2>User Details</h2>

      {userData ? (
        <form onSubmit={handleUpdate} className="qr-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Blood Type:</label>
            <input
              type="text"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Allergies:</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>
          <div className="form-group">
            <label>Medical Conditions:</label>
            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              disabled={!isEditable}
            ></textarea>
          </div>

          {/* {isEditable && (
            <button type="submit" className="btn-submit">
              Update Details
            </button>
          )} */}
        </form>
      ) : (
        <p>User not found</p>
      )}

      <button onClick={() => navigate("/")} className="btn-submit" style={{ marginTop: "10px" }}>
        Back to Home
      </button>
    </div>
  );
};

export default ViewDetails;
