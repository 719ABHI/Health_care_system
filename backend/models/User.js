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


// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//     default: uuidv4  // Automatically generates UUID
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   resetToken: {
//     type: String,
//     default: null  // Used for password reset
//   }
// });

// // Create the User model linked to 'Healthcare_system' collection
// const User = mongoose.model('User', userSchema, 'Healthcare_system');

// module.exports = User;



// const mongoose = require('mongoose');
// const { v4: uuidv4 } = require('uuid');

// // Define the User schema
// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//     default: uuidv4  // Automatically generates UUID
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: String,
//     required: false  // Set to true if mandatory
//   },
//   address: {
//     type: String,
//     required: false  // Set to true if mandatory
//   },
//   resetToken: {
//     type: String,
//     default: null  // Used for password reset
//   }
// });

// // Create the User model linked to 'Healthcare_system' collection
// const User = mongoose.model('User', userSchema, 'Healthcare_system');

// module.exports = User;






const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// Define the User schema
const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    unique: true,
    default: uuidv4
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
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 0
  },
  password: {
    type: String,
    required: true
  },
  resetToken: {
    type: String,
    default: null
  }
});

// Create the User model linked to 'Healthcare_system' collection
const User = mongoose.model('User', userSchema, 'Healthcare_system');

module.exports = User;







// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
//   },
//   phoneNumber: {
//     type: String,
//     trim: true,
//     match: [/^\d{10}$/, 'Phone number must be 10 digits'] // Adjust based on region
//   },
//   address: {
//     type: String,
//     trim: true,
//   },
//   age: {
//     type: Number,
//     min: [0, 'Age must be positive'],
//     max: [120, 'Unrealistic age']
//   },
//   gender: {
//     type: String,
//     enum: ['Male', 'Female', 'Other'], // to ensure valid gender input
//   },
//   profileImage: {
//     type: String,
//     default: '/uploads/profile-images/default.jpg' // Optional: fallback image
//   },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     minlength: [6, 'Password must be at least 6 characters'],
//     select: false // Prevents returning password in queries by default
//   },
// }, { timestamps: true }); // adds createdAt and updatedAt fields

// module.exports = mongoose.model('User', UserSchema);




