
// // models/HistoryOfUser.js
// const mongoose = require('mongoose');

// // Define the schema for user prediction history
// const historySchema = new mongoose.Schema({
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
// const HistoryOfUser = mongoose.model('HistoryOfUser', historySchema);

// module.exports = HistoryOfUser;







// // models/HistoryOfUser.js
// const mongoose = require('mongoose');

// // Define the schema for user prediction history
// const historySchema = new mongoose.Schema({
//   email: {
//     type: String,
//     unique: true,
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
// const HistoryOfUser = mongoose.model('HistoryOfUser', historySchema);

// module.exports = HistoryOfUser;


const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  email: { type: String, required: true },
  predictionType: { type: String, required: true },
  dateTime: { type: String, required: true },
  result: { type: String, required: true },
  riskPercentage: { type: Number, required: true },
  features: { type: Object, required: true },
});

const HistoryOfUser = mongoose.model('HistoryOfUser', historySchema);

module.exports = HistoryOfUser;
