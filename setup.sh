#!/bin/bash

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

echo "Setup complete! Virtual environment is activated."
echo "Starting Flask backend server..."

# Start the backend server
python server.py
