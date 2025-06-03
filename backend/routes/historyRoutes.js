
const express = require('express');
const router = express.Router();
const HistoryOfUser = require('../models/HistoryOfUser');

// POST /api/history → Save prediction history (no duplicate check, allows multiple entries per email)
router.post('/', async (req, res) => {
  const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

  // Validate required fields
  if (!email || !predictionType || !dateTime || !result || riskPercentage === undefined) {
    return res.status(400).json({ error: 'Missing required fields: email, predictionType, dateTime, result, riskPercentage' });
  }

  try {
    const newHistory = new HistoryOfUser({
      email,
      predictionType,
      dateTime,
      result,
      riskPercentage,
      features: features || {}, // Ensure it's at least an empty object
    });

    await newHistory.save();
    res.status(201).json({ message: '✅ Prediction history saved successfully' });
  } catch (error) {
    console.error('❌ Error saving prediction history:', error);
    res.status(500).json({ error: 'Error saving prediction history', details: error.message });
  }
});

// GET /api/history?email=someone@example.com → Fetch history by email (or all if no email)
router.get('/', async (req, res) => {
  const email = req.query.email;
  console.log('📥 Received email query:', email);

  try {
    let histories;
    if (email) {
      histories = await HistoryOfUser.find({ email }).lean();
      if (histories.length === 0) {
        return res.status(404).json({ message: `No history found for email: ${email}` });
      }
    } else {
      histories = await HistoryOfUser.find().lean();
    }

    res.status(200).json(histories);
  } catch (error) {
    console.error('❌ Error fetching prediction history:', error);
    res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
  }
});

module.exports = router;
