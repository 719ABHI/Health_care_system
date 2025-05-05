
// routes/historyRoutes.js
const express = require('express');
const router = express.Router();
const HistoryOfUser = require('../models/HistoryOfUser');

// Route to save user prediction history
router.post('/', async (req, res) => {
  const { predictionType, dateTime, result, riskPercentage, features } = req.body;

  try {
    // Create a new history record
    const newHistory = new HistoryOfUser({
      predictionType,
      dateTime,
      result,
      riskPercentage,
      features,
    });

    // Save the history record to the database
    await newHistory.save();
    res.status(201).json({ message: 'Prediction history saved successfully' });
  } catch (error) {
    console.error('Error saving prediction history:', error);
    res.status(500).json({ error: 'Error saving prediction history' });
  }
});

// Route to get all history (for future expansion, if needed)
router.get('/', async (req, res) => {
  try {
    const histories = await HistoryOfUser.find();
    res.status(200).json(histories);
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    res.status(500).json({ error: 'Error fetching prediction history' });
  }
});

module.exports = router;


