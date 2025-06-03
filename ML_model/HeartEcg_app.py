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


#
# import os
# import logging
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
# # Setup logging
# logging.basicConfig(level=logging.DEBUG)
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         logging.error('No file uploaded')
#         return jsonify({'error': 'No file uploaded'}), 400
#
#     file = request.files['image']
#
#     if file.filename == '':
#         logging.error('No selected file')
#         return jsonify({'error': 'No selected file'}), 400
#
#     if file and allowed_file(file.filename):
#         filename = secure_filename(file.filename)
#         filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#
#         try:
#             file.save(filepath)
#             logging.info(f'File saved successfully: {filename}')
#         except Exception as e:
#             logging.error(f'Failed to save file: {str(e)}')
#             return jsonify({'error': f'Failed to save file: {str(e)}'}), 500
#
#         try:
#             # Preprocess image
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
#             logging.info(f'Prediction: {predicted_label} with confidence {confidence}')
#             return jsonify({
#                 'prediction_index': int(predicted_index),
#                 'prediction_label': predicted_label,
#                 'confidence': confidence
#             }), 200
#
#         except Exception as e:
#             logging.error(f'Prediction failed: {str(e)}')
#             return jsonify({'error': f'Prediction failed: {str(e)}'}), 500
#
#     logging.error('Invalid file format')
#     return jsonify({'error': 'Invalid file format'}), 400
#
# # Run app
# if __name__ == '__main__':
#     app.run(debug=True, port=5003)





# import os
# import logging
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
# MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB
#
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
#
# # Ensure upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#
# # Setup logging
# logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
#
# # Load model (once at startup)
# try:
#     model = load_model('my_trained_model.h5')
#     logging.info('✅ Model loaded successfully')
# except Exception as e:
#     logging.error(f'❌ Failed to load model: {str(e)}')
#     raise
#
# # Define your class labels (adjust based on your model)
# class_labels = [
#     'ECG Images of Myocardial Infarction Patients',
#     'ECG Images of Patient that have History of MI',
#     'ECG Images of Patient that have abnormal heartbeat',
#     'Normal Person ECG Images'
# ]
#
# # Helper: Check allowed file
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         logging.warning('No file part in request')
#         return jsonify({'success': False, 'error': 'No file part in the request'}), 400
#
#     file = request.files['image']
#
#     if file.filename == '':
#         logging.warning('Empty filename in upload')
#         return jsonify({'success': False, 'error': 'No selected file'}), 400
#
#     if not allowed_file(file.filename):
#         logging.warning(f'Invalid file type: {file.filename}')
#         return jsonify({'success': False, 'error': 'Invalid file type'}), 400
#
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#
#     try:
#         file.save(filepath)
#         logging.info(f'File saved: {filename}')
#     except Exception as e:
#         logging.error(f'Failed to save file: {str(e)}')
#         return jsonify({'success': False, 'error': f'Failed to save file: {str(e)}'}), 500
#
#     try:
#         # Preprocess image
#         img = Image.open(filepath).convert('RGB')
#         img = img.resize((128, 128))  # Adjust if your model expects a different size
#         img_array = np.array(img) / 255.0  # Normalize
#         img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
#
#         # Run prediction
#         prediction = model.predict(img_array)
#         predicted_index = int(np.argmax(prediction[0]))
#         predicted_label = class_labels[predicted_index]
#         confidence = float(np.max(prediction))
#
#         logging.info(f'Prediction: {predicted_label} (index {predicted_index}) with confidence {confidence:.4f}')
#
#         response = {
#             'success': True,
#             'prediction_index': predicted_index,
#             'prediction_label': predicted_label,
#             'confidence': confidence
#         }
#
#     except Exception as e:
#         logging.error(f'Prediction error: {str(e)}')
#         return jsonify({'success': False, 'error': f'Prediction error: {str(e)}'}), 500
#
#     finally:
#         # Clean up the uploaded file after processing
#         try:
#             os.remove(filepath)
#             logging.info(f'Removed uploaded file: {filename}')
#         except Exception as cleanup_err:
#             logging.warning(f'Failed to remove uploaded file: {cleanup_err}')
#
#     return jsonify(response), 200
#
# # Health check
# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({'status': 'ok', 'message': 'Flask server is healthy'}), 200
#
# # Run app
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5003))
#     app.run(debug=True, host='0.0.0.0', port=port)





