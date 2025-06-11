
// module.exports = router;
// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient');

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// // POST /api/ecg → Save patient details
// router.post('/', async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const newPatient = new EcgPatient({ patientName, email, age, contactNumber });
//     await newPatient.save();
//     res.status(201).json({ message: 'Patient details saved successfully.' });
//   } catch (err) {
//     console.error('Error saving patient details:', err);
//     res.status(500).json({ message: 'Error saving patient details.' });
//   }
// });

// // POST /api/ecg/predict → Forward image to Flask server for prediction
// router.post('/predict', upload.single('image'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded.' });
//   }

//   try {
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     const flaskResponse = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     });

//     res.json({
//       message: 'Prediction successful.',
//       prediction: flaskResponse.data.prediction,
//     });

//   } catch (err) {
//     console.error('Error communicating with Flask server:', err.message);
//     res.status(500).json({ message: 'Error during prediction.' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient');

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// // POST /api/ecg → Save patient details
// router.post('/', async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   try {
//     const newPatient = new EcgPatient({ patientName, email, age, contactNumber });
//     await newPatient.save();
//     res.status(201).json({ message: 'Patient details saved successfully.' });
//   } catch (err) {
//     console.error('Error saving patient details:', err);
//     res.status(500).json({ message: 'Error saving patient details.' });
//   }
// });

// // POST /api/ecg/predict → Forward image to Flask server for prediction
// router.post('/predict', upload.single('image'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded.' });
//   }

//   try {
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     const flaskResponse = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     });

//     if (!flaskResponse.data.prediction) {
//       return res.status(500).json({ message: 'Flask server did not return prediction.' });
//     }

//     res.json({
//       message: 'Prediction successful.',
//       prediction: flaskResponse.data.prediction,
//     });

//   } catch (err) {
//     console.error('Error communicating with Flask server:', err.message);
//     res.status(500).json({ message: 'Error during prediction. Flask server may be down.' });
//   }
// });

// module.exports = router;


// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient');

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// router.post('/', upload.single('image'), async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded.' });
//   }

//   try {
//     // Save patient details to MongoDB
//     const newPatient = new EcgPatient({ patientName, email, age, contactNumber });
//     await newPatient.save();

//     // Forward image to Flask server
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     const flaskResponse = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     });

//     if (!flaskResponse.data.prediction) {
//       return res.status(500).json({ message: 'Flask server did not return prediction.' });
//     }

//     res.json({
//       message: 'Patient saved and prediction successful.',
//       prediction: flaskResponse.data.prediction,
//     });

