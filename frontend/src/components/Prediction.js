// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Prediction.css';
// import human from '../assets/human.png';

// function Prediction() {
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedPrediction, setSelectedPrediction] = useState('');
//   const [formData, setFormData] = useState({ name: '', age: '', phone: '', email: '' });

//   const handlePredictionClick = (type) => {
//     setSelectedPrediction(type);
//     setShowForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Navigate based on prediction type
//     if (selectedPrediction === 'heart') {
//       navigate('/heart', { state: { ...formData, predictionType: 'Heart' } });
//     } else if (selectedPrediction === 'stroke') {
//       navigate('/stroke', { state: { ...formData, predictionType: 'Stroke' } });
//     }
//   };

//   return (
//     <div className="prediction-container">
//       <h2>Choose a Prediction Type</h2>
//       <div className="prediction-options">
//         <button onClick={() => handlePredictionClick('heart')}>Heart Disease Prediction</button>
//         <button onClick={() => handlePredictionClick('stroke')}>Brain Stroke Prediction</button>
//       </div>

//       {showForm && (
//         <form className="popup-form" onSubmit={handleSubmit}>
//           <img
//             src={human}
//             alt="Profile Icon"
//             style={{
//               width: '60px',
//               height: '60px',
//               marginBottom: '10px',
//               display: 'block',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//             }}
//           />

//           <h3>Fill Profile Info</h3>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//           <label>Age:</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required />

//           <label>Phone No:</label>
//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//           <button type="submit">Continue to Prediction</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Prediction;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Prediction.css';

// function Prediction() {
//   const navigate = useNavigate();

//   const handlePredictionClick = (type) => {
//     if (type === 'heart') {
//       navigate('/heart');
//     } else if (type === 'stroke') {
//       navigate('/stroke');
//     } else if (type === 'eegstroke') {
//       navigate('/eegstroke');
//     } else if (type === 'ecgheart') {
//       navigate('/ecg'); // Navigate to ECG form page when this button is clicked
//     }
//   };

//   return (
//     <div className="prediction-container">
//       <h2>Choose a Prediction Type</h2>
//       <div className="prediction-options">
//         <button onClick={() => handlePredictionClick('heart')}>Heart Disease Prediction</button>
//         <button onClick={() => handlePredictionClick('stroke')}>Brain Stroke Prediction</button>
//         <button onClick={() => handlePredictionClick('eegstroke')}>Brain Stroke Prediction using EEG data</button>
//         <button onClick={() => handlePredictionClick('ecgheart')}>Heart Disease Prediction using ECG data</button>
//       </div>
//     </div>
//   );
// }

// export default Prediction;




// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Prediction.css';
// import human from '../assets/human.png';

// function Prediction() {
//   const navigate = useNavigate();
//   const [showForm, setShowForm] = useState(false);
//   const [selectedPrediction, setSelectedPrediction] = useState('');
//   const [formData, setFormData] = useState({ name: '', age: '', phone: '', email: '' });

//   const handlePredictionClick = (type) => {
//     setSelectedPrediction(type);
//     setShowForm(true);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Navigate based on prediction type
//     if (selectedPrediction === 'heart') {
//       navigate('/heart', { state: { ...formData, predictionType: 'Heart' } });
//     } else if (selectedPrediction === 'stroke') {
//       navigate('/stroke', { state: { ...formData, predictionType: 'Stroke' } });
//     }
//   };

//   return (
//     <div className="prediction-container">
//       <h2>Choose a Prediction Type</h2>
//       <div className="prediction-options">
//         <button onClick={() => handlePredictionClick('heart')}>Heart Disease Prediction</button>
//         <button onClick={() => handlePredictionClick('stroke')}>Brain Stroke Prediction</button>
//       </div>

//       {showForm && (
//         <form className="popup-form" onSubmit={handleSubmit}>
//           <img
//             src={human}
//             alt="Profile Icon"
//             style={{
//               width: '60px',
//               height: '60px',
//               marginBottom: '10px',
//               display: 'block',
//               marginLeft: 'auto',
//               marginRight: 'auto',
//             }}
//           />

//           <h3>Fill Profile Info</h3>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} required />

//           <label>Age:</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required />

//           <label>Phone No:</label>
//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />

//           <button type="submit">Continue to Prediction</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default Prediction;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Prediction.css';

// ✅ Import images properly
import HeartImg from '../assets/Heart2.png';
import BrainImg from '../assets/Brain2.png';

import ECGImg from '../assets/ECG.png';

function Prediction() {
  const navigate = useNavigate();

  const handlePredictionClick = (type) => {
    if (type === 'heart') {
      navigate('/heart');
    } else if (type === 'stroke') {
      navigate('/stroke');
    } else if (type === 'eegstroke') {
      navigate('/eegstroke');
    } else if (type === 'ecgheart') {
      navigate('/ecg');
    }
  };

  return (
    <div className="prediction-container">
      <h2>Choose a Prediction Type</h2>
      <div className="prediction-options">
        <button onClick={() => handlePredictionClick('heart')}>
          <img src={HeartImg} alt="Heart" />
          <span>Heart Disease Prediction</span>
        </button>
        <button onClick={() => handlePredictionClick('stroke')}>
          <img src={BrainImg} alt="Stroke" />
          <span>Brain Stroke Prediction</span>
        </button>
        
        <button onClick={() => handlePredictionClick('ecgheart')}>
          <img src={ECGImg} alt="ECG" />
          <span>ECG-based Heart Prediction</span>
        </button>
      </div>
    </div>
  );
}

export default Prediction;