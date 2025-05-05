import React, { useState } from 'react';
import './Treatment.css';

function ResultAdvice() {
  const [prediction, setPrediction] = useState('');
  const [condition, setCondition] = useState('Heart');
  const [result, setResult] = useState('');

  const handleCheck = () => {
    const input = prediction.toLowerCase();

    if (condition === 'Heart') {
      if (input.includes("low risk")) {
        setResult(`🟢 You have a low risk of heart disease. Keep up the good work!

🔹 Suggested Actions:
• Regular physical activity (30 mins daily)
• Maintain a balanced diet with low saturated fats
• Annual health checkups to monitor heart health
• Stay hydrated and get 7-8 hours of sleep daily

🔹 Prevention Tips:
• Avoid smoking and limit alcohol intake
• Manage stress with yoga, meditation, or hobbies
• Stay informed about your blood pressure and cholesterol levels`);
      } else if (input.includes("high risk")) {
        setResult(`🔴 Heart disease symptoms detected.

🔹 Suggested Actions:
• Visit a cardiologist immediately.
• Get an ECG, ECHO, and blood tests done.
• Monitor your blood pressure and cholesterol levels.

🔹 Lifestyle Changes:
• Adopt a low-sodium, heart-healthy diet.
• Engage in daily light exercises like walking or yoga.
• Quit smoking and avoid alcohol.
• Manage stress through meditation or counseling.

🔹 Medications:
Your doctor may prescribe:
• Beta-blockers
• Statins
• ACE inhibitors or Aspirin based on severity.`);
      } else {
        setResult("⚠️ Please enter a valid heart disease prediction (Low Risk / High Risk).");
      }
    } else if (condition === 'Brain') {
      if (input.includes("stroke")) {
        setResult(`🔴 You are at risk of Brain Stroke.

👉 Immediate Care:
• Seek emergency help immediately.
• Administer clot-busting medication (if ischemic, within 3-4.5 hours).

🧠 Medical Treatment:
• Use antiplatelet or anticoagulant medications.
• Manage BP, cholesterol, and blood sugar levels.

🧘 Rehabilitation:
• Start physical, occupational, and speech therapy early.
• Provide mental health support.

❤️ Prevention:
• Quit smoking and drinking.
• Eat a healthy diet (DASH/Mediterranean).
• Regular exercise and stress management.`);
      } else if (input.includes("no stroke")) {
        setResult(`🟢 Low Risk of Brain Stroke.

✅ Maintain a healthy lifestyle to reduce future risk:
• Follow a DASH or Mediterranean diet
• Exercise 30 mins/day
• No smoking or alcohol
• Keep BP, cholesterol & diabetes in check
• Practice stress-reducing activities like meditation`);
      } else {
        setResult("⚠️ Please enter a valid brain stroke prediction (Stroke / No Stroke).");
      }
    }
  };

  return (
    <div className="result-container">
      <h1>Prediction Result & Treatment Advice</h1>
      <select value={condition} onChange={(e) => setCondition(e.target.value)}>
        <option value="Heart">Heart Disease</option>
        <option value="Brain">Brain Stroke</option>
      </select>
      <input
        type="text"
        placeholder={`Enter your prediction (e.g., ${condition === 'Heart' ? 'Low Risk / High Risk' : 'Stroke / No Stroke'})`}
        value={prediction}
        onChange={(e) => setPrediction(e.target.value)}
      />
      <button onClick={handleCheck}>Show Advice</button>
      {result && <div className="result-box"><pre>{result}</pre></div>}
    </div>
  );
}

export default ResultAdvice;
