
// import React, { useState } from 'react';
// import './StrokePrediction.css';
// import brain from '../assets/brainicon.png';

// function StrokePrediction() {
//   const [formData, setFormData] = useState({
//     gender: '',
//     age: '',
//     hypertension: '',
//     heart_disease: '',
//     ever_married: '',
//     work_type: '',
//     Residence_type: '',
//     avg_glucose_level: '',
//     bmi: '',
//     smoking_status: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const mappedData = {
//       ...formData,
//       hypertension: formData.hypertension === 'Yes' ? 1 : 0,
//       heart_disease: formData.heart_disease === 'Yes' ? 1 : 0
//     };

//     try {
//       const response = await fetch("http://localhost:5001/predict-stroke", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(mappedData)
//       });

//       const result = await response.json();
//       console.log("🎯 Stroke Prediction Result:", result);

//       if (response.ok) {
//         setPrediction(result.prediction);

//         // Now store the prediction in the database
//         const predictionData = {
//           predictionType: "Brain Stroke",
//           dateTime: new Date().toLocaleString(),
//           result: result.prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk',
//           riskPercentage: result.prediction === 1 ? 85 : 0,
//           features: { ...formData }
//         };

//         // Send the data to the backend to save it in the database
//         const saveResponse = await fetch("http://localhost:5002/api/brain-stroke-history/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(predictionData)
//         });

//         if (saveResponse.ok) {
//           console.log('Prediction history saved to database');
//         } else {
//           const saveResult = await saveResponse.json();
//           setError(saveResult.error || 'Error saving the prediction history');
//         }

