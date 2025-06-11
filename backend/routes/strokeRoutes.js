
// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser'); // Adjust path to the correct model

// // Dummy stroke prediction function (replace with real model later)
// function predictStroke(features) {
//   const riskScore = Math.random();
//   const result = riskScore > 0.5 ? 'Risk' : 'No Risk';
//   const riskPercentage = Math.round(riskScore * 100);
//   return { result, riskPercentage };
// }

// // POST /api/history/stroke → Make stroke prediction + save history
// router.post('/stroke', async (req, res) => {
//   const {
//     gender,
//     age,
//     hypertension,
//     heart_disease,
//     ever_married,
//     work_type,
//     Residence_type,
//     avg_glucose_level,
//     bmi,
//     smoking_status
//   } = req.body;

//   // Retrieve email from session (adjust this based on your auth system, for example, JWT or session)
//   const email = req.session?.userEmail; // Assuming you're using session-based email storage, modify if using tokens

//   // If email is not available, return an error
//   if (!email) {
//     return res.status(400).json({ error: 'Email is required for saving history' });
//   }

//   // Validate required fields
//   if (
//     gender === undefined ||
//     age === undefined ||
//     hypertension === undefined ||
//     heart_disease === undefined ||
//     ever_married === undefined ||
//     work_type === undefined ||
//     Residence_type === undefined ||
//     avg_glucose_level === undefined ||
//     bmi === undefined ||
//     smoking_status === undefined
//   ) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }

//   try {
//     // Construct input features object (excluding email)
//     const inputFeatures = {
//       gender,
//       age,
//       hypertension,
//       heart_disease,
//       ever_married,
//       work_type,
//       Residence_type,
//       avg_glucose_level,
//       bmi,
//       smoking_status
//     };

//     // Run prediction (replace with actual model logic later)
//     const { result, riskPercentage } = predictStroke(inputFeatures);

//     // Create history entry aligned with the HistoryOfUser schema
//     const newHistory = new HistoryOfUser({
//       email,
//       predictionType: 'Stroke',
//       dateTime: new Date().toLocaleString(),
//       result,
//       riskPercentage,
//       features: inputFeatures
//     });

//     // Save to database
//     await newHistory.save();

//     res.status(201).json({
//       message: 'Stroke prediction completed and history saved successfully',
//       prediction: result,
//       riskPercentage
//     });
//   } catch (error) {
//     console.error('Error saving stroke prediction history:', error);
//     res.status(500).json({ error: 'Error saving stroke prediction history', details: error.message });
//   }
// });

// // GET /api/history → Fetch history for a user (or all if no email)
// router.get('/history', async (req, res) => {
//   const { email } = req.query;

//   try {
//     let histories;
//     if (email) {
//       histories = await HistoryOfUser.find({ email });
//     } else {
//       histories = await HistoryOfUser.find(); // For admin or testing
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const StrokePredictionHistory = require('../models/strokePredictionHistory');

// // Save stroke prediction history
// router.post('/', async (req, res) => {
//   console.log('Helo world!');
  
//   const { email, predictionType, dateTime, result, riskPercentage, features = {}, precaution = '' } = req.body;

//   if (!email || !predictionType || !dateTime || !result || riskPercentage === undefined) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }

//   try {
//     const newHistory = new StrokePredictionHistory({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//       precaution,
//     });

//     await newHistory.save();
//     res.status(201).json({ message: '✅ Stroke prediction history saved successfully' });
//   } catch (error) {
//     console.error('❌ Error saving stroke prediction history:', error);
//     res.status(500).json({ error: 'Error saving stroke prediction history', details: error.message });
//   }
// });

// // Fetch stroke prediction history (all or by email)
// router.get('/', async (req, res) => {
//   const { email } = req.query;

//   try {
//     const histories = email
//       ? await StrokePredictionHistory.find({ email }).lean()
//       : await StrokePredictionHistory.find().lean();

//     if (email && histories.length === 0) {
//       return res.status(404).json({ message: `No history found for email: ${email}` });
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('❌ Error fetching stroke prediction history:', error);
//     res.status(500).json({ error: 'Error fetching stroke prediction history', details: error.message });
//   }
// });

// // Get a single record by ID
// ;

// module.exports = router;




const express = require('express');
const router = express.Router();
const StrokePredictionHistory = require('../models/strokePredictionHistory');

// POST /api/stroke-history → Save stroke prediction history (no duplicate check, allows multiple entries per email)
router.post('/', async (req, res) => {
  const { email, predictionType, dateTime, result, riskPercentage, features, precaution } = req.body;

  // Validate required fields
  if (!email || !predictionType || !dateTime || !result || riskPercentage === undefined) {
    return res.status(400).json({ error: 'Missing required fields: email, predictionType, dateTime, result, riskPercentage' });
  }

  try {
    const newHistory = new StrokePredictionHistory({
      email,
      predictionType,
      dateTime,
      result,
      riskPercentage,
      features: features || {}, // Ensure it's at least an empty object
      precaution: precaution || '', // Default to empty string if not provided
    });

    await newHistory.save();
    res.status(201).json({ message: '✅ Stroke prediction history saved successfully' });
  } catch (error) {
    console.error('❌ Error saving stroke prediction history:', error);
    res.status(500).json({ error: 'Error saving stroke prediction history', details: error.message });
  }
});

// GET /api/stroke-history?email=someone@example.com → Fetch stroke history by email (or all if no email)
router.get('/', async (req, res) => {
  const email = req.query.email;
  console.log('📥 Received email query at stroke:', email);

  try {
    let histories;
    if (email) {
      histories = await StrokePredictionHistory.find({ email }).lean();
      if (histories.length === 0) {
        return res.status(404).json({ message: `No stroke history found for email: ${email}` });
      }
    } else {
      histories = await StrokePredictionHistory.find().lean();
    }

    res.status(200).json(histories);
  } catch (error) {
    console.error('❌ Error fetching stroke prediction history:', error);
    res.status(500).json({ error: 'Error fetching stroke prediction history', details: error.message });
  }
});

module.exports = router;
