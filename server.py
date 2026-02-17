from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from ultralytics import YOLO
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app) 

model = YOLO("yolov8_trained_model.pt")  # Replace with your trained model path

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "StructScan ML Backend is running", "endpoints": ["/upload (POST)"]}), 200

@app.route("/test", methods=["GET"])
@cross_origin()
def test():
    return jsonify({"status": "ok", "message": "Backend is reachable"}), 200

@app.route("/upload", methods=["POST"])
@cross_origin()
def upload():
    print("Upload request received!")
    try:
        if 'file' not in request.files:
            return jsonify({"error": "No file provided"}), 400
        
        file = request.files["file"]
        
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        
        # Read and decode image
        img_bytes = file.read()
        img = cv2.imdecode(np.frombuffer(img_bytes, np.uint8), cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({"error": "Invalid image file"}), 400

        # Run YOLOv8 inference
        results = model(img)
        for r in results:
            for box in r.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

        # Encode result image
        _, buffer = cv2.imencode(".png", img)
        img_base64 = base64.b64encode(buffer).decode("utf-8")

        return jsonify({"image": img_base64}), 200
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({"error": f"Error processing image: {str(e)}"}), 500

if __name__ == "__main__":
    print("Starting Flask server on http://0.0.0.0:5001")
    print("Accessible at http://localhost:5001 and http://127.0.0.1:5001")
    app.run(debug=True, host='0.0.0.0', port=5001)