//       } else {
//         setError(result.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error("🚨 Error during stroke prediction:", error);
//       setError("Something went wrong with the prediction request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="stroke-container">
//       <img
//         src={brain}
//         alt="Brain Icon"
//         style={{
//           width: '60px',
//           height: '60px',
//           marginBottom: '10px',
//           display: 'block',
//           marginLeft: 'auto',
//           marginRight: 'auto'
//         }}
//       />
//       <h2>Brain Stroke Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {[ 
//           { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
//           { label: "Age", name: "age", type: "number", placeholder: "Enter Age" },
//           { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
//           { label: "Heart Disease", name: "heart_disease", type: "select", options: ["Yes", "No"] },
//           { label: "Ever Married", name: "ever_married", type: "select", options: ["Yes", "No"] },
//           { label: "Work Type", name: "work_type", type: "select", options: ["Private", "Self-employed", "Govt_job", "Children", "Never_worked"] },
//           { label: "Residence Type", name: "Residence_type", type: "select", options: ["Urban", "Rural"] },
//           { label: "Average Glucose Level", name: "avg_glucose_level", type: "number", placeholder: "e.g. 105.9" },
//           { label: "BMI", name: "bmi", type: "number", placeholder: "e.g. 24.5" },
//           { label: "Smoking Status", name: "smoking_status", type: "select", options: ["formerly smoked", "never smoked", "smokes", "Unknown"] }
//         ].map((field, idx) => (
//           <div className="form-group" key={idx}>
//             <label>{field.label}</label>
//             {field.type === "select" ? (
//               <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {field.options.map((opt, i) => (
//                   <option value={opt} key={i}>{opt}</option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 placeholder={field.placeholder}
//                 required
//               />
//             )}
//           </div>
//         ))}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Predicting...' : 'Predict Stroke'}
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {prediction !== null && !loading && (
//         <div>
//           <h3>Prediction Result:</h3>
//           <p>Stroke Prediction: {prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StrokePrediction;





// import React, { useState } from 'react';
// import './StrokePrediction.css';
// import brain from '../assets/brainicon.png';

// function StrokePrediction() {
//   const [formData, setFormData] = useState({
//     gender: '',
//     age: '',
//     hypertension: '',
//     heart_disease: '',
//     ever_married: '',
//     work_type: '',
//     Residence_type: '',
//     avg_glucose_level: '',
//     bmi: '',
//     smoking_status: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // Handle form submission and prediction logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const mappedData = {
//       ...formData,
//       hypertension: formData.hypertension === 'Yes' ? 1 : 0,
//       heart_disease: formData.heart_disease === 'Yes' ? 1 : 0,
//       ever_married: formData.ever_married === 'Yes' ? 1 : 0,
//       work_type: formData.work_type,
//       Residence_type: formData.Residence_type,
//       smoking_status: formData.smoking_status,
//     };

//     try {
//       // Send the input data to the backend for prediction
//       const response = await fetch("http://localhost:5001/predict-stroke", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(mappedData)
//       });

//       const result = await response.json();
//       console.log("🎯 Stroke Prediction Result:", result);

//       if (response.ok) {
//         setPrediction(result.prediction);

//         // Now store the prediction in the MongoDB database
//         const predictionData = {
//           predictionType: "Brain Stroke",
//           dateTime: new Date().toLocaleString(),
//           result: result.prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk',
//           riskPercentage: result.prediction === 1 ? 85 : 0,
//           features: { ...formData }
//         };

//         // Send the data to the backend to save it in MongoDB
//         const saveResponse = await fetch("http://localhost:5002/api/brain-stroke-history/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(predictionData)
//         });

//         if (saveResponse.ok) {
//           console.log('Prediction history saved to database');
//         } else {
//           const saveResult = await saveResponse.json();
//           setError(saveResult.error || 'Error saving the prediction history');
//         }

//       } else {
//         setError(result.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error("🚨 Error during stroke prediction:", error);
//       setError("Something went wrong with the prediction request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="stroke-container">
//       <img
//         src={brain}
//         alt="Brain Icon"
//         style={{
//           width: '60px',
//           height: '60px',
//           marginBottom: '10px',
//           display: 'block',
//           marginLeft: 'auto',
//           marginRight: 'auto'
//         }}
//       />
//       <h2>Brain Stroke Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {[ 
//           { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
//           { label: "Age", name: "age", type: "number", placeholder: "Enter Age" },
//           { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
//           { label: "Heart Disease", name: "heart_disease", type: "select", options: ["Yes", "No"] },
//           { label: "Ever Married", name: "ever_married", type: "select", options: ["Yes", "No"] },
//           { label: "Work Type", name: "work_type", type: "select", options: ["Private", "Self-employed", "Govt_job", "Children", "Never_worked"] },
//           { label: "Residence Type", name: "Residence_type", type: "select", options: ["Urban", "Rural"] },
//           { label: "Average Glucose Level", name: "avg_glucose_level", type: "number", placeholder: "e.g. 105.9" },
//           { label: "BMI", name: "bmi", type: "number", placeholder: "e.g. 24.5" },
//           { label: "Smoking Status", name: "smoking_status", type: "select", options: ["formerly smoked", "never smoked", "smokes", "Unknown"] }
//         ].map((field, idx) => (
//           <div className="form-group" key={idx}>
//             <label>{field.label}</label>
//             {field.type === "select" ? (
//               <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {field.options.map((opt, i) => (
//                   <option value={opt} key={i}>{opt}</option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 placeholder={field.placeholder}
//                 required
//               />
//             )}
//           </div>
//         ))}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Predicting...' : 'Predict Stroke'}
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {prediction !== null && !loading && (
//         <div>
//           <h3>Prediction Result:</h3>
//           <p>Stroke Prediction: {prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StrokePrediction;






// import React, { useState } from 'react';
// import './StrokePrediction.css';
// import brain from '../assets/brainicon.png';

// function StrokePrediction() {
//   const [formData, setFormData] = useState({
//     gender: '',
//     age: '',
//     hypertension: '',
//     heart_disease: '',
//     ever_married: '',
//     work_type: '',
//     Residence_type: '',
//     avg_glucose_level: '',
//     bmi: '',
//     smoking_status: ''
//   });

//   const [loading, setLoading] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);

//   // Handle form input changes
//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // Handle form submission and prediction logic
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     const convertedData = { ...formData };
//     const mappedData = {
//       ...formData,
//       hypertension: formData.hypertension === 'Yes' ? 1 : 0,
//       heart_disease: formData.heart_disease === 'Yes' ? 1 : 0,
//       ever_married: formData.ever_married === 'Yes' ? 1 : 0,
//       work_type: formData.work_type,
//       Residence_type: formData.Residence_type,
//       smoking_status: formData.smoking_status,
//     };

//     try {
//       // Send the input data to the backend for prediction
//       const response = await fetch("http://localhost:5001/predict-stroke", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(mappedData)
//       });

//       const result = await response.json();
//       console.log("🎯 Stroke Prediction Result:", result);

//       if (response.ok) {
//         setPrediction(result.prediction);

//         // Ensure email is available in localStorage
//         const storedEmail = localStorage.getItem('email');
//         if (!storedEmail) {
//           console.log('⚠️ No email found. Please log in.');
//           return;
//         }

//         const predictionData = {
//           email: storedEmail,
//           predictionType: 'Brain Stroke',
//           dateTime: new Date().toLocaleString(),
//           result: result.prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk',
//           riskPercentage: result.prediction === 1 ? 85 : 0,  // or use real risk %
//           features: convertedData,
//         };









//       // if (response.ok) {
//       //   setPrediction(result.prediction);

//       //   // Now store the prediction in the MongoDB database
//       //   const predictionData = {
//       //     predictionType: "Brain Stroke",
//       //     dateTime: new Date().toLocaleString(),
//       //     result: result.prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk',
//       //     riskPercentage: result.prediction === 1 ? 85 : 0,
//       //     features: { ...formData }
//       //   };

//         // Send the data to the backend to save it in MongoDB
//         const saveResponse = await fetch("http://localhost:5002/api/brain-stroke-history/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(predictionData)
//         });

//         if (saveResponse.ok) {
//           console.log('Prediction history saved to database');
//         } else {
//           const saveResult = await saveResponse.json();
//           setError(saveResult.error || 'Error saving the prediction history');
//         }

//       } else {
//         setError(result.error || 'Something went wrong');
//       }
//     } catch (error) {
//       console.error("🚨 Error during stroke prediction:", error);
//       setError("Something went wrong with the prediction request.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="stroke-container">
//       <img
//         src={brain}
//         alt="Brain Icon"
//         style={{
//           width: '60px',
//           height: '60px',
//           marginBottom: '10px',
//           display: 'block',
//           marginLeft: 'auto',
//           marginRight: 'auto'
//         }}
//       />
//       <h2>Brain Stroke Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {[ 
//           { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
//           { label: "Age", name: "age", type: "number", placeholder: "Enter Age" },
//           { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
//           { label: "Heart Disease", name: "heart_disease", type: "select", options: ["Yes", "No"] },
//           { label: "Ever Married", name: "ever_married", type: "select", options: ["Yes", "No"] },
//           { label: "Work Type", name: "work_type", type: "select", options: ["Private", "Self-employed", "Govt_job", "Children", "Never_worked"] },
//           { label: "Residence Type", name: "Residence_type", type: "select", options: ["Urban", "Rural"] },
//           { label: "Average Glucose Level", name: "avg_glucose_level", type: "number", placeholder: "e.g. 105.9" },
//           { label: "BMI", name: "bmi", type: "number", placeholder: "e.g. 24.5" },
//           { label: "Smoking Status", name: "smoking_status", type: "select", options: ["formerly smoked", "never smoked", "smokes", "Unknown"] }
//         ].map((field, idx) => (
//           <div className="form-group" key={idx}>
//             <label>{field.label}</label>
//             {field.type === "select" ? (
//               <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
//                 <option value="">Select</option>
//                 {field.options.map((opt, i) => (
//                   <option value={opt} key={i}>{opt}</option>
//                 ))}
//               </select>
//             ) : (
//               <input
//                 type={field.type}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 placeholder={field.placeholder}
//                 required
//               />
//             )}
//           </div>
//         ))}

//         <button type="submit" disabled={loading}>
//           {loading ? 'Predicting...' : 'Predict Stroke'}
//         </button>
//       </form>

//       {loading && <p>Loading...</p>}

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       {prediction !== null && !loading && (
//         <div>
//           <h3>Prediction Result:</h3>
//           <p>Stroke Prediction: {prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk'}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default StrokePrediction;












import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StrokePrediction.css';
import brain from '../assets/brainicon.png';

function StrokePrediction() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: ''
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [probability, setProbability] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const mappedData = {
      ...formData,
      hypertension: formData.hypertension === 'Yes' ? 1 : 0,
      heart_disease: formData.heart_disease === 'Yes' ? 1 : 0
    };

    try {
      const response = await fetch("http://localhost:5001/predict-stroke", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mappedData)
      });

      const result = await response.json();
      console.log("🎯 Stroke Prediction Result:", result);

      if (response.ok) {
        setPrediction(result.prediction);
        setProbability(result.probability);

        const storedEmail = localStorage.getItem('email');
        if (!storedEmail) {
          console.warn('⚠️ No email found in localStorage. Skipping DB save.');
          return;
        }

        const historyData = {
          email: storedEmail,
          predictionType: "Brain Stroke",
          dateTime: new Date().toLocaleString(),
          result: result.prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk',
          riskPercentage: result.probability, // use backend probability
          features: { ...formData }
        };

        const dbResponse = await fetch("http://localhost:5002/api/save", 
          {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(historyData)
        });

        const dbResult = await dbResponse.json();
        if (!dbResponse.ok) {
          setError(dbResult.error || 'Failed to save prediction to database');
        }

      } else {
        setError(result.error || 'Something went wrong during prediction');
      }
    } catch (error) {
      console.error("🚨 Error during stroke prediction:", error);
      setError("Something went wrong with the prediction request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stroke-container">
      <img
        src={brain}
        alt="Brain Icon"
        style={{
          width: '60px',
          height: '60px',
          marginBottom: '10px',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      />
      <h2>Brain Stroke Prediction</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Gender", name: "gender", type: "select", options: ["Male", "Female"] },
          { label: "Age", name: "age", type: "number", placeholder: "Enter Age" },
          { label: "Hypertension", name: "hypertension", type: "select", options: ["Yes", "No"] },
          { label: "Heart Disease", name: "heart_disease", type: "select", options: ["Yes", "No"] },
          { label: "Ever Married", name: "ever_married", type: "select", options: ["Yes", "No"] },
          { label: "Work Type", name: "work_type", type: "select", options: ["Private", "Self-employed", "Govt_job", "Children", "Never_worked"] },
          { label: "Residence Type", name: "Residence_type", type: "select", options: ["Urban", "Rural"] },
          { label: "Average Glucose Level", name: "avg_glucose_level", type: "number", placeholder: "e.g. 105.9" },
          { label: "BMI", name: "bmi", type: "number", placeholder: "e.g. 24.5" },
          { label: "Smoking Status", name: "smoking_status", type: "select", options: ["formerly smoked", "never smoked", "smokes", "Unknown"] }
        ].map((field, idx) => (
          <div className="form-group" key={idx}>
            <label>{field.label}</label>
            {field.type === "select" ? (
              <select name={field.name} value={formData[field.name]} onChange={handleChange} required>
                <option value="">Select</option>
                {field.options.map((opt, i) => (
                  <option value={opt} key={i}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Stroke'}
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {prediction !== null && !loading && (
        <div>
          <h3>Prediction Result:</h3>
          <p>Stroke Prediction: {prediction === 1 ? 'High Stroke Risk' : 'No Stroke Risk'}</p>
          
        </div>
      )}

      <button className="btn" onClick={() => navigate('/Treatment')}>
        View Treatment Advice
      </button>
    </div>
  );
}

export default StrokePrediction;



