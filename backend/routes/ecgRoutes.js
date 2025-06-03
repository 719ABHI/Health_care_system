
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const EcgPatient = require('../models/EcgPatient');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST route to upload ECG image + patient info + get prediction from Flask API
router.post('/upload', upload.single('image'), async (req, res) => {
  const { patientName, email, age, contactNumber } = req.body;

  if (!patientName || !email || !age || !contactNumber) {
    return res.status(400).json({ success: false, message: 'Missing patient details.' });
  }

  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image uploaded.' });
  }

  const parsedAge = parseInt(age, 10);
  if (isNaN(parsedAge)) {
    return res.status(400).json({ success: false, message: 'Age must be a valid number.' });
  }

  try {
    const formData = new FormData();
    formData.append('image', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const flaskRes = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
      headers: formData.getHeaders(),
    });

    if (!flaskRes.data.success) {
      return res.status(400).json({ success: false, message: 'Flask prediction failed', error: flaskRes.data.error });
    }

    const { prediction_index, prediction_label, confidence } = flaskRes.data;

    const newPatient = new EcgPatient({
      patientName,
      email,
      age: parsedAge,
      contactNumber,
      prediction_index,
      prediction_label,
      confidence,
      ecgImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        filename: req.file.originalname,
      },
    });

    await newPatient.save();

    res.status(200).json({
      success: true,
      message: `Patient data for '${patientName}' saved successfully with ECG prediction.`,
      prediction: { prediction_index, prediction_label, confidence },
    });
  } catch (err) {
    console.error('Upload error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
});

// GET route to fetch ECG prediction history by patient email
router.get('/history/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Exclude raw image buffer to reduce payload size
    const history = await EcgPatient.find({ email }).select('-ecgImage.data');

    if (!history.length) {
      return res.status(404).json({ success: false, message: 'No history found for this patient.' });
    }

    res.status(200).json({ success: true, history });
  } catch (err) {
    console.error('History fetch error:', err.message);
    res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
  }
});

module.exports = router;
