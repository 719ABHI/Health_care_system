
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
