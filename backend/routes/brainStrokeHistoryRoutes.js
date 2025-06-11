
// const express = require('express');
// const router = express.Router();
// const BrainStrokeHistory = require('../models/BrainStrokeHistory');

// // POST route to save brain stroke prediction history
// router.post('/save', async (req, res) => {
//   const {email, predictionType, dateTime, result, riskPercentage, features, precautions } = req.body;


//   // Validate the required fields
//   if (!email || !predictionType || !dateTime || !result || !riskPercentage) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }


//   try {
//     const newHistory = new BrainStrokeHistory({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//       precautions: precautions || [] // Default to empty array if not provided
//     });

//     await newHistory.save();
    
//     res.status(201).json({ message: 'Brain stroke prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving brain stroke prediction history:', error);
//     res.status(500).json({ error: 'Error saving brain stroke prediction history' });
//   }
// });



// router.get('/', async (req, res) => {
//   const { email } = req.query;
//   console.log('Received email query:', req.query);

//   try {
//     let histories;
//     if (email) {
//       histories = await HistoryOfUser.find({ email });
//     } else {
//       histories = await HistoryOfUser.find(); // for admin or testing
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
//   }
// });






// // GET route to fetch all brain stroke prediction histories
// // router.get('/', async (req, res) => {
// //   try {
// //     const histories = await BrainStrokeHistory.find();
// //     res.status(200).json(histories);
// //   } catch (error) {
// //     console.error('Error fetching brain stroke prediction history:', error);
// //     res.status(500).json({ error: 'Error fetching brain stroke prediction history' });
// //   }
// // });

// module.exports = router;






// const express = require('express');
// const router = express.Router();
// const BrainStrokeHistory = require('../models/BrainStrokeHistory');

// // POST route to save brain stroke prediction history
// router.post('/save', async (req, res) => {
//   const {
//     email,
//     predictionType,
//     dateTime,
//     result,
//     riskPercentage,
//     features,
//     precautions,
//   } = req.body;

//   if (!email || !predictionType || !dateTime || !result || !riskPercentage) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }

//   try {
//     const newHistory = new BrainStrokeHistory({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features: features || [],
//       precautions: precautions || [],
//     });

//     await newHistory.save();

//     res.status(201).json({ message: 'Brain stroke prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving brain stroke prediction history:', error);
//     res.status(500).json({ error: 'Error saving brain stroke prediction history' });
//   }
// });

// // GET route to fetch brain stroke prediction histories
// router.get('/', async (req, res) => {
//   const { email } = req.query;

//   try {
//     let histories;
//     if (email) {
//       histories = await BrainStrokeHistory.find({ email });
//     } else {
//       histories = await BrainStrokeHistory.find();
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching brain stroke prediction history:', error);
//     res.status(500).json({ error: 'Error fetching brain stroke prediction history', details: error.message });
//   }
// });

// module.exports = router;












// const express = require('express');
// const mongoose = require('mongoose');
// const BrainStrokeHistory = require('../models/BrainStrokeHistory')
// ; // Import the schema

// const app = express();
// app.use(express.json());

// app.post('/save-prediction', async (req, res) => {
//   const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

//   const newHistory = new BrainStrokeHistory({
//     email,
//     predictionType,
//     dateTime,
//     result,
//     riskPercentage,
//     features
//   });

//   try {
//     await newHistory.save();
//     res.status(200).json({ message: 'Prediction saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction:', error);
//     res.status(500).json({ error: 'Failed to save prediction to database' });
//   }
// });

// app.listen(5001, () => {
//   console.log('Server running on port 5001');
// });






const express = require('express');
const mongoose = require('mongoose');
const BrainStrokeHistory = require('../models/strokePredictionHistory'); // Import the BrainStrokeHistory model

const app = express();
app.use(express.json());

// MongoDB connection setup
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1); // Exit the process if MongoDB connection fails
  }
};

connectDB(); // Call the function to connect to the database

// Route to save prediction
app.post('/save-prediction', async (req, res) => {
  const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

  // Ensure all necessary fields are provided
  if (!email || !predictionType || !dateTime || !result || !riskPercentage || !features) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newHistory = new BrainStrokeHistory({
    email,
    predictionType,
    dateTime,
    result,
    riskPercentage,
    features
  });

  try {
    await newHistory.save(); // Save the new history to the database
    res.status(200).json({ message: 'Prediction saved successfully' });
  } catch (error) {
    console.error('Error saving prediction:', error);
    res.status(500).json({ error: 'Failed to save prediction to database' });
  }
});

// Start the server
app.listen(5001, () => {
  console.log('Server running on port 5001');
});
