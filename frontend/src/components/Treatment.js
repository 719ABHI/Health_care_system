<<<<<<< HEAD
=======
// import React, { useState } from 'react';
// import './Treatment.css';

// function ResultAdvice() {
//   const [prediction, setPrediction] = useState('');
//   const [condition, setCondition] = useState('Heart');
//   const [result, setResult] = useState('');

//   const handleCheck = () => {
//     const input = prediction.toLowerCase();

//     if (condition === 'Heart') {
//       if (input.includes("low risk")) {
//         setResult(`🟢 You have a low risk of heart disease. Keep up the good work!

// 🔹 Suggested Actions:
// • Regular physical activity (30 mins daily)
// • Maintain a balanced diet with low saturated fats
// • Annual health checkups to monitor heart health
// • Stay hydrated and get 7-8 hours of sleep daily

// 🔹 Prevention Tips:
// • Avoid smoking and limit alcohol intake
// • Manage stress with yoga, meditation, or hobbies
// • Stay informed about your blood pressure and cholesterol levels`);
//       } else if (input.includes("high risk")) {
//         setResult(`🔴 Heart disease symptoms detected.

// 🔹 Suggested Actions:
// • Visit a cardiologist immediately.
// • Get an ECG, ECHO, and blood tests done.
// • Monitor your blood pressure and cholesterol levels.

// 🔹 Lifestyle Changes:
// • Adopt a low-sodium, heart-healthy diet.
// • Engage in daily light exercises like walking or yoga.
// • Quit smoking and avoid alcohol.
// • Manage stress through meditation or counseling.

// 🔹 Medications:
// Your doctor may prescribe:
// • Beta-blockers
// • Statins
// • ACE inhibitors or Aspirin based on severity.`);
//       } else {
//         setResult("⚠️ Please enter a valid heart disease prediction (Low Risk / High Risk).");
//       }
//     } else if (condition === 'Brain') {
//       if (input.includes("stroke")) {
//         setResult(`🔴 You are at risk of Brain Stroke.

// 👉 Immediate Care:
// • Seek emergency help immediately.
// • Administer clot-busting medication (if ischemic, within 3-4.5 hours).

// 🧠 Medical Treatment:
// • Use antiplatelet or anticoagulant medications.
// • Manage BP, cholesterol, and blood sugar levels.

// 🧘 Rehabilitation:
// • Start physical, occupational, and speech therapy early.
// • Provide mental health support.

// ❤️ Prevention:
// • Quit smoking and drinking.
// • Eat a healthy diet (DASH/Mediterranean).
// • Regular exercise and stress management.`);
//       } else if (input.includes("no stroke")) {
//         setResult(`🟢 Low Risk of Brain Stroke.

// ✅ Maintain a healthy lifestyle to reduce future risk:
// • Follow a DASH or Mediterranean diet
// • Exercise 30 mins/day
// • No smoking or alcohol
// • Keep BP, cholesterol & diabetes in check
// • Practice stress-reducing activities like meditation`);
//       } else {
//         setResult("⚠️ Please enter a valid brain stroke prediction (Stroke / No Stroke).");
//       }
//     }
//   };

//   return (
//     <div className="result-container">
//       <h1>Prediction Result & Treatment Advice</h1>
//       <select value={condition} onChange={(e) => setCondition(e.target.value)}>
//         <option value="Heart">Heart Disease</option>
//         <option value="Brain">Brain Stroke</option>
//       </select>
//       <input
//         type="text"
//         placeholder={`Enter your prediction (e.g., ${condition === 'Heart' ? 'Low Risk / High Risk' : 'Stroke / No Stroke'})`}
//         value={prediction}
//         onChange={(e) => setPrediction(e.target.value)}
//       />
//       <button onClick={handleCheck}>Show Advice</button>
//       {result && <div className="result-box"><pre>{result}</pre></div>}
//     </div>
//   );
// }

// export default ResultAdvice;





>>>>>>> f6e849ecb10cb4e3f37623b96e4bcb69a48f135f

import React, { useState } from 'react';
import './Treatment.css';

