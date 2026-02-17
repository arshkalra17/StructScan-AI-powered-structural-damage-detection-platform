from flask import Flask, request, jsonify
import cv2
import numpy as np
import base64
from ultralytics import YOLO

app = Flask(__name__)

# Load YOLOv8 model
model = YOLO("yolov8s.pt")  # Replace with your trained model path

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Run YOLOv8 inference
    results = model(img)
    for r in results:
        for box in r.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)

    _, buffer = cv2.imencode(".png", img)
    img_base64 = base64.b64encode(buffer).decode("utf-8")

    return jsonify({"image": img_base64})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
