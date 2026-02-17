# StructScan

## Overview
This repository presents **StructScan**, a comprehensive AI-powered solution for structural damage detection. The system focuses on crack detection and real-time analysis using a YOLOv8 model. It features both image upload and live webcam detection capabilities with a modern React-based interface.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributors](#contributors)

## Features
- **AI-Powered Crack Detection**: Detect structural cracks using YOLOv8 deep learning model
- **Image Upload Analysis**: Upload photos for instant damage detection
- **Real-Time Detection**: Use webcam for live structural monitoring
- **Modern Web Interface**: React-based responsive UI with concrete-themed design
- **REST API Backend**: Flask server for efficient image processing
- **Instant Results**: Visual feedback with bounding boxes around detected damage

## Technologies Used

### Frontend
- **React.js** – Modern UI framework
- **Axios** – HTTP client for API communication
- **React-Webcam** – Real-time camera access
- **Tailwind CSS** – Styling framework

### Backend
- **Python 3.9** – Core programming language
- **Flask** – Web framework for REST API
- **YOLOv8 (Ultralytics)** – State-of-the-art object detection
- **OpenCV** – Computer vision and image processing
- **Flask-CORS** – Cross-origin resource sharing

### Machine Learning
- **YOLOv8** – Trained specifically for crack detection
- **NumPy** – Numerical computing
- **PyTorch** – Deep learning framework

## Installation

### Prerequisites
- Node.js (v14+)
- Python 3.9+
- pip3

### Frontend Setup
```bash
npm install
npm start
```
Runs on: http://localhost:3001

### Backend Setup
```bash
pip3 install ultralytics flask flask-cors opencv-python
python3 server.py
```
Runs on: http://localhost:5001

## Usage
1. **Upload Detection**: 
   - Navigate to the Upload section
   - Select an image with structural damage
   - Click "Upload & Detect"
   - View results with highlighted cracks

2. **Real-Time Detection**:
   - Go to the Live Detection section
   - Allow camera access
   - Click "Start Detection"
   - Point camera at structures to detect damage in real-time

## Project Structure
```
StructScan/
├── src/                    # React frontend
│   ├── Components/         # UI components
│   ├── App.js             # Main app
│   └── App.css            # Styling
├── public/                # Static assets
├── StructScan_ML/         # ML model and test data
├── server.py              # Flask backend
└── package.json           # Dependencies
```

## Contributors
- **Arsh Kalra** – Full-stack development and ML integration
- **Durvank Gade** – Initial ML model development
- **Kanad Bhattacharya** – Model training
- **Vasundhra Sharma** – Data collection

---

Made with ❤️ by Arsh Kalra