function ResultAdvice() {
  const [condition, setCondition] = useState('Heart');
  const [prediction, setPrediction] = useState('');
  const [result, setResult] = useState('');

  const predictionOptions = {
    Heart: ['Low Risk', 'High Risk'],
    Brain: ['Stroke', 'No Stroke'],
    ECG: ['Myocardial Infarction', 'Abnormal Heartbeat', 'History of MI', 'Normal Person'],
  };

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
        setResult("⚠ Please select a valid heart disease prediction.");
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

❤ Prevention:
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
        setResult("⚠ Please select a valid brain stroke prediction.");
      }
    } else if (condition === 'ECG') {
      if (input.includes("myocardial infarction")) {
        setResult(`🔴 You are showing signs of **Myocardial Infarction (Heart Attack)**.

🚑 Immediate Actions:
• Seek emergency care immediately.
• Administer aspirin if not allergic.
• Ensure oxygen support and monitor vitals.

🩺 Treatment:
• Coronary angioplasty or bypass surgery.
• Medications like antiplatelets, beta-blockers, ACE inhibitors.

❤️ Lifestyle Post-Recovery:
• Strict low-fat, low-sodium diet.
• Cardiac rehabilitation program.
• Avoid stress and heavy exertion.`);
      } else if (input.includes("abnormal heartbeat")) {
        setResult(`🟠 Abnormal Heartbeat (Arrhythmia) Detected.

🔍 Recommended Steps:
• Consult a cardiologist.
• Get an ECG, Holter monitoring, and echocardiogram.

💊 Treatments:
• Antiarrhythmic drugs or beta-blockers.
• Pacemaker or ablation therapy in severe cases.

🏃‍♂️ Lifestyle:
• Avoid caffeine and alcohol.
• Get enough sleep and manage stress.`);
      } else if (input.includes("history of mi")) {
        setResult(`🟡 You have a **history of Myocardial Infarction**.

🩺 Ongoing Management:
• Continue prescribed medications (e.g., statins, ACE inhibitors).
• Attend regular cardiac check-ups.

💪 Prevent Recurrence:
• Maintain a heart-healthy diet.
• Exercise moderately (consult your doctor).
• Monitor BP, cholesterol, and glucose levels closely.

🧠 Emotional Wellness:
• Join a cardiac support group or talk to a counselor.`);
      } else if (input.includes("normal")) {
        setResult(`🟢 You are a healthy individual with no signs of heart disease.

🔹 Maintenance Tips:
• Continue regular check-ups.
• Eat a heart-healthy diet (fruits, vegetables, whole grains).
• Maintain regular physical activity.
• Avoid smoking and limit alcohol.

🧘 Keep managing stress for long-term wellness.`);
      } else {
        setResult("⚠ Please select a valid ECG prediction.");
      }
    }
  };

  return (
    <div className="result-container">
      <h1>Prediction Result & Treatment Advice</h1>

      <label htmlFor="condition">Select Disease Type:</label>
      <select id="condition" value={condition} onChange={(e) => {
        setCondition(e.target.value);
        setPrediction('');
      }}>
        <option value="Heart">Heart Disease</option>
        <option value="Brain">Brain Stroke</option>
        <option value="ECG">ECG Heart Disease</option>
      </select>

      <label htmlFor="prediction">Select Prediction:</label>
      <select id="prediction" value={prediction} onChange={(e) => setPrediction(e.target.value)}>
        <option value="">-- Select Prediction --</option>
        {predictionOptions[condition].map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>

      <button onClick={handleCheck}>Show Advice</button>

      {result && <div className="result-box"><pre>{result}</pre></div>}
    </div>
  );
}

export default ResultAdvice;





// import React, { useState } from 'react';
// import './Treatment.css';

// function ResultAdvice() {
//   const [prediction, setPrediction] = useState('');
//   const [condition, setCondition] = useState('Heart');
//   const [result, setResult] = useState('');

//   const handleCheck = () => {
//     const input = prediction.toLowerCase();

//     if (condition === 'Heart') {
//       if (input.includes("low risk")) {
//         setResult(`🟢 You have a low risk of heart disease. Keep up the good work!

// 🔹 Suggested Actions:
// • Regular physical activity (30 mins daily)
// • Maintain a balanced diet with low saturated fats
// • Annual health checkups to monitor heart health
// • Stay hydrated and get 7-8 hours of sleep daily

// 🔹 Prevention Tips:
// • Avoid smoking and limit alcohol intake
// • Manage stress with yoga, meditation, or hobbies
// • Stay informed about your blood pressure and cholesterol levels`);
//       } else if (input.includes("high risk")) {
//         setResult(`🔴 Heart disease symptoms detected.

// 🔹 Suggested Actions:
// • Visit a cardiologist immediately.
// • Get an ECG, ECHO, and blood tests done.
// • Monitor your blood pressure and cholesterol levels.

// 🔹 Lifestyle Changes:
// • Adopt a low-sodium, heart-healthy diet.
// • Engage in daily light exercises like walking or yoga.
// • Quit smoking and avoid alcohol.
// • Manage stress through meditation or counseling.

// 🔹 Medications:
// Your doctor may prescribe:
// • Beta-blockers
// • Statins
// • ACE inhibitors or Aspirin based on severity.`);
//       } else {
//         setResult("⚠ Please enter a valid heart disease prediction (Low Risk / High Risk).");
//       }
//     } else if (condition === 'Brain') {
//       if (input.includes("stroke")) {
//         setResult(`🔴 You are at risk of Brain Stroke.

