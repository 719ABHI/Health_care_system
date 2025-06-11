
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
//   const [imageFile, setImageFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [prediction, setPrediction] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Send patient details to backend (Node.js)
//       await axios.post('http://localhost:5002/api/ecg', formData);
//       setMessage('Patient details submitted successfully!');

//       // Send image to Flask model server (port 5003)
//       if (imageFile) {
//         const formDataToSend = new FormData();
//         formDataToSend.append('image', imageFile);

//         const response = await axios.post('http://localhost:5003/api/ecg/predict', formDataToSend, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });

//         // Handle prediction result
//         if (response.data.prediction_label) {
//           setPrediction(response.data.prediction_label);
//         } else {
//           setPrediction('Prediction data not available');
//         }
//       }

//       // Reset form
//       setFormData({ patientName: '', email: '', age: '', contactNumber: '' });
//       setImageFile(null);
//     } catch (err) {
//       console.error('Error during submission or prediction:', err);
//       setMessage('Error during submission or prediction. Try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div className="ecg-form-container">
//       <h2>ECG Patient Form</h2>
//       <form onSubmit={handleSubmitAndPredict}>
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

//         <div>
//           <label htmlFor="image">Upload ECG Image:</label>
//           <input
//             type="file"
//             id="image"
//             name="image"
//             accept="image/*"
//             onChange={handleFileChange}
//             required={!imageFile}  // Ensures file is required only if not already selected
//           />
//         </div>

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting and Predicting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {prediction && <p>Prediction: {prediction}</p>} {/* Display prediction result */}
//     </div>
//   );
// }

// export default HeartPredictionUsingEcg;



// import React, { useState } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);

//       if (imageFile) {
//         combinedFormData.append('image', imageFile);
//       } else {
//         setMessage('Please upload an ECG image.');
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5002/api/ecg', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.prediction) {
//         setPrediction(response.data.prediction);
//         setMessage(response.data.message || 'Prediction successful.');
//       } else {
//         setPrediction('No prediction returned.');
//         setMessage('Flask server did not return prediction.');
//       }

//       // Reset form
//       setFormData({
//         patientName: '',
//         email: '',
//         age: '',
//         contactNumber: '',
//       });
//       setImageFile(null);

//     } catch (err) {
//       console.error('Error submitting patient details:', err);
//       setMessage('Error during submission or prediction. Please try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {prediction && (
//         <div>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;






// import React, { useState } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);

//       if (imageFile) {
//         combinedFormData.append('image', imageFile);
//       } else {
//         setMessage('Please upload an ECG image.');
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5002/api/ecg', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.prediction_label && response.data.confidence !== undefined) {
//         setPrediction(
//           `${response.data.prediction_label} (Confidence: ${(response.data.confidence * 100).toFixed(2)}%)`
//         );
//         setMessage('Prediction successful.');
//       } else {
//         setPrediction('No prediction returned.');
//         setMessage('Flask server did not return prediction.');
//       }

//       // Reset form
//       setFormData({
//         patientName: '',
//         email: '',
//         age: '',
//         contactNumber: '',
//       });
//       setImageFile(null);

//     } catch (err) {
//       console.error('Error submitting patient details:', err);
//       setMessage('Error during submission or prediction. Please try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {prediction && (
//         <div>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;






// import React, { useState } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);

//       if (imageFile) {
//         combinedFormData.append('image', imageFile);
//       } else {
//         setMessage('Please upload an ECG image.');
//         setIsSubmitting(false);
//         return;
//       }

//       // Update the URL to match Flask's port (5003)
//       const response = await axios.post('http://localhost:5003/api/ecg/predict', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.prediction_label && response.data.confidence !== undefined) {
//         setPrediction(
//           `${response.data.prediction_label}`
//         );
//         setMessage('Prediction successful.');
//       } else {
//         setPrediction('No prediction returned.');
//         setMessage('Flask server did not return prediction.');
//       }

//       // Reset form
//       setFormData({
//         patientName: '',
//         email: '',
//         age: '',
//         contactNumber: '',
//       });
//       setImageFile(null);

