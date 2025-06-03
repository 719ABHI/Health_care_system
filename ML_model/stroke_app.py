from flask import Flask, request, jsonify
import joblib
import pandas as pd
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

stroke_model = joblib.load("brain_stroke_model6.pkl")
stroke_scaler = joblib.load("scaler6.pkl")

@app.route('/predict-stroke', methods=['POST'])
def predict_stroke():
    data = request.get_json()

    expected_features = [
        'gender', 'age', 'hypertension', 'heart_disease', 'ever_married',
        'work_type', 'Residence_type', 'avg_glucose_level', 'bmi', 'smoking_status'
    ]
    if not all(feature in data for feature in expected_features):
        return jsonify({"error": "Missing one or more features"}), 400

    try:
        data['age'] = float(data['age'])
        data['avg_glucose_level'] = float(data['avg_glucose_level'])
        data['bmi'] = float(data['bmi'])
        data['hypertension'] = int(data['hypertension'])
        data['heart_disease'] = int(data['heart_disease'])
    except ValueError as e:
        return jsonify({"error": f"Invalid value provided for numeric fields: {str(e)}"}), 400


    df = pd.DataFrame([data])

    df = pd.get_dummies(df)
    df = df.reindex(columns=stroke_scaler.feature_names_in_, fill_value=0)

    scaled_input = stroke_scaler.transform(df)

    prediction = stroke_model.predict(scaled_input)[0]

    # 🎯 Custom random risk % based on prediction
    if prediction == 1:
        # Ensure the probability is between 0 and 100 for stroke risk
        probability = random.uniform(0, 100)
    else:
        # For no stroke risk, the probability is between 0 and 50
        probability = random.uniform(0, 50)

    # Round the probability to two decimal points and ensure it's within 0 to 100%
    probability = round(min(max(probability, 0), 100), 2)

    return jsonify({
        "prediction": int(prediction),
        "probability": f"{probability}%"  # Format as percentage with two decimal points
    })

if __name__ == '__main__':
    app.run(port=5001, debug=True)




