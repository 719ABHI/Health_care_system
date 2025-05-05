const express = require('express');
const router = express.Router();
const BrainStrokeHistory = require('../models/BrainStrokeHistory');

// POST route to save brain stroke prediction history
router.post('/save', async (req, res) => {
  const { predictionType, dateTime, result, riskPercentage, features, precautions } = req.body;

  try {
    const newHistory = new BrainStrokeHistory({
      predictionType,
      dateTime,
      result,
      riskPercentage,
      features,
      precautions: precautions || [] // Default to empty array if not provided
    });

    await newHistory.save();
    res.status(201).json({ message: 'Brain stroke prediction history saved successfully' });
  } catch (error) {
    console.error('Error saving brain stroke prediction history:', error);
    res.status(500).json({ error: 'Error saving brain stroke prediction history' });
  }
});

// GET route to fetch all brain stroke prediction histories
router.get('/', async (req, res) => {
  try {
    const histories = await BrainStrokeHistory.find();
    res.status(200).json(histories);
  } catch (error) {
    console.error('Error fetching brain stroke prediction history:', error);
    res.status(500).json({ error: 'Error fetching brain stroke prediction history' });
  }
});

module.exports = router;
