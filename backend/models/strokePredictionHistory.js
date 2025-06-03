

// const mongoose = require('mongoose');

// // Define the schema for stroke prediction history
// const strokeHistorySchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true
//   },
//   predictionType: {
//     type: String,
//     required: true,
//   },
//   dateTime: {
//     type: String,
//     required: true,
//   },
//   result: {
//     type: String,
//     required: true,
//   },
//   riskPercentage: {
//     type: Number,
//     required: true,
//   },
//   features: {
//     type: Object,
//     required: true,
//   },
// });

// // Create the model from the schema
// const StrokePredictionHistory = mongoose.model('StrokePredictionHistory', strokeHistorySchema);

// module.exports = StrokePredictionHistory;




const mongoose = require('mongoose');

// Define the schema for stroke prediction history
const strokeHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // The email is required
  },
  predictionType: {
    type: String,
    required: true, // The type of prediction (e.g., 'Brain Stroke') is required
  },
  dateTime: {
    type: String,
    required: true, // The date and time of prediction is required
  },
  result: {
    type: String,
    required: true, // The result (e.g., 'No Stroke Risk') is required
  },
  riskPercentage: {
    type: String,
    required: true, // The risk percentage is required
  },
  features: {
    type: Object,
    required: true, // The features object is required
  },
  precautions: { type: [String], default: [] } // Array of strings, default is empty
});

// Create the model from the schema
const StrokePredictionHistory = mongoose.model('StrokePredictionHistory', strokeHistorySchema);

module.exports = StrokePredictionHistory;
