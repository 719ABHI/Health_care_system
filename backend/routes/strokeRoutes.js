
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
