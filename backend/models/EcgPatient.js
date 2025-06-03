// const mongoose = require('mongoose');

// const ecgPatientSchema = new mongoose.Schema({
//   patientName: {
//     type: String,
//     required: true,
//     trim: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   age: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   contactNumber: {
//     type: String,
//     required: true,
//     trim: true
//   }
// }, { timestamps: true });

// const EcgPatient = mongoose.model('EcgPatient', ecgPatientSchema);

// module.exports = EcgPatient;

const mongoose = require('mongoose');

const EcgPatientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  contactNumber: { type: String, required: true },

  prediction_index: { type: Number, required: true },
  prediction_label: { type: String, required: true },
  confidence: { type: Number, required: true },

  ecgImage: {
    data: Buffer,
    contentType: String,
    filename: String,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EcgPatient', EcgPatientSchema);