//     } catch (err) {
//       console.error('Error submitting patient details:', err);
//       setMessage('Error during submission or prediction. Please try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form className='form' onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {prediction && (
//         <div className='form'>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;







// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef(null); // ref for file input

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber } = formData;
//     if (isNaN(age) || age <= 0) {
//       setMessage('Age must be a valid positive number.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(contactNumber)) {
//       setMessage('Contact number must be 10 digits.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);

//       if (imageFile) {
//         combinedFormData.append('image', imageFile);
//       } else {
//         setMessage('Please upload an ECG image.');
//         setIsSubmitting(false);
//         return;
//       }

//       const response = await axios.post('http://localhost:5003/api/ecg/predict', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // if (response.data.prediction_label && response.data.confidence !== undefined) {
//       //   setPrediction(`${response.data.prediction_label}`);
//       //   setMessage('Prediction successful.');
//       // } else {
//       //   setPrediction('No prediction returned.');
//       //   setMessage('Flask server did not return prediction.');
//       // }

//       if (response.data.message === 'Prediction and data saved successfully.') {
//   setPrediction(`${response.data.prediction_label}`);
//   setMessage(`Details saved successfully.\nPrediction: ${response.data.prediction_label}`);
// } else {
//   setPrediction('No prediction returned.');
//   setMessage('Failed to save details or make prediction.');
// }

//       // Reset form
//       setFormData({
//         patientName: '',
//         email: '',
//         age: '',
//         contactNumber: '',
//       });
//       setImageFile(null);
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }

//     } catch (err) {
//       console.error('Error submitting patient details:', err);
//       setMessage(err.response?.data?.message || 'Error during submission or prediction. Please try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form className='form' onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting || !imageFile}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p>{message}</p>}
//       {prediction && (
//         <div className='form'>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;






// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber } = formData;
//     if (isNaN(age) || age <= 0) {
//       setMessage('Age must be a valid positive number.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(contactNumber)) {
//       setMessage('Contact number must be 10 digits.');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     if (!imageFile) {
//       setMessage('Please upload an ECG image.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       console.log('Submitting data:', formData);
//       console.log('Submitting image file:', imageFile);

//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);
//       combinedFormData.append('image', imageFile);

//       const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Response from backend:', response.data);

//       if (response.data.success) {
//         setPrediction(`Prediction: ${response.data.prediction.prediction_label}`);
//         setMessage(response.data.message);
//         // Reset form
//         setFormData({
//           patientName: '',
//           email: '',
//           age: '',
//           contactNumber: '',
//         });
//         setImageFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       } else {
//         setMessage('Failed to save details or get prediction.');
//       }
//     } catch (err) {
//       console.error('Error submitting patient details:', err);
//       setMessage(err.response?.data?.message || 'Error during submission or prediction. Please try again.');
//     }

//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form className='form' onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//             maxLength="10"
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p style={{ whiteSpace: 'pre-line' }}>{message}</p>}
//       {prediction && (
//         <div className='form'>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;












// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const storedEmail = localStorage.getItem('email') || '';

//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: storedEmail,
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber } = formData;
//     if (isNaN(age) || age <= 0) {
//       setMessage('Age must be a valid positive number.');
//       return false;
//     }
//     if (!/^\d{10}$/.test(contactNumber)) {
//       setMessage('Contact number must be exactly 10 digits.');
//       return false;
//     }
//     return true;
//   };

//   const fetchHistory = async (email) => {
//     try {
//       const encodedEmail = encodeURIComponent(email);
//       const res = await fetch(`http://localhost:5002/api/history/${encodedEmail}`);
//       const data = await res.json();
//       setHistoryData(data);
//     } catch (err) {
//       console.error("Error fetching history:", err);
//     }
//   };

