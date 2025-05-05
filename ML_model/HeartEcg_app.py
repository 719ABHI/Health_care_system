# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from tensorflow.keras.models import load_model
# from PIL import Image
# import numpy as np
#
# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)
#
# # Configuration
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16MB
#
# # Ensure upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#
# # Load trained model
# model = load_model('my_trained_model.h5')
#
# # Define your class labels (modify according to your training classes)
# class_labels = [
#     'ECG Images of Myocardial Infarction Patients',
#     'ECG Images of Patient that have History of MI',
#     'ECG Images of Patient that have abnormal heartbeat',
#     'Normal Person ECG Images'
# ]
#
# # Helper: Check if file is allowed
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400
#
#     file = request.files['image']
#
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
#
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#
#         try:
#             file.save(filepath)
#         except Exception as e:
#             return jsonify({'error': f'Failed to save file: {str(e)}'}), 500
#
#         try:
#             # Preprocess image (match training pipeline)
#             img = Image.open(filepath).convert('RGB')
#             img = img.resize((128, 128))  # Resize to match model input
#             img_array = np.array(img) / 255.0  # Normalize
#             img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#
#             # Predict
#             prediction = model.predict(img_array)
#             predicted_index = np.argmax(prediction[0])
#             predicted_label = class_labels[predicted_index]
#             confidence = float(np.max(prediction))
#
#             return jsonify({
#                 'prediction_index': int(predicted_index),
#                 'prediction_label': predicted_label,
#                 'confidence': confidence
#             }), 200
#
#         except Exception as e:
#             return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
#
#     return jsonify({'error': 'Invalid file format'}), 400
#
# # Run app
# if __name__ == '__main__':
#     app.run(debug=True, port=5003)
#





#
# import os
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# from tensorflow.keras.models import load_model
# from PIL import Image
# import numpy as np
#
# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)
#
# # Configuration
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16MB
#
# # Ensure upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#
# # Load trained model
# model = load_model('my_trained_model.h5')
#
# # Define your class labels (modify according to your training classes)
# class_labels = [
#     'ECG Images of Myocardial Infarction Patients',
#     'ECG Images of Patient that have History of MI',
#     'ECG Images of Patient that have abnormal heartbeat',
#     'Normal Person ECG Images'
# ]
#
# # Helper: Check if file is allowed
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No file uploaded'}), 400
#
#     file = request.files['image']
#
#     if file.filename == '':
#         return jsonify({'error': 'No selected file'}), 400
#
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#
#         try:
#             file.save(filepath)
#         except Exception as e:
#             return jsonify({'error': f'Failed to save file: {str(e)}'}), 500
#
#         try:
#             # Preprocess image (match training pipeline)
#             img = Image.open(filepath).convert('RGB')
#             img = img.resize((128, 128))  # Resize to match model input
#             img_array = np.array(img) / 255.0  # Normalize
#             img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#
#             # Predict
#             prediction = model.predict(img_array)
#             predicted_index = np.argmax(prediction[0])
#             predicted_label = class_labels[predicted_index]
#             confidence = float(np.max(prediction))
#
#             return jsonify({
#                 'prediction_index': int(predicted_index),
#                 'prediction_label': predicted_label,
#                 'confidence': confidence
#             }), 200
#
#         except Exception as e:
#             return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
#
#     return jsonify({'error': 'Invalid file format'}), 400
#
# # Run app
# if __name__ == '__main__':
#     app.run(debug=True, port=5003)

import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max 16MB

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load trained model
model = load_model('my_trained_model.h5')

# Define your class labels (modify according to your training classes)
class_labels = [
    'ECG Images of Myocardial Infarction Patients',
    'ECG Images of Patient that have History of MI',
    'ECG Images of Patient that have abnormal heartbeat',
    'Normal Person ECG Images'
]

# Helper: Check if file is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Setup logging
logging.basicConfig(level=logging.DEBUG)

# Prediction endpoint
@app.route('/api/ecg/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        logging.error('No file uploaded')
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['image']

    if file.filename == '':
        logging.error('No selected file')
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        try:
            file.save(filepath)
            logging.info(f'File saved successfully: {filename}')
        except Exception as e:
            logging.error(f'Failed to save file: {str(e)}')
            return jsonify({'error': f'Failed to save file: {str(e)}'}), 500

        try:
            # Preprocess image
            img = Image.open(filepath).convert('RGB')
            img = img.resize((128, 128))  # Resize to match model input
            img_array = np.array(img) / 255.0  # Normalize
            img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

            # Predict
            prediction = model.predict(img_array)
            predicted_index = np.argmax(prediction[0])
            predicted_label = class_labels[predicted_index]
            confidence = float(np.max(prediction))

            logging.info(f'Prediction: {predicted_label} with confidence {confidence}')
            return jsonify({
                'prediction_index': int(predicted_index),
                'prediction_label': predicted_label,
                'confidence': confidence
            }), 200

        except Exception as e:
            logging.error(f'Prediction failed: {str(e)}')
            return jsonify({'error': f'Prediction failed: {str(e)}'}), 500

    logging.error('Invalid file format')
    return jsonify({'error': 'Invalid file format'}), 400

# Run app
if __name__ == '__main__':
    app.run(debug=True, port=5003)
