

// const mongoose = require('mongoose');

// const EcgPredictionSchema = new mongoose.Schema({
//   patientName: { type: String, required: true },
//   email: { type: String, required: true },
//   age: { type: Number, required: true },
//   contactNumber: { type: String, required: true },
//   predictionLabel: { type: String, required: true },
//   confidence: { type: Number, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('EcgPrediction', EcgPredictionSchema);





const mongoose = require('mongoose');

const ecgPatientSchema = new mongoose.Schema({
  patientName: String,
  email: String,
  age: Number,
  contactNumber: String,
  prediction_index: Number,
  prediction_label: String,
  confidence: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EcgPatient', ecgPatientSchema);