//   useEffect(() => {
//     if (storedEmail) {
//       fetchHistory(storedEmail);
//     }
//   }, [storedEmail]);

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     if (!imageFile) {
//       setMessage('Please upload an ECG image.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);
//       combinedFormData.append('image', imageFile);

//       const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         setPrediction(`Prediction: ${response.data.prediction.prediction_label}`);
//         setMessage(response.data.message);
//         fetchHistory(formData.email); // Fetch updated history

//         setFormData((prev) => ({
//           ...prev,
//           patientName: '',
//           age: '',
//           contactNumber: '',
//         }));
//         setImageFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       } else {
//         setMessage('Failed to save details or get prediction.');
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error during submission or prediction. Please try again.');
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input type="number" name="age" value={formData.age} onChange={handleChange} required min="1" />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required maxLength="10" />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} required />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p style={{ whiteSpace: 'pre-line', marginTop: '1rem' }}>{message}</p>}
//       {prediction && (
//         <div style={{ marginTop: '1rem' }}>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}

//       {historyData.length > 0 && (
//         <div style={{ marginTop: '2rem' }}>
//           <h3>Prediction History</h3>
//           <ul>
//             {historyData.map((item, index) => (
//               <li key={index}>
//                 {item.patientName} | Age: {item.age} | Result: {item.prediction} | Uploaded: {new Date(item.timestamp).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;








// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const storedEmail = localStorage.getItem('email') || '';

//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: storedEmail,
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setMessage('');
//     setPrediction('');
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber, email, patientName } = formData;

//     if (!patientName.trim()) {
//       setMessage('Patient Name is required.');
//       return false;
//     }

//     if (!email.trim()) {
//       setMessage('Email is required.');
//       return false;
//     }

//     if (isNaN(age) || age <= 0) {
//       setMessage('Age must be a valid positive number.');
//       return false;
//     }

//     if (!/^\d{10}$/.test(contactNumber)) {
//       setMessage('Contact number must be exactly 10 digits.');
//       return false;
//     }

//     return true;
//   };

//   const fetchHistory = async (email) => {
//     if (!email) {
//       setHistoryData([]);
//       return;
//     }

//     try {
//       const encodedEmail = encodeURIComponent(email);
//       const res = await fetch(`http://localhost:5002/api/ecg/history/${encodedEmail}`);
//       const data = await res.json();

//       if (res.ok && data.success) {
//         setHistoryData(data.history);
//         setMessage('');
//       } else {
//         setHistoryData([]);
//         setMessage(data.message || 'No history found for this email.');
//       }
//     } catch (err) {
//       console.error("Error fetching history:", err);
//       setMessage('Failed to fetch history.');
//       setHistoryData([]);
//     }
//   };

//   useEffect(() => {
//     fetchHistory(formData.email);
//   }, [formData.email]);

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     if (!imageFile) {
//       setMessage('Please upload an ECG image.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);
//       combinedFormData.append('image', imageFile);

//       const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         const pred = response.data.prediction;
//         setPrediction(`Prediction: ${pred.prediction_label} (Confidence: ${(pred.confidence * 100).toFixed(2)}%)`);
//         setMessage(response.data.message);
//         fetchHistory(formData.email); // Refresh history

//         // Reset form
//         setFormData({
//           patientName: '',
//           email: storedEmail,
//           age: '',
//           contactNumber: '',
//         });
//         setImageFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       } else {
//         setMessage('Failed to save details or get prediction.');
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error during submission or prediction. Please try again.');
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//             maxLength="10"
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p style={{ whiteSpace: 'pre-line', marginTop: '1rem', color: 'red' }}>{message}</p>}

//       {prediction && (
//         <div style={{ marginTop: '1rem' }}>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}

//       {historyData.length > 0 ? (
//         <div style={{ marginTop: '2rem' }}>
//           <h3>Prediction History</h3>
//           <ul>
//             {historyData.map((item, index) => (
//               <li key={index}>
//                 {item.patientName} | Age: {item.age} | Result: {item.prediction_label} | Uploaded:{' '}
//                 {new Date(item.createdAt || item.timestamp).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         formData.email && (
//           <p style={{ marginTop: '2rem' }}>
//             No history found for email: <strong>{formData.email}</strong>
//           </p>
//         )
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;







