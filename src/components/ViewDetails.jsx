import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCurrentUser, getUserData } from "../utils/storage";

const ViewDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const userData = getUserData(userId);

  const isEditable = currentUser === userId;

  return (
    <div className="container">
      <h2>User Details</h2>

      {userData ? (
        <div className="user-details">
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Emergency Contact:</strong> {userData.contact}</p>
          <p><strong>Blood Type:</strong> {userData.bloodType}</p>
          <p><strong>Allergies:</strong> {userData.allergies}</p>
          <h3>Medical History</h3>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word", fontSize: "1rem", lineHeight: "1.5", fontFamily: "inherit" }}>
            {userData.medicalConditions}
          </pre>

          {userData.image && (
            <div style={{ marginTop: "10px" }}>
              <strong>Uploaded Image:</strong><br />
              <img src={userData.image} alt="Uploaded" width="200" />
            </div>
          )}

          {userData.medicalPdf && (
            <div style={{ marginTop: "10px" }}>
              <strong>Medical History PDF:</strong><br />
              <a href={userData.medicalPdf} download="medical-history.pdf" target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </div>
          )}
        </div>
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
