
// import React, { useState } from 'react';
// import './HeartPredictionUsingEcg.css';
// import axios from 'axios';

// function HeartPredictionUsingEcg() {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: ''
//   });
//   const [imageFile, setImageFile] = useState(null); // Store the uploaded image
//   const [message, setMessage] = useState('');
//   const [prediction, setPrediction] = useState('');

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]); // Get the selected file
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send patient details to backend
//       await axios.post('http://localhost:5002/api/ecg', formData);
//       setMessage('Patient details submitted successfully!');

//       // Reset form data
//       setFormData({ patientName: '', email: '', age: '', contactNumber: '' });
//     } catch (err) {
//       console.error('Submission error:', err);
//       setMessage('Error submitting details. Try again.');
//     }
//   };

//   const handlePredict = async () => {
//     const formDataToSend = new FormData();
//     formDataToSend.append('image', imageFile);

//     try {
//       const response = await axios.post('http://localhost:5002/api/ecg/predict', formDataToSend, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setPrediction(response.data.prediction); // Show the prediction result
//     } catch (err) {
//       console.error('Error during prediction:', err);
//       setPrediction('Error predicting disease.');
//     }
//   };

//   return (
//     <div className="ecg-form-container">
//       <h2>ECG Patient Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="patientName">Patient Name:</label>
//           <input
//             type="text"
//             id="patientName"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="age">Age:</label>
//           <input
//             type="number"
//             id="age"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="contactNumber">Contact Number:</label>
//           <input
//             type="tel"
//             id="contactNumber"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button type="submit">Submit Patient Details</button>
//       </form>

//       {message && <p>{message}</p>}

//       {/* Upload image */}
//       <div>
//         <label htmlFor="image">Upload ECG Image:</label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept="image/*"
//           onChange={handleFileChange}
//           required
//         />
//       </div>

//       {/* Predict button */}
//       {imageFile && (
//         <button onClick={handlePredict}>Predict Disease</button>
//       )}

//       {/* Display prediction result */}
//       {prediction && <p>Prediction: {prediction}</p>}
//     </div>
//   );
// }

// export default HeartPredictionUsingEcg;

import React, { useState } from 'react';
import './HeartPredictionUsingEcg.css';
import axios from 'axios';

function HeartPredictionUsingEcg() {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    age: '',
    contactNumber: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmitAndPredict = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send patient details to backend (Node.js)
      await axios.post('http://localhost:5002/api/ecg', formData);
      setMessage('Patient details submitted successfully!');

      // Send image to Flask model server (port 5003)
      if (imageFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('image', imageFile);

        const response = await axios.post('http://localhost:5003/api/ecg/predict', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Handle prediction result
        if (response.data.prediction_label) {
          setPrediction(response.data.prediction_label);
        } else {
          setPrediction('Prediction data not available');
        }
      }

      // Reset form
      setFormData({ patientName: '', email: '', age: '', contactNumber: '' });
      setImageFile(null);
    } catch (err) {
      console.error('Error during submission or prediction:', err);
      setMessage('Error during submission or prediction. Try again.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="ecg-form-container">
      <h2>ECG Patient Form</h2>
      <form onSubmit={handleSubmitAndPredict}>
        <div>
          <label htmlFor="patientName">Patient Name:</label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="contactNumber">Contact Number:</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="image">Upload ECG Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            required={!imageFile}  // Ensures file is required only if not already selected
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting and Predicting...' : 'Submit and Predict'}
        </button>
      </form>

      {message && <p>{message}</p>}
      {prediction && <p>Prediction: {prediction}</p>} {/* Display prediction result */}
    </div>
  );
}

export default HeartPredictionUsingEcg;
