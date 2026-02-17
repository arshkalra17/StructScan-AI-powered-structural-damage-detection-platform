# StructScan 🏗️
### AI-Powered Structural Damage Detection System

**StructScan** is a professional-grade web application designed to automate the inspection of infrastructure for cracks and damage. By combining **Computer Vision (YOLOv8)** with a modern **React-Flask architecture**, it provides instant, documented analysis for both uploaded images and live camera feeds.



---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [System Architecture](#-system-architecture)
3. [Technologies](#-technologies)
4. [Installation & Setup](#-installation--setup)
5. [Data Flow](#-data-flow)
6. [File Structure](#-file-structure)
7. [Troubleshooting](#-troubleshooting)

---

## 🎯 Project Overview

Manual infrastructure inspection is time-consuming and subjective. StructScan provides a standardized, AI-driven approach to:
* **Automated Detection**: Instantly identifies cracks that might be missed by the human eye.
* **Real-Time Monitoring**: Live detection for on-site assessment using portable devices.
* **Visual Documentation**: Generates processed images with bounding box overlays and confidence scores.

---

## 🏗️ System Architecture

StructScan follows a **Client-Server architecture** to separate the user interface from the computationally intensive AI processing.



### Component Breakdown
* **Frontend (React.js)**: Manages the UI, state, webcam stream, and API requests.
* **Backend (Flask)**: A Python REST API that handles image pre-processing and AI model execution.
* **AI Engine (YOLOv8)**: A state-of-the-art deep learning model fine-tuned for crack detection.

---

## 🔧 Technologies

### Frontend
* **React.js**: Library for building the reactive user interface.
* **Axios**: Handling asynchronous HTTP requests to the backend.
* **React-Webcam**: Capturing video frames for real-time analysis.
* **Tailwind CSS**: Modern utility-first styling for responsive design.

### Backend & AI
* **Python/Flask**: Backend routing and API management.
* **YOLOv8 (Ultralytics)**: The deep learning model for feature extraction.
* **OpenCV**: Image decoding, resizing, and drawing visual overlays.
* **PyTorch**: Underlying framework for tensor computations and model weights.

---

## 🚀 Installation & Setup

### 1. Prerequisites
* **Node.js**: v14+
* **Python**: 3.9+
* **Pip**: Latest version

### 2. Backend Setup
We recommend using a virtual environment:
```bash
# Navigate to the project folder
cd StructScan

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install flask flask-cors opencv-python numpy ultralytics torch torchvision

# Start the server (Port 5001)
python server.py
```

## Frontend Setup
```bash
# Install NPM packages
npm install

# Start the development server (Port 3001)
npm start

```

## 🔄 Data Flow
The application follows a strict request-response cycle:

Capture: React captures an image file or a frame from the webcam.

Transmission: The image is sent via Axios as multipart/form-data to the Flask /upload endpoint.

Inference: Flask processes the image using the YOLOv8 model:

Overlay: OpenCV draws green bounding boxes around detected cracks based on the model's coordinates.

Encode: The final image is converted to a Base64 string.

Render: React receives the JSON response and displays the base64 image to the user.


## 📁 File Structure
```bash
  StructScan/
├── server.py                 # Flask API & Inference Logic
├── yolov8_trained_model.pt   # Pre-trained weights (6MB)
├── requirements.txt          # Python library list
├── src/
│   ├── Components/           # UI Components (Header, Upload, Live)
│   ├── App.js                # Root React Component
│   └── App.css               # Global Styling
└── public/                   # Static assets & background images

```

Developed by ### Arsh Kalra 
Last Updated: February 17, 2026
