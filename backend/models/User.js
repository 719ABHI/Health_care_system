// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//     default: uuidv4  // Generates a UUID automatically
//   },
//   name: String,
//   email: String,
//   password: String
// });

// // Create the User model linked to 'Healthcare system' collection
// const User = mongoose.model('User', userSchema, 'Healthcare_system');

// module.exports = User;


const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: uuidv4  // Automatically generates UUID
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
    default: null  // Used for password reset
  }
});

// Create the User model linked to 'Healthcare_system' collection
const User = mongoose.model('User', userSchema, 'Healthcare_system');

module.exports = User;