#
# import os
# import logging
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# import tensorflow as tf
# import numpy as np
#
# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)
#
# # Configuration
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB
#
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
#
# # Ensure upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#
# # Setup logging
# logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
#
# # Load model (once at startup)
# try:
#     model = tf.keras.models.load_model('my_trained_model.h5')
#     logging.info('✅ Model loaded successfully')
# except Exception as e:
#     logging.error(f'❌ Failed to load model: {str(e)}')
#     raise
#
# # Define your class labels (adjust based on your model)
# class_labels = [
#     'ECG Images of Myocardial Infarction Patients',
#     'ECG Images of Patient that have History of MI',
#     'ECG Images of Patient that have abnormal heartbeat',
#     'Normal Person ECG Images'
# ]
#
# # Helper: Check allowed file
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         logging.warning('No file part in request')
#         return jsonify({'success': False, 'error': 'No file part in the request'}), 400
#
#     file = request.files['image']
#
#     if file.filename == '':
#         logging.warning('Empty filename in upload')
#         return jsonify({'success': False, 'error': 'No selected file'}), 400
#
#     if not allowed_file(file.filename):
#         logging.warning(f'Invalid file type: {file.filename}')
#         return jsonify({'success': False, 'error': 'Invalid file type'}), 400
#
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#
#     try:
#         file.save(filepath)
#         logging.info(f'File saved: {filename}')
#     except Exception as e:
#         logging.error(f'Failed to save file: {str(e)}')
#         return jsonify({'success': False, 'error': f'Failed to save file: {str(e)}'}), 500
#
#     try:
#         # Preprocess image
#         img = tf.keras.preprocessing.image.load_img(filepath, target_size=(128, 128))
#         img_array = tf.keras.preprocessing.image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = img_array / 255.0  # Normalize
#
#         # Run prediction
#         prediction = model.predict(img_array)
#         predicted_class = int(np.argmax(prediction, axis=1)[0])
#         predicted_label = class_labels[predicted_class]
#         confidence = float(np.max(prediction))
#
#         logging.info(f'Prediction: {predicted_label} (index {predicted_class}) with confidence {confidence:.4f}')
#
#         response = {
#             'success': True,
#             'prediction_index': predicted_class,
#             'prediction_label': predicted_label,
#             'confidence': confidence
#         }
#
#     except Exception as e:
#         logging.error(f'Prediction error: {str(e)}')
#         return jsonify({'success': False, 'error': f'Prediction error: {str(e)}'}), 500
#
#     finally:
#         # Clean up the uploaded file after processing
#         try:
#             os.remove(filepath)
#             logging.info(f'Removed uploaded file: {filename}')
#         except Exception as cleanup_err:
#             logging.warning(f'Failed to remove uploaded file: {cleanup_err}')
#
#     return jsonify(response), 200
#
# # Health check
# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({'status': 'ok', 'message': 'Flask server is healthy'}), 200
#
# # Run app
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5003))
#     app.run(debug=True, host='0.0.0.0', port=port)



#
import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import tensorflow as tf
import numpy as np

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH

# Ensure upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Setup logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')

# Load model (once at startup)
try:
    model = tf.keras.models.load_model('my_trained_model.h5')
    logging.info('✅ Model loaded successfully')
except Exception as e:
    logging.error(f'❌ Failed to load model: {str(e)}')
    raise

# Define your class labels (adjust based on your model)
class_labels = [
    'ECG Images of Myocardial Infarction Patients',
    'ECG Images of Patient that have History of MI',
    'ECG Images of Patient that have abnormal heartbeat',
    'Normal Person ECG Images'
]