// import React, { useState, useRef } from 'react';
// import axios from 'axios';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//     setMessage('');
//     setPrediction('');
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber, email, patientName } = formData;

//     if (!patientName.trim()) {
//       setMessage('Patient Name is required.');
//       return false;
//     }

//     if (!email.trim()) {
//       setMessage('Email is required.');
//       return false;
//     }

//     if (isNaN(age) || age <= 0) {
//       setMessage('Age must be a valid positive number.');
//       return false;
//     }

//     if (!/^\d{10}$/.test(contactNumber)) {
//       setMessage('Contact number must be exactly 10 digits.');
//       return false;
//     }

//     return true;
//   };

//   const fetchHistory = async (email) => {
//     try {
//       const encodedEmail = encodeURIComponent(email);
//       const res = await fetch(`http://localhost:5002/api/ecg/history/${encodedEmail}`);
//       const data = await res.json();

//       if (res.ok && data.success) {
//         setHistoryData(data.history);
//         setMessage('');
//       } else {
//         setHistoryData([]);
//         setMessage(data.message || 'No history found for this email.');
//       }
//     } catch (err) {
//       console.error("Error fetching history:", err);
//       setMessage('Failed to fetch history.');
//       setHistoryData([]);
//     }
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');
//     setHistoryData([]);

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     if (!imageFile) {
//       setMessage('Please upload an ECG image.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const combinedFormData = new FormData();
//       combinedFormData.append('patientName', formData.patientName);
//       combinedFormData.append('email', formData.email);
//       combinedFormData.append('age', formData.age);
//       combinedFormData.append('contactNumber', formData.contactNumber);
//       combinedFormData.append('image', imageFile);

//       const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.success) {
//         const pred = response.data.prediction;
//         setPrediction(`Prediction: ${pred.prediction_label} (Confidence: ${(pred.confidence * 100).toFixed(2)}%)`);
//         setMessage(response.data.message);
//         fetchHistory(formData.email); // Fetch history after prediction

//         // Reset form
//         setFormData({
//           patientName: '',
//           email: '',
//           age: '',
//           contactNumber: '',
//         });
//         setImageFile(null);
//         if (fileInputRef.current) {
//           fileInputRef.current.value = '';
//         }
//       } else {
//         setMessage('Failed to save details or get prediction.');
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error during submission or prediction. Please try again.');
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Prediction Using ECG</h2>
//       <form onSubmit={handleSubmitAndPredict}>
//         <div>
//           <label>Patient Name:</label>
//           <input
//             type="text"
//             name="patientName"
//             value={formData.patientName}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Age:</label>
//           <input
//             type="number"
//             name="age"
//             value={formData.age}
//             onChange={handleChange}
//             required
//             min="1"
//           />
//         </div>
//         <div>
//           <label>Contact Number:</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//             maxLength="10"
//           />
//         </div>
//         <div>
//           <label>Upload ECG Image:</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             ref={fileInputRef}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       {message && <p style={{ whiteSpace: 'pre-line', marginTop: '1rem', color: 'red' }}>{message}</p>}

//       {prediction && (
//         <div style={{ marginTop: '1rem' }}>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}

//       {historyData.length > 0 && (
//         <div style={{ marginTop: '2rem' }}>
//           <h3>Prediction History</h3>
//           <ul>
//             {historyData.map((item, index) => (
//               <li key={index}>
//                 {item.patientName} | Age: {item.age} | Result: {item.prediction_label} | Uploaded:{' '}
//                 {new Date(item.createdAt || item.timestamp).toLocaleString()}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;





// import React, { useState, useRef } from 'react';
// import axios from 'axios';
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   CartesianGrid, ResponsiveContainer, Legend
// } from 'recharts';

// const HeartPredictionUsingEcg = () => {
//   const [formData, setFormData] = useState({
//     patientName: '',
//     email: '',
//     age: '',
//     contactNumber: '',
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [prediction, setPrediction] = useState('');
//   const [message, setMessage] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [historyData, setHistoryData] = useState([]);
//   const fileInputRef = useRef(null);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setMessage('');
//     setPrediction('');
//   };

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const validateForm = () => {
//     const { age, contactNumber, email, patientName } = formData;
//     if (!patientName.trim()) return setMessage('Patient Name is required.');
//     if (!email.trim()) return setMessage('Email is required.');
//     if (isNaN(age) || age <= 0) return setMessage('Age must be a valid positive number.');
//     if (!/^\d{10}$/.test(contactNumber)) return setMessage('Contact number must be 10 digits.');
//     return true;
//   };

//   const fetchHistory = async () => {
//     try {
//       const email = formData.email.trim();
//       if (!email) return setMessage('Please enter an email to fetch history.');
//       const res = await axios.get(`http://localhost:5002/api/ecg/history/${encodeURIComponent(email)}`);
//       const data = res.data;

//       if (res.status === 200 && data.success) {
//         setHistoryData(data.history);
//         setMessage('');
//       } else {
//         setHistoryData([]);
//         setMessage(data.message || 'No history found.');
//       }
//     } catch (err) {
//       console.error("Error fetching history:", err);
//       setMessage('Error fetching history.');
//       setHistoryData([]);
//     }
//   };

//   const handleSubmitAndPredict = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setMessage('');
//     setPrediction('');
//     setHistoryData([]);

//     if (!validateForm()) {
//       setIsSubmitting(false);
//       return;
//     }

//     if (!imageFile) {
//       setMessage('Please upload an ECG image.');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const combinedFormData = new FormData();
//       Object.entries(formData).forEach(([key, value]) => {
//         combinedFormData.append(key, value);
//       });
//       combinedFormData.append('image', imageFile);

//       const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData);

//       if (response.data.success) {
//         const pred = response.data.prediction;
//         setPrediction(`Prediction: ${pred.prediction_label} (Confidence: ${(pred.confidence * 100).toFixed(2)}%)`);
//         setMessage(response.data.message);
//         fetchHistory();

//         // Reset form
//         setFormData({ patientName: '', email: '', age: '', contactNumber: '' });
//         setImageFile(null);
//         if (fileInputRef.current) fileInputRef.current.value = '';
//       } else {
//         setMessage('Failed to save details or get prediction.');
//       }
//     } catch (err) {
//       console.error("Error during submission:", err);
//       setMessage(err.response?.data?.message || 'Error during submission.');
//     }
//     setIsSubmitting(false);
//   };

//   // Convert history to prediction frequency
//   const getPredictionChartData = () => {
//     const counts = {};
//     historyData.forEach(item => {
//       const label = item.prediction_label;
//       counts[label] = (counts[label] || 0) + 1;
//     });

//     return Object.entries(counts).map(([label, count]) => ({
//       prediction: label,
//       count,
//     }));
//   };

//   return (
//     <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
//       <h2>Heart Disease Prediction Using ECG</h2>

//       <form onSubmit={handleSubmitAndPredict} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
//         <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
//         <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
//         <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
//         </button>
//       </form>

//       <button onClick={fetchHistory} style={{ marginTop: '10px' }}>
//         View History
//       </button>

//       {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}

//       {prediction && (
//         <div style={{ marginTop: '20px' }}>
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}

//       {historyData.length > 0 && (
//         <div style={{ marginTop: '30px' }}>
//           <h3>Prediction History</h3>
//           <table border="1" cellPadding="8">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Patient</th>
//                 <th>Age</th>
//                 <th>Prediction</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {historyData.map((item, i) => (
//                 <tr key={i}>
//                   <td>{i + 1}</td>
//                   <td>{item.patientName}</td>
//                   <td>{item.age}</td>
//                   <td>{item.prediction_label}</td>
//                   <td>{new Date(item.createdAt || item.timestamp).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <h3 style={{ marginTop: '30px' }}>Prediction Frequency Chart</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={getPredictionChartData()}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="prediction" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="count" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HeartPredictionUsingEcg;



import React, { useState, useRef } from 'react';
import axios from 'axios';
import ecgnew from '../assets/ecgnew.png';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';
import './HeartPredictionUsingEcg.css';

const HeartPredictionUsingEcg = () => {

    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    age: '',
    contactNumber: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setMessage('');
    setPrediction('');
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const validateForm = () => {
    const { age, contactNumber, email, patientName } = formData;
    if (!patientName.trim()) return setMessage('Patient Name is required.');
    if (!email.trim()) return setMessage('Email is required.');
    if (isNaN(age) || age <= 0) return setMessage('Age must be a valid positive number.');
    if (!/^\d{10}$/.test(contactNumber)) return setMessage('Contact number must be 10 digits.');
    return true;
  };

  const fetchHistory = async () => {
    try {
      const email = formData.email.trim();
      if (!email) return setMessage('Please enter an email to fetch history.');
      const res = await axios.get(`http://localhost:5002/api/ecg/history/${encodeURIComponent(email)}`);
      const data = res.data;

      if (res.status === 200 && data.success) {
        setHistoryData(data.history);
        setMessage('');
      } else {
        setHistoryData([]);
        setMessage(data.message || 'No history found.');
      }
    } catch (err) {
      console.error("Error fetching history:", err);
      setMessage('Error fetching history.');
      setHistoryData([]);
    }
  };

  const handleSubmitAndPredict = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');
    setPrediction('');
    setHistoryData([]);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    if (!imageFile) {
      setMessage('Please upload an ECG image.');
      setIsSubmitting(false);
      return;
    }

    try {
      const combinedFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        combinedFormData.append(key, value);
      });
      combinedFormData.append('image', imageFile);

      const response = await axios.post('http://localhost:5002/api/ecg/upload', combinedFormData);

      if (response.data.success) {
        const pred = response.data.prediction;
        setPrediction(`Prediction: ${pred.prediction_label} (Confidence: ${(pred.confidence * 100).toFixed(2)}%)`);
        setMessage(response.data.message);
        fetchHistory();

        setFormData({ patientName: '', email: '', age: '', contactNumber: '' });
        setImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setMessage('Failed to save details or get prediction.');
      }
    } catch (err) {
      console.error("Error during submission:", err);
      setMessage(err.response?.data?.message || 'Error during submission.');
    }
    setIsSubmitting(false);
  };

  const getPredictionChartData = () => {
    const counts = {};
    historyData.forEach(item => {
      const label = item.prediction_label;
      counts[label] = (counts[label] || 0) + 1;
    });

    return Object.entries(counts).map(([label, count]) => ({
      prediction: label,
      count,
    }));
  };

  return (
    <div className="ecg-container">
      <div className="form-box">
        <h1>Heart Disease Prediction Using ECG</h1>
          <img src={ecgnew} alt="ECG visualization" />
        <form onSubmit={handleSubmitAndPredict} className="ecg-form">
          <input type="text" name="patientName" placeholder="Patient Name" value={formData.patientName} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
          <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
          <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit and Predict'}
          </button>
        </form>

        <button onClick={fetchHistory} className="history-btn">View History</button>

        {message && <p className="message">{message}</p>}

        {prediction && (
          <div className="ecg-result success">
            <h3>Prediction Result</h3>
            <p>{prediction}</p>
          </div>
        )}

        {historyData.length > 0 && (
          <div className="history-section">
            <h3>Prediction History</h3>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient</th>
                  <th>Age</th>
                  <th>Prediction</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.patientName}</td>
                    <td>{item.age}</td>
                    <td>{item.prediction_label}</td>
                    <td>{new Date(item.createdAt || item.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 style={{ marginTop: '30px' }}>Prediction Frequency Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getPredictionChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="prediction" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#2c86e0" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <button className="btn" onClick={() => navigate('/Treatment')}>
        View Treatment Advice
      </button>
    </div>
  );
};

export default HeartPredictionUsingEcg;
