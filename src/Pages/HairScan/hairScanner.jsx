import React, { useEffect, useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const HairScanner = ({ onResult }) => {
  const videoRef = useRef(null);
  const [model, setModel] = useState(null);
  const [prediction, setPrediction] = useState("");

  // Point to the subfolder you created in the 'public' folder
  const modelPath = "/model/"; 

  useEffect(() => {
    const loadModel = async () => {
        const modelURL = "model/model.json"; 
        const metadataURL = "model/metadata.json";
      
      try {
        const loadedModel = await tmImage.load(modelURL, metadataURL);
        setModel(loadedModel);
        startWebcam();
      } catch (error) {
        console.error("Failed to load local model:", error);
      }
    };
    startWebcam();
    loadModel();
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const predict = async () => {
    if (model && videoRef.current && videoRef.current.readyState === 4) {
      const predictions = await model.predict(videoRef.current);
      
      // Find the highest probability result
      const bestMatch = predictions.sort((a, b) => b.probability - a.probability)[0];
      
      if (bestMatch) {
        setPrediction(bestMatch.className);
        if (onResult) onResult(bestMatch.className);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => predict(), 1000);
    return () => clearInterval(interval);
  }, [model]);

  return (
    <div className="scanner-container" style={{ textAlign: 'center', paddingTop: 100 }}>
      <video 
        ref={videoRef} 
        autoPlay 
        muted 
        playsInline 
        width="400" 
        style={{ borderRadius: '15px', border: '4px solid #f0f0f0' }} 
      />
      <div className="result-overlay">
        <h3>Detected Hair Type: <span style={{ color: '#ff4d4d' }}>{prediction || "Scanning..."}</span></h3>
      </div>
    </div>
  );
};

export default HairScanner;