# Helper: Check allowed file
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Prediction endpoint
@app.route('/api/ecg/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        logging.warning('No file part in request')
        return jsonify({'success': False, 'error': 'No file part in the request'}), 400

    file = request.files['image']

    if file.filename == '':
        logging.warning('Empty filename in upload')
        return jsonify({'success': False, 'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        logging.warning(f'Invalid file type: {file.filename}')
        return jsonify({'success': False, 'error': 'Invalid file type'}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

    try:
        file.save(filepath)
        logging.info(f'File saved: {filename}')
    except Exception as e:
        logging.error(f'Failed to save file: {str(e)}')
        return jsonify({'success': False, 'error': f'Failed to save file: {str(e)}'}), 500

    try:
        # Preprocess image
        img = tf.keras.preprocessing.image.load_img(filepath, target_size=(128, 128))
        img_array = tf.keras.preprocessing.image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0  # Normalize

        # Run prediction
        prediction = model.predict(img_array)
        predicted_class = int(np.argmax(prediction, axis=1)[0])
        predicted_label = class_labels[predicted_class]
        confidence = float(np.max(prediction))

        logging.info(f'Prediction: {predicted_label} (index {predicted_class}) with confidence {confidence:.4f}')

        response = {
            'success': True,
            'prediction_index': predicted_class,
            'prediction_label': predicted_label,
            'confidence': confidence
        }

    except Exception as e:
        logging.error(f'Prediction error: {str(e)}')
        return jsonify({'success': False, 'error': f'Prediction error: {str(e)}'}), 500

    finally:
        # Clean up the uploaded file after processing
        try:
            os.remove(filepath)
            logging.info(f'Removed uploaded file: {filename}')
        except Exception as cleanup_err:
            logging.warning(f'Failed to remove uploaded file: {cleanup_err}')

    return jsonify(response), 200

# Health check
@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Flask server is healthy'}), 200

# Run app
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5003))
    app.run(debug=True, host='0.0.0.0', port=port)




#
# import os
# import logging
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from werkzeug.utils import secure_filename
# import tensorflow as tf
# import numpy as np
#
# # Initialize Flask app
# app = Flask(__name__)
# CORS(app)
#
# # Configuration
# UPLOAD_FOLDER = 'uploads'
# ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
# MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB
#
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# app.config['MAX_CONTENT_LENGTH'] = MAX_CONTENT_LENGTH
#
# # Ensure upload folder exists
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)
#
# # Setup logging
# logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
#
# # Load model
# try:
#     model = tf.keras.models.load_model('my_trained_model.h5')
#     logging.info('✅ Model loaded successfully')
# except Exception as e:
#     logging.error(f'❌ Failed to load model: {str(e)}')
#     raise
#
# # Class labels
# class_labels = [
#     'ECG Images of Myocardial Infarction Patients',
#     'ECG Images of Patient that have History of MI',
#     'ECG Images of Patient that have abnormal heartbeat',
#     'Normal Person ECG Images'
# ]
#
# # Helper: Check allowed file
# def allowed_file(filename):
#     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
#
# # Prediction endpoint
# @app.route('/api/ecg/predict', methods=['POST'])
# def predict():
#     # Validate file
#     if 'image' not in request.files:
#         logging.warning('No file part in request')
#         return jsonify({'success': False, 'error': 'No file part in the request'}), 400
#
#     file = request.files['image']
#     if file.filename == '':
#         logging.warning('Empty filename in upload')
#         return jsonify({'success': False, 'error': 'No selected file'}), 400
#
#     if not allowed_file(file.filename):
#         logging.warning(f'Invalid file type: {file.filename}')
#         return jsonify({'success': False, 'error': 'Invalid file type'}), 400
#
#     # Save image
#     filename = secure_filename(file.filename)
#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#     try:
#         file.save(filepath)
#         logging.info(f'File saved: {filename}')
#     except Exception as e:
#         logging.error(f'Failed to save file: {str(e)}')
#         return jsonify({'success': False, 'error': f'Failed to save file: {str(e)}'}), 500
#
#     # Get user details
#     name = request.form.get('patientName')  # instead of 'name'
#     email = request.form.get('email')
#     age = request.form.get('age')
#     contact_number = request.form.get('contactNumber')
#
#     if not all([name, email, age, contact_number]):
#         logging.warning('Missing user info in form data')
#         return jsonify({'success': False, 'error': 'Missing user details'}), 400
#
#     logging.info(f'Received user info: Name={name}, Email={email}, Age={age}, Contact No={contact_number}.')
#
#     try:
#         # Preprocess image
#         img = tf.keras.preprocessing.image.load_img(filepath, target_size=(128, 128))
#         img_array = tf.keras.preprocessing.image.img_to_array(img)
#         img_array = np.expand_dims(img_array, axis=0)
#         img_array = img_array / 255.0
#
#         # Predict
#         prediction = model.predict(img_array)
#         predicted_class = int(np.argmax(prediction, axis=1)[0])
#         predicted_label = class_labels[predicted_class]
#         confidence = float(np.max(prediction))
#
#         logging.info(f'Prediction: {predicted_label} (index {predicted_class}) with confidence {confidence:.4f}')
#
#         response = {
#             'success': True,
#             'message': 'Prediction and data saved successfully.',
#             'prediction_index': predicted_class,
#             'prediction_label': predicted_label,
#             'confidence': confidence
#         }
#
#     except Exception as e:
#         logging.error(f'Prediction error: {str(e)}')
#         return jsonify({'success': False, 'error': f'Prediction error: {str(e)}'}), 500
#
#     finally:
#         # Clean up
#         try:
#             os.remove(filepath)
#             logging.info(f'Removed uploaded file: {filename}')
#         except Exception as cleanup_err:
#             logging.warning(f'Failed to remove uploaded file: {cleanup_err}')
#
#     return jsonify(response), 200
#
# # Health check
# @app.route('/health', methods=['GET'])
# def health():
#     return jsonify({'status': 'ok', 'message': 'Flask server is healthy'}), 200
#
# # Run app
# if __name__ == '__main__':
#     port = int(os.environ.get('PORT', 5003))
#     app.run(debug=True, host='0.0.0.0', port=port)