// 👉 Immediate Care:
// • Seek emergency help immediately.
// • Administer clot-busting medication (if ischemic, within 3-4.5 hours).

// 🧠 Medical Treatment:
// • Use antiplatelet or anticoagulant medications.
// • Manage BP, cholesterol, and blood sugar levels.

// 🧘 Rehabilitation:
// • Start physical, occupational, and speech therapy early.
// • Provide mental health support.

// ❤ Prevention:
// • Quit smoking and drinking.
// • Eat a healthy diet (DASH/Mediterranean).
// • Regular exercise and stress management.`);
//       } else if (input.includes("no stroke")) {
//         setResult(`🟢 Low Risk of Brain Stroke.

// ✅ Maintain a healthy lifestyle to reduce future risk:
// • Follow a DASH or Mediterranean diet
// • Exercise 30 mins/day
// • No smoking or alcohol
// • Keep BP, cholesterol & diabetes in check
// • Practice stress-reducing activities like meditation`);
//       } else {
//         setResult("⚠ Please enter a valid brain stroke prediction (Stroke / No Stroke).");
//       }
//     } else if (condition === 'ECG') {
//       if (input.includes("myocardial infarction")) {
//         setResult(`🔴 You are showing signs of *Myocardial Infarction (Heart Attack)*.

// 🚑 Immediate Actions:
// • Seek emergency care immediately.
// • Administer aspirin if not allergic.
// • Ensure oxygen support and monitor vitals.

// 🩺 Treatment:
// • Coronary angioplasty or bypass surgery.
// • Medications like antiplatelets, beta-blockers, ACE inhibitors.

// ❤ Lifestyle Post-Recovery:
// • Strict low-fat, low-sodium diet.
// • Cardiac rehabilitation program.
// • Avoid stress and heavy exertion.`);
//       } else if (input.includes("abnormal heartbeat")) {
//         setResult(`🟠 Abnormal Heartbeat (Arrhythmia) Detected.

// 🔍 Recommended Steps:
// • Consult a cardiologist.
// • Get an ECG, Holter monitoring, and echocardiogram.

// 💊 Treatments:
// • Antiarrhythmic drugs or beta-blockers.
// • Pacemaker or ablation therapy in severe cases.

// 🏃‍♂ Lifestyle:
// • Avoid caffeine and alcohol.
// • Get enough sleep and manage stress.`);
//       } else if (input.includes("history of mi")) {
//         setResult(`🟡 You have a *history of Myocardial Infarction*.

// 🩺 Ongoing Management:
// • Continue prescribed medications (e.g., statins, ACE inhibitors).
// • Attend regular cardiac check-ups.

// 💪 Prevent Recurrence:
// • Maintain a heart-healthy diet.
// • Exercise moderately (consult your doctor).
// • Monitor BP, cholesterol, and glucose levels closely.

// 🧠 Emotional Wellness:
// • Join a cardiac support group or talk to a counselor.`);
//       } else if (input.includes("normal")) {
//         setResult(`🟢 You are a healthy individual with no signs of heart disease.

// 🔹 Maintenance Tips:
// • Continue regular check-ups.
// • Eat a heart-healthy diet (fruits, vegetables, whole grains).
// • Maintain regular physical activity.
// • Avoid smoking and limit alcohol.

// 🧘 Keep managing stress for long-term wellness.`);
//       } else {
//         setResult("⚠ Please enter a valid ECG prediction (Myocardial Infarction, Abnormal Heartbeat, History of MI, Normal Person).");
//       }
//     }
//   };

//   return (
//     <div className="result-container">
//       <h1>Prediction Result & Treatment Advice</h1>
//       <select value={condition} onChange={(e) => setCondition(e.target.value)}>
//         <option value="Heart">Heart Disease</option>
//         <option value="Brain">Brain Stroke</option>
//         <option value="ECG">ECG Heart Disease</option>
//       </select>
//       <input
//         type="text"
//         placeholder={`Enter your prediction (e.g., ${
//           condition === 'Heart'
//             ? 'Low Risk / High Risk'
//             : condition === 'Brain'
//             ? 'Stroke / No Stroke'
//             : 'Myocardial Infarction / Abnormal Heartbeat / History of MI / Normal Person'
//         })`}
//         value={prediction}
//         onChange={(e) => setPrediction(e.target.value)}
//       />
//       <button onClick={handleCheck}>Show Advice</button>
//       {result && <div className="result-box"><pre>{result}</pre></div>}
//     </div>
//   );
// }

// export default ResultAdvice;
