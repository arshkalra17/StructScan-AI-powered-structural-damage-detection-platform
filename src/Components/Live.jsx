import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const LiveCamera = () => {
  const webcamRef = useRef(null);
  const [detecting, setDetecting] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const BACKEND_URL = "http://localhost:5001";

  const captureFrame = async () => {
    if (isProcessing) return; // Skip if still processing previous frame
    
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      console.log("No image captured");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Convert base64 to blob
      const base64Response = await fetch(imageSrc);
      const blob = await base64Response.blob();
      
      // Create FormData
      const formData = new FormData();
      formData.append("file", blob, "webcam.png");

      // Send to backend
      const response = await axios.post(
        `${BACKEND_URL}/upload`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data"
          },
          timeout: 10000 // 10 second timeout
        }
      );

      if (response.data && response.data.image) {
        setProcessedImage(`data:image/png;base64,${response.data.image}`);
      }
    } catch (err) {
      console.error("Error processing frame:", err);
      setError("Failed to process frame");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    let interval;
    if (detecting) {
      interval = setInterval(captureFrame, 3000); // Process every 3 seconds
    } else {
      clearInterval(interval);
      setProcessedImage(null);
    }
    return () => clearInterval(interval);
  }, [detecting]);

  return (
    <div className="page" id="demo">
      <h3 className="text-3xl font-semibold text-white mb-6">
        Real-Time Damage Detection
      </h3>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div>
          <p style={{ color: 'white', marginBottom: '10px' }}>Live Camera</p>
          <Webcam ref={webcamRef} screenshotFormat="image/png" className="web" />
        </div>
        
        {processedImage && (
          <div>
            <p style={{ color: 'white', marginBottom: '10px' }}>Detection Result</p>
            <img 
              src={processedImage} 
              alt="Processed" 
              className="web"
              style={{ maxWidth: '640px', height: 'auto' }}
            />
          </div>
        )}
      </div>
      
      <br />
      
      {isProcessing && (
        <div style={{ color: 'yellow', marginBottom: '10px' }}>
          Processing frame...
        </div>
      )}
      
      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {error}
        </div>
      )}
      
      <button
        onClick={() => setDetecting(!detecting)}
        className={`px-6 py-3 rounded-lg text-white shadow-lg ${
          detecting ? "bg-red-600" : "bg-green-600"
        } hover:opacity-80 transition duration-300`}
      >
        {detecting ? "Stop Detection" : "Start Detection"}
      </button>
    </div>
  );
};

export default LiveCamera;
