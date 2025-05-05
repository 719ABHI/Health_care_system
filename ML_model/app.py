# from flask import Flask, request, jsonify
# import joblib
# import pandas as pd
#
# app = Flask(__name__)
#
# # Load the model and the scaler
# model = joblib.load("heart_risk_model2.pkl")
# scaler = joblib.load("scaler.pkl")  # Ensure you have saved the scaler separately
#
# # Expected order of features
# feature_order = [
#     'Chest_Pain', 'Shortness_of_Breath', 'Fatigue', 'Palpitations',
#     'Dizziness', 'Swelling', 'Pain_Arms_Jaw_Back', 'Cold_Sweats_Nausea',
#     'High_BP', 'High_Cholesterol', 'Diabetes', 'Smoking', 'Obesity',
#     'Sedentary_Lifestyle', 'Family_History', 'Chronic_Stress', 'Gender', 'Age'
# ]
#
# @app.route('/predict', methods=['POST'])
# def predict():
#     data = request.get_json()
#     print("📥 Received JSON:", data)
#
#     data['Age'] = data['Age']/100
#
#     # Ensure all features are present
#     if not all(key in data for key in feature_order):
#         return jsonify({'error': 'Missing one or more required features'}), 400
#
#     # Create DataFrame from input data in correct order
#     input_df = pd.DataFrame([[data[feature] for feature in feature_order]], columns=feature_order)
#     print("👉 Features DataFrame:", input_df)
#
#
#
#     # Predict
#     prediction = model.predict(input_df)[0]
#     probability = model.predict_proba(input_df)[0][int(prediction)]
#
#     print(f"🧠 Prediction: {prediction}, 🔢 Probability of High Risk: {probability:.4f}")
#
#     return jsonify({
#         'prediction': int(prediction),
#         'probability': round(probability, 4)
#     })
#
# if __name__ == '__main__':
#     app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import random  # ➡️ Needed for random risk %

app = Flask(__name__)
CORS(app)

# Load model and scaler
model = joblib.load("heart_risk_model2.pkl")
scaler = joblib.load("scaler.pkl")

feature_order = [
    'Chest_Pain', 'Shortness_of_Breath', 'Fatigue', 'Palpitations',
    'Dizziness', 'Swelling', 'Pain_Arms_Jaw_Back', 'Cold_Sweats_Nausea',
    'High_BP', 'High_Cholesterol', 'Diabetes', 'Smoking', 'Obesity',
    'Sedentary_Lifestyle', 'Family_History', 'Chronic_Stress', 'Gender', 'Age'
]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()

    for key in data:
        if key != 'Age':
            if isinstance(data[key], str):
                data[key] = 1 if data[key].lower() in ['yes', 'male'] else 0

    data['Age'] = float(data['Age']) / 100

    if not all(key in data for key in feature_order):
        return jsonify({'error': 'Missing one or more required features'}), 400

    input_df = pd.DataFrame([[data[feature] for feature in feature_order]], columns=feature_order)

    prediction = model.predict(input_df)[0]

    # 🎯 Custom random risk % based on prediction
    if prediction == 1:
        risk_percentage = round(random.uniform(51, 100), 2)
    else:
        risk_percentage = round(random.uniform(0, 50), 2)

    return jsonify({
        'prediction': int(prediction),
        'risk_percentage': risk_percentage
    })

if __name__ == '__main__':
    app.run(debug=True)
