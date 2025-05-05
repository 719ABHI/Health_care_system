// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HeartPrediction.css';
// import heart from '../assets/hearticon.png';

// function HeartPrediction() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Chest_Pain: '',
//     Shortness_of_Breath: '',
//     Fatigue: '',
//     Palpitations: '',
//     Dizziness: '',
//     Swelling: '',
//     Pain_Arms_Jaw_Back: '',
//     Cold_Sweats_Nausea: '',
//     High_BP: '',
//     High_Cholesterol: '',
//     Diabetes: '',
//     Smoking: '',
//     Obesity: '',
//     Sedentary_Lifestyle: '',
//     Family_History: '',
//     Chronic_Stress: '',
//     Gender: '',
//     Age: ''
//   });

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Submitted heart disease data:', formData);
//     // Place your ML prediction API call here
//     // After prediction you can navigate to treatment
//     navigate('/Treatment');
//   };

//   return (
//     <div className="heart-container">
//       <img
//         src={heart}
//         alt="Heart Icon"
//         style={{
//           width: '60px',
//           height: '60px',
//           marginBottom: '10px',
//           display: 'block',
//           marginLeft: 'auto',
//           marginRight: 'auto'
//         }}
//       />
//       <h2>Heart Disease Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {Object.entries(formData).map(([key, value]) => (
//           <div className="form-group" key={key}>
//             <label>{key.replace(/_/g, ' ')}</label>
//             {key === 'Age' ? (
//               <input
//                 type="number"
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="Enter Age"
//                 required
//               />
//             ) : key === 'Gender' ? (
//               <select name={key} value={value} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <select name={key} value={value} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             )}
//           </div>
//         ))}
//         <button type="submit">Predict Heart Disease</button>
//       </form>

//       {/* Optional direct link to treatment page */}
//       <button className="treatment-btn" onClick={() => navigate('/Treatment')}>
//         View Treatment Advice
//       </button>
//     </div>
//   );
// }

// export default HeartPrediction;








// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './HeartPrediction.css';
// import heart from '../assets/hearticon.png';

// function HeartPrediction() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     Chest_Pain: '',
//     Shortness_of_Breath: '',
//     Fatigue: '',
//     Palpitations: '',
//     Dizziness: '',
//     Swelling: '',
//     Pain_Arms_Jaw_Back: '',
//     Cold_Sweats_Nausea: '',
//     High_BP: '',
//     High_Cholesterol: '',
//     Diabetes: '',
//     Smoking: '',
//     Obesity: '',
//     Sedentary_Lifestyle: '',
//     Family_History: '',
//     Chronic_Stress: '',
//     Gender: '',
//     Age: ''
//   });

//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     // Convert formData to expected format
//     const convertedData = { ...formData };

//     Object.keys(convertedData).forEach((key) => {
//       if (convertedData[key] === 'Yes') convertedData[key] = 1;
//       else if (convertedData[key] === 'No') convertedData[key] = 0;
//       else if (key === 'Gender') {
//         convertedData[key] = convertedData[key] === 'Male' ? 1 : 0;
//       } else if (key === 'Age') {
//         convertedData[key] = Number(convertedData[key]); // Already numeric
//       }
//     });

//     try {
//       const res = await fetch('http://localhost:5000/predict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(convertedData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setPrediction(data.prediction);

