
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
