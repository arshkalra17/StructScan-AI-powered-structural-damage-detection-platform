# StructScan - Complete Technical Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technologies & Their Purpose](#technologies--their-purpose)
4. [Installation & Setup](#installation--setup)
5. [How Everything Works Together](#how-everything-works-together)
6. [Data Flow & Communication](#data-flow--communication)
7. [File Structure & Purpose](#file-structure--purpose)
8. [Key Features Explained](#key-features-explained)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**StructScan** is an AI-powered web application for detecting structural damage (cracks) in buildings and infrastructure. It combines computer vision, deep learning, and modern web technologies to provide both static image analysis and real-time detection capabilities.

### What Problem Does It Solve?
Manual inspection of infrastructure for cracks and damage is:
- Time-consuming
- Requires expert knowledge
- Can miss small defects
- Difficult to document consistently

StructScan automates this process using AI, making it faster, more consistent, and accessible to anyone with a camera.

### Core Capabilities
1. **Upload & Analyze**: Upload images and get instant crack detection results
2. **Real-Time Detection**: Use webcam for live structural monitoring
3. **Visual Feedback**: See detected cracks highlighted with bounding boxes
4. **Web-Based**: No installation needed, works in any modern browser

---

## 🏗️ System Architecture

StructScan follows a **client-server architecture** with two main components:

### Architecture Diagram
```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                    (Web Browser)                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         │
        ┌────────────────┴────────────────┐
        │                                  │
┌───────▼──────────┐              ┌────────▼─────────┐
│   FRONTEND       │              │    BACKEND       │
│   (React.js)     │◄────────────►│   (Flask API)    │
│                  │   REST API   │                  │
│  Port: 3001      │              │   Port: 5001     │
└──────────────────┘              └──────┬───────────┘
                                         │
                                         │ Loads Model
                                         │
                                  ┌──────▼───────────┐
                                  │   YOLOv8 Model   │
                                  │  (AI Detection)  │
                                  └──────────────────┘
```

### Component Breakdown

#### Frontend (React.js)
- **Purpose**: User interface and interaction
- **Location**: `src/` directory
- **Port**: 3001
- **Responsibilities**:
  - Display UI components
  - Handle user input (file uploads, webcam)
  - Send images to backend
  - Display detection results
  - Manage application state

#### Backend (Flask)
- **Purpose**: Image processing and AI inference
- **Location**: `server.py`
- **Port**: 5001
- **Responsibilities**:
  - Receive images via REST API
  - Process images with OpenCV
  - Run YOLOv8 model for detection
  - Draw bounding boxes on detected cracks
  - Return processed images to frontend

#### AI Model (YOLOv8)
- **Purpose**: Crack detection
- **Location**: `yolov8_trained_model.pt`
- **Responsibilities**:
  - Analyze images for crack patterns
  - Identify crack locations
  - Provide confidence scores
  - Return bounding box coordinates

---

## 🔧 Technologies & Their Purpose

### Frontend Technologies

#### 1. React.js (v19.0.0)
**What it is**: JavaScript library for building user interfaces

**Why we use it**: 
- Component-based architecture (reusable UI pieces)
- Virtual DOM for fast rendering
- Large ecosystem and community support
- Easy state management

**How it's used in StructScan**:
- Creates all UI components (Header, Upload, Live Detection, etc.)
- Manages application state (selected images, results, loading states)
- Handles routing between different sections
- Provides reactive updates when data changes

**Example**:
```javascript
// Component that manages state
const [image, setImage] = useState(null);  // Stores uploaded image
const [result, setResult] = useState(null); // Stores detection result
```

#### 2. Axios (v1.13.5)
**What it is**: Promise-based HTTP client for making API requests

**Why we use it**:
- Simpler syntax than native fetch API
- Automatic JSON transformation
- Better error handling
- Request/response interceptors

**How it's used in StructScan**:
- Sends images from frontend to backend
- Handles multipart/form-data for file uploads
- Manages API responses and errors

**Example**:
```javascript
// Sending image to backend
const formData = new FormData();
formData.append("file", imageFile);

axios.post("http://localhost:5001/upload", formData)
  .then(response => setResult(response.data.image))
  .catch(error => console.error(error));
```

#### 3. React-Webcam (v7.2.0)
**What it is**: React component for accessing device camera

**Why we use it**:
- Easy camera access in React
- Captures screenshots from video stream
- Cross-browser compatibility
- Simple API

**How it's used in StructScan**:
- Captures live video feed for real-time detection
- Takes screenshots every 3 seconds
- Converts frames to blob format for upload

**Example**:
```javascript
const webcamRef = useRef(null);

// Capture frame
const imageSrc = webcamRef.current.getScreenshot();
```

#### 4. Tailwind CSS
**What it is**: Utility-first CSS framework

**Why we use it**:
- Rapid styling with utility classes
- Consistent design system
- Responsive design made easy
- No need to write custom CSS

**How it's used in StructScan**:
- Button styling and hover effects
- Layout and spacing
- Responsive grid systems
- Color schemes

### Backend Technologies

#### 1. Python (v3.9+)
**What it is**: High-level programming language

**Why we use it**:
- Excellent for AI/ML applications
- Rich ecosystem of libraries
- Easy to read and maintain
- Strong community support

**How it's used in StructScan**:
- Backend server implementation
- Image processing logic
- Model inference
- API endpoint handling

#### 2. Flask (v3.0.0)
**What it is**: Lightweight Python web framework

**Why we use it**:
- Simple and minimalistic
- Easy to create REST APIs
- Flexible and extensible
- Perfect for small to medium projects

**How it's used in StructScan**:
- Creates HTTP endpoints (/upload, /test)
- Handles incoming requests
- Processes file uploads
- Returns JSON responses

**Example**:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    # Process file
    return jsonify({"image": result})
```

#### 3. Flask-CORS (v4.0.0)
**What it is**: Flask extension for handling Cross-Origin Resource Sharing

**Why we use it**:
- Browsers block requests between different origins (ports) by default
- Frontend (port 3001) needs to communicate with backend (port 5001)
- Security feature that needs explicit configuration

**How it's used in StructScan**:
```python
from flask_cors import CORS

CORS(app)  # Allows all origins (development only)
```

#### 4. YOLOv8 / Ultralytics (v8.1.0)
**What it is**: State-of-the-art object detection model

**Why we use it**:
- Fast inference speed (~1-2 seconds per image)
- High accuracy for object detection
- Pre-trained models available
- Easy to fine-tune for custom datasets

**How it works**:
1. Divides image into grid cells
2. Each cell predicts bounding boxes and class probabilities
3. Filters predictions by confidence threshold
4. Returns coordinates of detected objects

**How it's used in StructScan**:
```python
from ultralytics import YOLO

model = YOLO("yolov8_trained_model.pt")
results = model(image)  # Run inference

# Extract bounding boxes
for box in results[0].boxes:
    x1, y1, x2, y2 = box.xyxy[0]  # Coordinates
    confidence = box.conf[0]       # Confidence score
```

#### 5. OpenCV (cv2) (v4.9.0)
**What it is**: Computer vision library for image processing

**Why we use it**:
- Read and write images in various formats
- Draw shapes (rectangles, circles, text)
- Image transformations and filters
- Industry standard for computer vision

**How it's used in StructScan**:
```python
import cv2

# Decode uploaded image
img = cv2.imdecode(np.frombuffer(file_bytes, np.uint8), cv2.IMREAD_COLOR)

# Draw rectangle around detected crack
cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

# Encode image back to send to frontend
_, buffer = cv2.imencode(".png", img)
```

#### 6. NumPy (v1.26.3)
**What it is**: Library for numerical computing with arrays

**Why we use it**:
- Efficient array operations
- Required by OpenCV and PyTorch
- Fast mathematical computations

**How it's used in StructScan**:
- Convert image bytes to arrays
- Image data manipulation
- Coordinate calculations

#### 7. PyTorch (v2.2.0)
**What it is**: Deep learning framework

**Why we use it**:
- Required by YOLOv8/Ultralytics
- Provides neural network operations
- GPU acceleration support

**How it's used in StructScan**:
- Runs under the hood when YOLOv8 performs inference
- Handles tensor operations
- Model weight loading

---

## 🚀 Installation & Setup

### Prerequisites Check
Before starting, ensure you have:
```bash
# Check Node.js
node --version  # Should be v14+

# Check Python
python3 --version  # Should be 3.9+

# Check pip
pip3 --version
```

### Step-by-Step Installation

#### Option 1: Automated Setup (Recommended)
```bash
# Make setup script executable
chmod +x setup.sh

# Run setup (creates venv, installs dependencies, starts backend)
./setup.sh
```

#### Option 2: Manual Setup

**1. Clone/Navigate to Project**
```bash
cd /path/to/StructScan
```

**2. Install Frontend Dependencies**
```bash
npm install
```
This installs:
- react, react-dom
- axios
- react-webcam
- react-scripts
- web-vitals

**3. Setup Python Virtual Environment (Recommended)**
```bash
# Create virtual environment
python3 -m venv venv

# Activate it
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate  # Windows
```

**4. Install Backend Dependencies**
```bash
# Using requirements.txt
pip install -r requirements.txt

# OR manually
pip install flask==3.0.0 flask-cors==4.0.0 opencv-python==4.9.0.80 numpy==1.26.3 ultralytics==8.1.0 torch==2.2.0 torchvision==0.17.0
```

**5. Verify Model File**
Ensure `yolov8_trained_model.pt` exists in the root directory (6MB file)

**6. Start Backend Server**
```bash
python3 server.py
```
Expected output:
```
Starting Flask server on http://0.0.0.0:5001
Accessible at http://localhost:5001 and http://127.0.0.1:5001
```

**7. Start Frontend (New Terminal)**
```bash
npm start
```
Expected output:
```
Compiled successfully!
You can now view structscan in the browser.
  Local:            http://localhost:3001
```

### Verification
1. Backend: Visit http://localhost:5001 - Should see JSON message
2. Frontend: Visit http://localhost:3001 - Should see StructScan homepage
3. Backend status indicator on frontend should show green ✓

---

## 🔄 How Everything Works Together

### Complete Request-Response Cycle

#### Scenario 1: Image Upload Detection

**Step 1: User Action**
```
User selects image file → Clicks "Upload & Detect"
```

**Step 2: Frontend Processing (Upload.jsx)**
```javascript
// 1. Create FormData object
const formData = new FormData();
formData.append("file", selectedFile);

// 2. Set loading state
setLoading(true);

// 3. Send POST request
axios.post("http://localhost:5001/upload", formData, {
  headers: { "Content-Type": "multipart/form-data" },
  timeout: 30000
})
```

**Step 3: Network Transfer**
```
HTTP POST Request
├── URL: http://localhost:5001/upload
├── Method: POST
├── Headers: Content-Type: multipart/form-data
└── Body: Binary image data
```

**Step 4: Backend Receives Request (server.py)**
```python
@app.route("/upload", methods=["POST"])
def upload():
    # 1. Extract file from request
    file = request.files["file"]
    
    # 2. Read file bytes
    img_bytes = file.read()
    
    # 3. Decode to OpenCV format
    img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
```

**Step 5: AI Model Inference**
```python
    # 4. Run YOLOv8 model
    results = model(img)
    
    # Model internally:
    # - Preprocesses image (resize, normalize)
    # - Runs through neural network
    # - Applies non-max suppression
    # - Returns detections
```

**Step 6: Post-Processing**
```python
    # 5. Draw bounding boxes
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
```

**Step 7: Encode and Return**
```python
    # 6. Encode image to PNG
    _, buffer = cv2.imencode(".png", img)
    
    # 7. Convert to base64 string
    img_base64 = base64.b64encode(buffer).decode("utf-8")
    
    # 8. Return JSON response
    return jsonify({"image": img_base64}), 200
```

**Step 8: Frontend Receives Response**
```javascript
.then(response => {
  // 1. Extract base64 image
  const base64Image = response.data.image;
  
  // 2. Update state
  setResult(`data:image/png;base64,${base64Image}`);
  setLoading(false);
})
```

**Step 9: Display Result**
```javascript
// React renders the result
{result && (
  <img src={result} alt="Detection Result" />
)}
```

#### Scenario 2: Real-Time Detection

**Continuous Loop (Every 3 seconds)**
```javascript
useEffect(() => {
  if (isDetecting) {
    const interval = setInterval(() => {
      // 1. Capture frame from webcam
      const imageSrc = webcamRef.current.getScreenshot();
      
      // 2. Convert to blob
      fetch(imageSrc)
        .then(res => res.blob())
        .then(blob => {
          // 3. Send to backend (same as upload)
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");
          
          axios.post("http://localhost:5001/upload", formData)
            .then(response => setDetectionResult(response.data.image));
        });
    }, 3000);  // Every 3 seconds
    
    return () => clearInterval(interval);
  }
}, [isDetecting]);
```

---

## 📊 Data Flow & Communication

### Data Formats at Each Stage

**1. User's Image File**
```
Format: JPEG/PNG/etc.
Size: Variable (typically 100KB - 5MB)
Location: User's device
```

**2. FormData Object (Frontend)**
```javascript
FormData {
  file: Blob {
    type: "image/jpeg",
    size: 1234567,
    data: [binary data]
  }
}
```

**3. HTTP Request**
```
POST /upload HTTP/1.1
Host: localhost:5001
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
Content-Length: 1234567

------WebKitFormBoundary...
Content-Disposition: form-data; name="file"; filename="crack.jpg"
Content-Type: image/jpeg

[binary image data]
------WebKitFormBoundary...--
```

**4. Backend Processing (NumPy Array)**
```python
# Shape: (height, width, channels)
# Example: (1080, 1920, 3)
img = np.array([
  [[255, 0, 0], [0, 255, 0], ...],  # Row 1
  [[0, 0, 255], [255, 255, 0], ...], # Row 2
  ...
])
```

**5. YOLOv8 Output**
```python
Results {
  boxes: [
    {
      xyxy: [100, 200, 300, 400],  # Bounding box coordinates
      conf: 0.85,                   # Confidence score
      cls: 0                        # Class (0 = crack)
    },
    ...
  ]
}
```

**6. Base64 Encoded Image**
```python
"iVBORw0KGgoAAAANSUhEUgAAA..." # Long string
```

**7. JSON Response**
```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAAA..."
}
```

**8. Frontend Display**
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA..." />
```

---

## 📁 File Structure & Purpose

```
StructScan/
│
├── 📄 package.json              # Frontend dependencies and scripts
├── 📄 package-lock.json         # Locked dependency versions
├── 📄 tailwind.config.js        # Tailwind CSS configuration
├── 📄 requirements.txt          # Python dependencies
├── 📄 setup.sh                  # Automated setup script
├── 📄 server.py                 # Flask backend server
├── 📄 yolov8_trained_model.pt   # Trained AI model (6MB)
│
├── 📁 public/                   # Static assets
│   ├── index.html              # Main HTML template
│   ├── manifest.json           # PWA configuration
│   ├── favicon.ico             # Website icon
│   ├── concrete-bg.jpg         # Background image
│   └── robots.txt              # SEO configuration
│
├── 📁 src/                      # Frontend source code
│   ├── 📄 index.js             # React entry point
│   ├── 📄 App.js               # Main app component
│   ├── 📄 App.css              # Global styles
│   ├── 📄 index.css            # Base styles
│   │
│   └── 📁 Components/          # React components
│       ├── Header.jsx          # Navigation bar
│       ├── HomePage.jsx        # Landing page
│       ├── About.jsx           # About section
│       ├── Upload.jsx          # Image upload feature
│       ├── Live.jsx            # Real-time detection
│       └── Footer.jsx          # Contact information
│
├── 📁 StructScan_ML/           # ML training and testing
│   ├── FINAL_OUTPUT.ipynb      # Final predictions notebook
│   ├── YolovInfrastructure.ipynb # Model training notebook
│   ├── yolov8_trained_model.pt # Model copy
│   ├── 📁 test/                # Test images
│   └── 📁 Output/              # Sample outputs
│
└── 📁 node_modules/            # Installed npm packages (auto-generated)
```

### Key Files Explained

#### server.py
**Purpose**: Backend API server
**Key Functions**:
- `home()`: Returns server status
- `test()`: Health check endpoint
- `upload()`: Main image processing endpoint

**Dependencies**:
```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import cv2, numpy as np, base64
```

#### src/App.js
**Purpose**: Main React component that renders all sections
**Structure**:
```javascript
function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <About />
      <Upload />
      <Live />
      <Footer />
    </div>
  );
}
```

#### src/Components/Upload.jsx
**Purpose**: Image upload and detection interface
**Key State Variables**:
```javascript
const [image, setImage] = useState(null);        // Selected image
const [result, setResult] = useState(null);      // Detection result
const [loading, setLoading] = useState(false);   // Loading state
const [error, setError] = useState(null);        // Error messages
```

#### src/Components/Live.jsx
**Purpose**: Real-time webcam detection
**Key Features**:
- Webcam access using react-webcam
- Interval-based frame capture (3 seconds)
- Side-by-side display of live feed and results

#### requirements.txt
**Purpose**: Python dependency specification
**Contents**:
```
flask==3.0.0
flask-cors==4.0.0
opencv-python==4.9.0.80
numpy==1.26.3
ultralytics==8.1.0
torch==2.2.0
torchvision==0.17.0
```

---

## 🎯 Key Features Explained

### 1. Backend Status Indicator

**What it does**: Shows connection status to backend server

**Implementation**:
```javascript
useEffect(() => {
  axios.get("http://localhost:5001/test")
    .then(() => setBackendStatus("connected"))
    .catch(() => setBackendStatus("disconnected"));
}, []);
```

**Visual Feedback**:
- ✓ Green checkmark: Backend running
- ⚠️ Red warning: Backend not reachable

### 2. Image Upload with Preview

**What it does**: Shows preview before uploading

**Implementation**:
```javascript
const handleImageChange = (e) => {
  const file = e.target.files[0];
  setImage(file);
  
  // Create preview URL
  const reader = new FileReader();
  reader.onloadend = () => setPreview(reader.result);
  reader.readAsDataURL(file);
};
```

### 3. Loading States

**What it does**: Shows "Processing..." while waiting for results

**Implementation**:
```javascript
const handleUpload = async () => {
  setLoading(true);
  try {
    const response = await axios.post(url, formData);
    setResult(response.data.image);
  } finally {
    setLoading(false);
  }
};
```

### 4. Error Handling

**What it does**: Catches and displays errors gracefully

**Implementation**:
```javascript
.catch(error => {
  if (error.code === 'ECONNABORTED') {
    setError("Request timeout. Please try again.");
  } else if (error.response) {
    setError(`Server error: ${error.response.data.error}`);
  } else {
    setError("Network error. Check if backend is running.");
  }
});
```

### 5. Smooth Scrolling

**What it does**: Animates scroll to sections

**Implementation**:
```javascript
const scrollToUpload = () => {
  document.getElementById('upload-section')
    .scrollIntoView({ behavior: 'smooth' });
};
```

### 6. Responsive Design

**What it does**: Adapts to different screen sizes

**Implementation**:
```css
/* Tailwind classes */
<div className="flex flex-col md:flex-row">
  <!-- Stacks vertically on mobile, horizontally on desktop -->
</div>
```

---

## 🔍 Troubleshooting

### Common Issues and Solutions

#### Issue 1: "Network Error" or "Backend not reachable"

**Symptoms**:
- Red ⚠️ indicator on frontend
- Upload fails immediately
- Console shows connection refused

**Causes**:
1. Backend server not running
2. Wrong port configuration
3. Firewall blocking connection

**Solutions**:
```bash
# Check if backend is running
curl http://localhost:5001/test

# If not, start it
python3 server.py

# Check if port 5001 is in use
lsof -i :5001  # macOS/Linux
netstat -ano | findstr :5001  # Windows
```

#### Issue 2: "Port 5000 already in use"

**Symptoms**:
```
OSError: [Errno 48] Address already in use
```

**Cause**: macOS AirPlay Receiver uses port 5000

**Solution**: Already configured to use port 5001 instead
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

#### Issue 3: CORS Errors

**Symptoms**:
```
Access to XMLHttpRequest blocked by CORS policy
```

**Cause**: Browser security blocking cross-origin requests

**Solution**: Ensure Flask-CORS is installed and configured
```python
from flask_cors import CORS
CORS(app)
```

#### Issue 4: "Module not found" errors

**Symptoms**:
```
ModuleNotFoundError: No module named 'ultralytics'
```

**Cause**: Python dependencies not installed

**Solution**:
```bash
# Activate virtual environment first
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

#### Issue 5: Webcam not working

**Symptoms**:
- Black screen in Live Detection
- Browser doesn't ask for camera permission

**Causes**:
1. Camera permissions not granted
2. Camera in use by another app
3. HTTPS required (some browsers)

**Solutions**:
1. Check browser permissions (Settings → Privacy → Camera)
2. Close other apps using camera
3. Use localhost (exempt from HTTPS requirement)

#### Issue 6: Slow detection speed

**Symptoms**:
- Takes >5 seconds per image
- Real-time detection lags

**Causes**:
1. Large image size
2. CPU-only inference (no GPU)
3. Model loading on each request

**Solutions**:
```python
# Resize images before processing
img = cv2.resize(img, (640, 640))

# Model loads once at startup (already implemented)
model = YOLO("yolov8_trained_model.pt")  # Outside route handler
```

#### Issue 7: "Invalid image file"

**Symptoms**:
```json
{"error": "Invalid image file"}
```

**Causes**:
1. Corrupted file
2. Unsupported format
3. File too large

**Solutions**:
- Use common formats (JPEG, PNG)
- Keep files under 10MB
- Verify file integrity

---

## 📈 Performance Metrics

### Typical Processing Times

| Operation | Time | Notes |
|-----------|------|-------|
| Image decode | 50ms | Depends on size |
| YOLOv8 inference | 1-2s | CPU-based |
| Draw boxes | 10ms | Minimal overhead |
| Image encode | 100ms | PNG compression |
| Network transfer | 50-200ms | Depends on connection |
| **Total** | **2-3s** | Per image |

### Optimization Tips

1. **Use GPU**: Install CUDA-enabled PyTorch for 10x speedup
```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
```

2. **Reduce image size**: Resize before sending
```javascript
// Frontend: Resize before upload
canvas.toBlob(blob => {
  // Send resized blob
}, 'image/jpeg', 0.8);
```

3. **Batch processing**: Process multiple images together
```python
results = model([img1, img2, img3])  # Batch inference
```

---

## 🎓 Understanding the AI Model

### YOLOv8 Architecture Simplified

```
Input Image (640x640x3)
        ↓
    Backbone (CSPDarknet)
    - Extracts features
    - Multiple scales
        ↓
    Neck (PANet)
    - Combines features
    - Multi-scale fusion
        ↓
    Head (Detection)
    - Predicts boxes
    - Predicts classes
        ↓
Output: Bounding boxes + Confidence scores
```

### Training Process (Already Done)

1. **Data Collection**: Gathered crack images
2. **Annotation**: Labeled crack locations
3. **Training**: Fed to YOLOv8 for learning
4. **Validation**: Tested on unseen images
5. **Export**: Saved as `.pt` file

### Model File Structure

```
yolov8_trained_model.pt (6MB)
├── Model architecture
├── Trained weights (millions of parameters)
├── Class names ["crack"]
└── Hyperparameters
```

---

## 🚀 Deployment Considerations

### For Production Use

**1. Security**
```python
# Restrict CORS to specific domain
CORS(app, origins=["https://yourdomain.com"])

# Add authentication
@app.before_request
def check_auth():
    token = request.headers.get('Authorization')
    if not verify_token(token):
        return jsonify({"error": "Unauthorized"}), 401
```

**2. Performance**
```python
# Add caching
from flask_caching import Cache
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

# Rate limiting
from flask_limiter import Limiter
limiter = Limiter(app, default_limits=["100 per hour"])
```

**3. Monitoring**
```python
# Add logging
import logging
logging.basicConfig(level=logging.INFO)

# Track metrics
@app.after_request
def log_request(response):
    logging.info(f"{request.method} {request.path} - {response.status_code}")
    return response
```

**4. Scalability**
- Use Gunicorn/uWSGI for production server
- Deploy on cloud (AWS, GCP, Azure)
- Use load balancer for multiple instances
- Consider serverless (AWS Lambda) for variable load

---

## 📚 Additional Resources

### Documentation
- React: https://react.dev/
- Flask: https://flask.palletsprojects.com/
- YOLOv8: https://docs.ultralytics.com/
- OpenCV: https://docs.opencv.org/

### Learning Paths
1. **Web Development**: HTML/CSS → JavaScript → React
2. **Backend**: Python basics → Flask → REST APIs
3. **AI/ML**: Python → NumPy → PyTorch → YOLO
4. **Computer Vision**: Image basics → OpenCV → Object detection

---

## 🎯 Summary

StructScan combines:
- **Frontend**: React.js for interactive UI
- **Backend**: Flask for API server
- **AI**: YOLOv8 for crack detection
- **CV**: OpenCV for image processing

**Data flows**: User → React → Axios → Flask → YOLOv8 → OpenCV → Flask → React → User

**Key technologies**: 15+ libraries working together seamlessly

**Result**: Professional AI-powered structural damage detection system

---

**Made with ❤️ by Arsh Kalra**
*Last Updated: February 17, 2026*