//         // Save prediction to localStorage
//         const currentHistory = JSON.parse(localStorage.getItem('predictionHistory')) || [];
//         const newEntry = {
//           predictionType: 'Heart Disease',
//           dateTime: new Date().toLocaleString(),
//           result: data.prediction === 1 ? 'Risk' : 'No Risk',
//           riskPercentage: data.prediction === 1 ? 85 : 0,
//           features: convertedData, // Save the input features
//         };
//         currentHistory.push(newEntry);
//         localStorage.setItem('predictionHistory', JSON.stringify(currentHistory));
//       } else {
//         alert('Prediction failed!');
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="heart-container">
//       <img
//         src={heart}
//         alt="Heart Icon"
//         style={{
//           width: '60px',
//           height: '60px',
//           marginBottom: '10px',
//           display: 'block',
//           marginLeft: 'auto',
//           marginRight: 'auto'
//         }}
//       />
//       <h2>Heart Disease Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {Object.entries(formData).map(([key, value]) => (
//           <div className="form-group" key={key}>
//             <label>{key.replace(/_/g, ' ')}</label>
//             {key === 'Age' ? (
//               <input
//                 type="number"
//                 name={key}
//                 value={value}
//                 onChange={handleChange}
//                 placeholder="Enter Age"
//                 required
//               />
//             ) : key === 'Gender' ? (
//               <select name={key} value={value} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <select name={key} value={value} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//             )}
//           </div>
//         ))}
//         <button type="submit">Predict Heart Disease</button>
//       </form>
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {prediction !== null && (
//         <div className="result">
//           <h3>Prediction Result:</h3>
//           <p>
//             {prediction === 1
//               ? '⚠️ You might be at risk of heart disease. Please consult a doctor.'
//               : '✅ You are not at risk of heart disease based on current inputs.'}
//           </p>
//         </div>
//       )}

//       <button className="treatment-btn" onClick={() => navigate('/Treatment')}>
//         View Treatment Advice
//       </button>
//     </div>
//   );
// }

// export default HeartPrediction;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeartPrediction.css';
import heart from '../assets/hearticon.png';

function HeartPrediction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Chest_Pain: '',
    Shortness_of_Breath: '',
    Fatigue: '',
    Palpitations: '',
    Dizziness: '',
    Swelling: '',
    Pain_Arms_Jaw_Back: '',
    Cold_Sweats_Nausea: '',
    High_BP: '',
    High_Cholesterol: '',
    Diabetes: '',
    Smoking: '',
    Obesity: '',
    Sedentary_Lifestyle: '',
    Family_History: '',
    Chronic_Stress: '',
    Gender: '',
    Age: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [historyStatus, setHistoryStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    for (let key in formData) {
      if (!formData[key]) {
        setError(`Please fill all fields.`);
        return;
      }
    }

    setLoading(true);
    setError(null);
    setHistoryStatus(null);

    const convertedData = { ...formData };
    Object.keys(convertedData).forEach((key) => {
      if (convertedData[key] === 'Yes') convertedData[key] = 1;
      else if (convertedData[key] === 'No') convertedData[key] = 0;
      else if (key === 'Gender') {
        convertedData[key] = convertedData[key] === 'Male' ? 1 : 0;
      } else if (key === 'Age') {
        convertedData[key] = Number(convertedData[key]);
      }
    });

    try {
      // Step 1: Send prediction request
      const res = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(convertedData),
      });

      const data = await res.json();

      if (res.ok) {
        setPrediction(data.prediction);

        // Step 2: Save prediction history
        const historyData = {
          predictionType: 'Heart Disease',
          dateTime: new Date().toLocaleString(),
          result: data.prediction === 1 ? 'Risk' : 'No Risk',
          riskPercentage: data.prediction === 1 ? 85 : 0, // Example value
          features: convertedData,
        };

        const historyRes = await fetch('http://localhost:5002/api/history', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(historyData),
        });

        if (historyRes.ok) {
          setHistoryStatus('✅ Prediction history saved successfully.');
        } else {
          setHistoryStatus('⚠️ Prediction made, but failed to save history.');
        }

      } else {
        setError('Prediction failed! Please try again.');
      }

    } catch (err) {
      console.error('Error:', err);
      setError('Server error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="heart-container">
      <img
        src={heart}
        alt="Heart Icon"
        style={{
          width: '60px',
          height: '60px',
          marginBottom: '10px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
      <h2>Heart Disease Prediction</h2>

      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label>{key.replace(/_/g, ' ')}</label>
            {key === 'Age' ? (
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                placeholder="Enter Age"
                required
              />
            ) : key === 'Gender' ? (
              <select name={key} value={value} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <select name={key} value={value} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            )}
          </div>
        ))}
        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Heart Disease'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction !== null && (
        <div className="result">
          <h3>Prediction Result:</h3>
          <p>
            {prediction === 1
              ? '⚠️ You might be at risk of heart disease. Please consult a doctor.'
              : '✅ You are not at risk of heart disease based on current inputs.'}
          </p>
        </div>
      )}

      {historyStatus && (
        <p style={{ marginTop: '10px', color: historyStatus.includes('✅') ? 'green' : 'orange' }}>
          {historyStatus}
        </p>
      )}

      <button className="treatment-btn" onClick={() => navigate('/Treatment')}>
        View Treatment Advice
      </button>
    </div>
  );
}

export default HeartPrediction;






