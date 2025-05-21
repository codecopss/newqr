import React, { useState, useEffect, useRef } from "react";
import QRCode from "qrcode.react";
import { jsPDF } from "jspdf"; // Import jsPDF
import { getUserData, logoutUser, updateUserData } from "../utils/storage";
import { Link, useNavigate, useParams } from "react-router-dom";

const Home = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    bloodType: "",
    allergies: "",
    medicalConditions: "",
    image: "",
    medicalPdf: "",
  });

  // Ref to QR code component for PDF export
  const qrRef = useRef(null);

  useEffect(() => {
    if (!userId) {
      alert("Access denied. Please log in.");
      navigate("/login");
      return;
    }

    const savedData = getUserData(userId);
    if (!savedData) {
      alert("User data not found. Please log in.");
      navigate("/login");
      return;
    }
    setFormData(savedData);
  }, [userId, navigate]);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (field) => {
    setFormData((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      updateUserData(userId, formData);
      alert("Form data updated successfully!");
    }
  };

  // New: Download QR as PDF handler
  const downloadQRasPDF = () => {
    if (!qrRef.current) {
      alert("Please generate the QR code first.");
      return;
    }

    // Get canvas element inside qrRef div
    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) {
      alert("QR code canvas not found.");
      return;
    }

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    // Calculate center positions for the image on PDF
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = 256; // fixed width for QR
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    const x = (pdfWidth - imgWidth) / 2;
    const y = (pdfHeight - imgHeight) / 2;
    
    // Draw QR code
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);

    // Draw text below QR code
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(14);

    const text = "Scan in medical emergency";
    let textWidth = pdf.getTextWidth(text);

    // Scale font size down if text wider than QR width
    if (textWidth > imgWidth) {
      const scale = imgWidth / textWidth;
      pdf.setFontSize(14 * scale);
      textWidth = pdf.getTextWidth(text);
    }

    const textX = x + (imgWidth - textWidth) / 2;
    const textY = y + imgHeight + 25;
    pdf.text(text, textX, textY);
    pdf.save("emergency-qr-code.pdf");
  };

  return (
    <div className="container">
      <h2>Home</h2>

      {userId ? (
        <>
          <h3>Welcome, {userId}</h3>

          {formData ? (
            <div className="user-details">
              <h4>Your Details:</h4>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Emergency Contact:</strong> {formData.contact}</p>
              <p><strong>Blood Type:</strong> {formData.bloodType}</p>
              <p><strong>Allergies:</strong> {formData.allergies}</p>
              <p><strong>Medical Conditions:</strong> {formData.medicalConditions}</p>

              {formData.image && (
                <div>
                  <strong>Uploaded Image:</strong><br />
                  <img src={formData.image} alt="Uploaded" width="200" />
                  <br />
                  <button onClick={() => handleDelete("image")}>Delete Image</button>
                </div>
              )}

              {formData.medicalPdf && (
                <div style={{ marginTop: "10px" }}>
                  <strong>Medical History PDF:</strong><br />
                  <a
                    href={formData.medicalPdf}
                    download="medical-history.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                  <br />
                  <button onClick={() => handleDelete("medicalPdf")}>Delete PDF</button>
                </div>
              )}
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

            <div className="form-group">
              <label>Upload Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group">
              <label>Upload Medical PDF:</label>
              <input
                type="file"
                name="medicalPdf"
                accept="application/pdf"
                onChange={handleFileChange}
              />
            </div>

            <button type="submit" className="btn-submit">
              Submit
            </button>
          </form>

          <button onClick={handleGenerateQR} style={{ marginTop: "10px" }}>
            Generate QR
          </button>

          {/* Wrap QR code in a div with ref */}
          <div ref={qrRef} style={{ marginTop: "15px" }}>
            {qrData && (
              <QRCode
                value={window.location.origin + qrData}
                size={256} // increased size here
                includeMargin={true}
              />
            )}
          </div>

          {/* Download PDF button */}
          {qrData && (
            <button onClick={downloadQRasPDF} style={{ marginTop: "10px" }}>
              Download QR as PDF
            </button>
          )}

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
