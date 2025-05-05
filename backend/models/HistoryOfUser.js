
// models/HistoryOfUser.js
const mongoose = require('mongoose');

// Define the schema for user prediction history
const historySchema = new mongoose.Schema({
  predictionType: {
    type: String,
    required: true,
  },
  dateTime: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  riskPercentage: {
    type: Number,
    required: true,
  },
  features: {
    type: Object,
    required: true,
  },
});

// Create the model from the schema
const HistoryOfUser = mongoose.model('HistoryOfUser', historySchema);

module.exports = HistoryOfUser;








// const mongoose = require('mongoose');

// // Define the schema for user prediction history
// const historySchema = new mongoose.Schema({
//   uid: {
//     type: String,
//     required: true,  // ← links history to the user
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
//   precaution: {
//     type: String,  // ← optional, can be used later
//     default: '',   // leave empty if not set
//   },
// });

// // Create the model from the schema
// const HistoryOfUser = mongoose.model('HistoryOfUser', historySchema);

// module.exports = HistoryOfUser;
