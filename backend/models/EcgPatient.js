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

const ecgPatientSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  contactNumber: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); // Optional: adds createdAt and updatedAt timestamps

const EcgPatient = mongoose.model('EcgPatient', ecgPatientSchema);

module.exports = EcgPatient;