//   } catch (err) {
//     console.error('Error:', err.message);
//     res.status(500).json({ message: 'Error during submission or prediction.' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient');

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     if (!file.mimetype.startsWith('image/')) {
//       return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
//   }
// });

// router.post('/', upload.single('image'), async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ message: 'All fields are required.' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ message: 'No image uploaded.' });
//   }

//   try {
//     // Save patient details to MongoDB
//     const newPatient = new EcgPatient({ patientName, email, age, contactNumber });
//     await newPatient.save();
    
//     // Forward image to Flask server
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     const flaskResponse = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     }).catch(error => {
//       console.error('Error from Flask server:', error.response ? error.response.data : error.message);
//       return res.status(500).json({ message: 'Error from Flask server.' });
//     });

//     if (!flaskResponse.data.prediction) {
//       return res.status(500).json({ message: 'Flask server did not return prediction.' });
//     }

//     res.json({
//       message: 'Patient saved and prediction successful.',
//       prediction: flaskResponse.data.prediction,
//     });

//   } catch (err) {
//     console.error('Error:', err.message);
//     res.status(500).json({ message: 'Error during submission or prediction.' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient');

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// // POST /api/ecg/upload
// router.post('/ecg/upload', upload.single('image'), async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   if (!req.file) {
//     return res.status(400).json({ success: false, message: 'No image file uploaded.' });
//   }

//   try {
//     // Prepare the image file for Flask API
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     // Call Flask API for prediction
//     const flaskResponse = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//       maxContentLength: Infinity,
//       maxBodyLength: Infinity,
//     });

//     const { prediction_index, prediction_label, confidence } = flaskResponse.data;

//     // Save patient and prediction to MongoDB
//     const newPatient = new EcgPatient({
//       patientName,
//       email,
//       age,
//       contactNumber,
//       prediction_index,
//       prediction_label,
//       confidence,
//     });

//     await newPatient.save();

//     res.status(200).json({
//       success: true,
//       message: 'Patient and prediction stored successfully.',
//       prediction: { prediction_index, prediction_label, confidence }
//     });

//   } catch (err) {
//     console.error('Prediction upload error:', err.message);
//     res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
//   }
// });

// module.exports = router;




//image saving with details
// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient'); // Your Mongoose model

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/upload', upload.single('image'), async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   // Validate required fields
//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ success: false, message: 'Missing patient details.' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ success: false, message: 'No image uploaded.' });
//   }

//   const parsedAge = parseInt(age, 10);
//   if (isNaN(parsedAge)) {
//     return res.status(400).json({ success: false, message: 'Age must be a valid number.' });
//   }

//   try {
//     // Prepare form data to send to your Flask API
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     // Call Flask API for prediction
//     const flaskRes = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//     });

//     if (!flaskRes.data.success) {
//       return res.status(400).json({ success: false, message: 'Flask prediction failed', error: flaskRes.data.error });
//     }

//     const { prediction_index, prediction_label, confidence } = flaskRes.data;

//     // Save to MongoDB
//     const newPatient = new EcgPatient({
//       patientName,
//       email,
//       age: parsedAge,
//       contactNumber,
//       prediction_index,
//       prediction_label,
//       confidence,
//       image: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         originalName: req.file.originalname,
//       },
//     });

//     await newPatient.save();

//     res.status(200).json({
//       success: true,
//       message: `Patient data for '${patientName}' saved successfully with ECG prediction.`,
//       prediction: { prediction_index, prediction_label, confidence },
//     });
//   } catch (err) {
//     console.error('Upload error:', err.message);
//     res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
//   }
// });

// module.exports = router;








// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const FormData = require('form-data');
// const EcgPatient = require('../models/EcgPatient'); // Your Mongoose model

// const router = express.Router();
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// router.post('/upload', upload.single('image'), async (req, res) => {
//   const { patientName, email, age, contactNumber } = req.body;

//   // Validate required fields
//   if (!patientName || !email || !age || !contactNumber) {
//     return res.status(400).json({ success: false, message: 'Missing patient details.' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ success: false, message: 'No image uploaded.' });
//   }

//   const parsedAge = parseInt(age, 10);
//   if (isNaN(parsedAge)) {
//     return res.status(400).json({ success: false, message: 'Age must be a valid number.' });
//   }

//   try {
//     // Prepare form data to send to your Flask API
//     const formData = new FormData();
//     formData.append('image', req.file.buffer, {
//       filename: req.file.originalname,
//       contentType: req.file.mimetype,
//     });

//     // Call Flask API for prediction
//     const flaskRes = await axios.post('http://localhost:5003/api/ecg/predict', formData, {
//       headers: formData.getHeaders(),
//     });

//     if (!flaskRes.data.success) {
//       return res.status(400).json({ success: false, message: 'Flask prediction failed', error: flaskRes.data.error });
//     }

//     const { prediction_index, prediction_label, confidence } = flaskRes.data;

//     // Save to MongoDB
//     const newPatient = new EcgPatient({
//       patientName,
//       email,
//       age: parsedAge,
//       contactNumber,
//       prediction_index,
//       prediction_label,
//       confidence,
//       ecgImage: {
//         data: req.file.buffer,
//         contentType: req.file.mimetype,
//         filename: req.file.originalname,
//       },
//     });

//     await newPatient.save();

//     res.status(200).json({
//       success: true,
//       message: `Patient data for '${patientName}' saved successfully with ECG prediction.`,
//       prediction: { prediction_index, prediction_label, confidence },
//     });
//   } catch (err) {
//     console.error('Upload error:', err.message);
//     res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
//   }
// });

// module.exports = router;






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
