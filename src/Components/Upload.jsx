import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState("checking");

  const BACKEND_URL = "http://localhost:5001";

  useEffect(() => {
    // Test backend connection on component mount
    axios.get(`${BACKEND_URL}/test`)
      .then(() => {
        setBackendStatus("connected");
        console.log("Backend is reachable");
      })
      .catch((err) => {
        setBackendStatus("disconnected");
        console.error("Backend connection failed:", err);
      });
  }, []);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!image) {
      alert("Please select an image first!");
      return;
    }

    if (backendStatus === "disconnected") {
      alert("Backend server is not reachable. Please make sure it's running on port 5000.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    setLoading(true);
    setError(null);

    try {
      console.log("Sending request to:", `${BACKEND_URL}/upload`);
      const response = await axios.post(
        `${BACKEND_URL}/upload`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
          timeout: 30000 // 30 second timeout
        }
      );
      setResult(response.data);
      console.log("Upload successful:", response.data);
    } catch (error) {
      console.error("Error uploading image:", error);
      const errorMsg = error.response?.data?.error || error.message || "Failed to upload image. Please try again.";
      setError(errorMsg);
      alert("Error: " + errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page">
        <h3 className="text-xl font-bold mb-2">Upload Image</h3>
        
        {backendStatus === "disconnected" && (
          <div style={{ color: 'red', marginBottom: '10px', padding: '10px', background: '#fee' }}>
            ⚠️ Backend server is not reachable. Make sure it's running on port 5000.
          </div>
        )}
        
        {backendStatus === "connected" && (
          <div style={{ color: 'green', marginBottom: '10px' }}>
            ✓ Backend connected
          </div>
        )}
        
        <input 
          type="file" 
          accept="image/*"
          onChange={handleFileChange} 
          className="file" 
        />
        <button onClick={handleUpload} disabled={loading || backendStatus === "disconnected"}>
          {loading ? "Processing..." : "Upload & Detect"}
        </button>

        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}

        {result && result.image && (
          <div className="flexY flexX">
            <img
              src={`data:image/png;base64,${result.image}`}
              alt="Detection Result"
              className="imag"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
