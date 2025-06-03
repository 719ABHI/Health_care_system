const mongoose = require('mongoose');

const brainStrokeHistorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  predictionType: { type: String, required: true },
  dateTime: { type: String, required: true },
  result: { type: String, required: true },
  riskPercentage: { type: Number, required: true },
  features: { type: Object, required: true },
  precautions: { type: [String], default: [] } // Array of strings, default is empty
});

module.exports = mongoose.model('BrainStrokeHistory', brainStrokeHistorySchema);
