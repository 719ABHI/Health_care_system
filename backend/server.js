// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const validator = require('validator');
// const jwt = require('jsonwebtoken');
// const cors = require('cors');
// const { v4: uuidv4 } = require('uuid'); // For unique userId
// require('dotenv').config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// // User Schema with unique userId
// const userSchema = new mongoose.Schema({
//   userId: {
//     type: String,
//     unique: true,
//     default: uuidv4,
//   },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// }, { collection: 'Healthcare_system' });

// const User = mongoose.model('User', userSchema);

// // Registration Route
// app.post('/api/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ message: 'All fields are required' });
//   }

//   if (!validator.isEmail(email)) {
//     return res.status(400).json({ message: 'Invalid email format' });
//   }

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ 
//       message: 'User registered successfully',
//       name: newUser.name,
//       userId: newUser.userId // Send back the UUID for reference
//     });
//   } catch (err) {
//     console.error('Error saving user:', err);
//     res.status(500).json({ message: 'Server error, could not register user' });
//   }
// });

// // Login Route (JWT Authentication)
// app.post('/api/login', async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email and password are required' });
//   }

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'User not found' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid password' });
//     }

//     const token = jwt.sign(
//       { userId: user.userId }, // Use the UUID here
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Error logging in user:', err);
//     res.status(500).json({ message: 'Server error, could not login user' });
//   }
// });

// // Start Server
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on port ${process.env.PORT}`);
// });


//new code
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();

// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api', authRoutes);
// app.use('/api/ecg', ecgRoutes);

// // Server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


//new new code
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config();
// const multer = require('multer'); // Import multer for file uploads

// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Set up multer for file uploads (memory storage, adjust as needed)
// const storage = multer.memoryStorage(); // Stores files in memory
// const upload = multer({ storage }); // You can also configure limits, file types, etc.

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api', authRoutes); // Authentication Routes
// app.use('/api/ecg', ecgRoutes); // ECG Routes

// // Define a route for handling file uploads (for prediction)
// app.post('/api/ecg/predict', upload.single('image'), async (req, res) => {
//   try {
//     // Check if image is uploaded
//     if (!req.file) {
//       return res.status(400).json({ message: 'No image uploaded' });
//     }

//     const imageBuffer = req.file.buffer; // Get image buffer from memory storage

//     // Process image data and make prediction (Add your prediction logic here)
//     const predictionResult = 'Normal Sinus Rhythm'; // Mock prediction result, replace with your model's logic

//     // Send the prediction result back as JSON
//     res.json({ prediction: predictionResult });
//   } catch (err) {
//     console.error('Prediction error:', err);
//     res.status(500).json({ message: 'Error during prediction' });
//   }
// });

// // Server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });







// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');
// const helmet = require('helmet'); // Security middleware
// const morgan = require('morgan'); // HTTP request logger

// // Initialize the app
// const app = express();

// // Load environment variables from a .env file
// dotenv.config();

// // Middleware
// app.use(helmet()); // Adds security headers
// app.use(morgan('dev')); // Logs HTTP requests
// app.use(cors()); // Enable Cross-Origin Request Sharing
// app.use(express.json()); // Parse incoming JSON requests (replacing body-parser)

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => {
//     console.log('Error connecting to MongoDB:', err);
//     process.exit(1); // Exit the process if MongoDB connection fails
//   });

// // Use the auth routes for user authentication
// app.use('/api/auth', authRoutes);
// app.use('/api/ecg', ecgRoutes);

// // Test route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start the server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });




// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');
// const historyRoutes = require('./routes/historyRoutes'); // Add the historyRoutes import
// const helmet = require('helmet'); // Security middleware
// const morgan = require('morgan'); // HTTP request logger

// // Initialize the app
// const app = express();

// // Load environment variables from a .env file
// dotenv.config();

// // Middleware
// app.use(helmet()); // Adds security headers
// app.use(morgan('dev')); // Logs HTTP requests
// app.use(cors()); // Enable Cross-Origin Request Sharing
// app.use(express.json()); // Parse incoming JSON requests (replacing body-parser)

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((err) => {
//     console.log('Error connecting to MongoDB:', err);
//     process.exit(1); // Exit the process if MongoDB connection fails
//   });

// // Use the routes for authentication, ECG-related functionality, and history
// app.use('/api/auth', authRoutes);
// app.use('/api/ecg', ecgRoutes);
// app.use('/api/history', historyRoutes); // Register the history routes

// // Test route to check if the server is running
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start the server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });





// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');
// const historyRoutes = require('./routes/historyRoutes'); // Heart disease history
// const brainStrokeRoutes = require('./routes/brainStrokeHistoryRoutes'); // NEW: Brain stroke history
// const helmet = require('helmet'); // Security middleware
// const morgan = require('morgan'); // HTTP request logger

// // Initialize the app
// const app = express();

// // Load environment variables from a .env file
// dotenv.config();

// // Middleware
// app.use(helmet()); // Adds security headers
// app.use(morgan('dev')); // Logs HTTP requests
// app.use(cors()); // Enable Cross-Origin Request Sharing
// app.use(express.json()); // Parse incoming JSON requests

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ MongoDB connected successfully'))
//   .catch((err) => {
//     console.error('❌ Error connecting to MongoDB:', err);
//     process.exit(1); // Exit if connection fails
//   });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/ecg', ecgRoutes);
// app.use('/api/history', historyRoutes); // Heart disease history routes
// app.use('/api/brain-stroke-history', brainStrokeRoutes); // Brain stroke history routes

// // Test route
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('🚨 Server error:', err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start the server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });



// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');
// const historyRoutes = require('./routes/historyRoutes'); // Heart disease history
// const brainStrokeRoutes = require('./routes/brainStrokeHistoryRoutes'); // NEW: Brain stroke history
// const helmet = require('helmet'); // Security middleware
// const morgan = require('morgan'); // HTTP request logger

// // Initialize the app
// const app = express();

// // Load environment variables from a .env file
// dotenv.config();

// // Middleware
// app.use(helmet()); // Adds security headers
// app.use(morgan('dev')); // Logs HTTP requests
// app.use(cors()); // Enable Cross-Origin Request Sharing
// app.use(express.json()); // Parse incoming JSON requests

// // MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('✅ MongoDB connected successfully'))
//   .catch((err) => {
//     console.error('❌ Error connecting to MongoDB:', err);
//     process.exit(1); // Exit if connection fails
//   });

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/ecg', ecgRoutes);
// app.use('/api/history', historyRoutes); // Heart disease history routes
// app.use('/api/brain-stroke-history', brainStrokeRoutes); // Brain stroke history routes

// // Test route
// app.get('/', (req, res) => {
//   res.send('Server is running');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error('🚨 Server error:', err.stack);
//   res.status(500).json({ message: 'Something went wrong!', error: err.message });
// });

// // Start the server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`🚀 Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const ecgRoutes = require('./routes/ecgRoutes');
const historyRoutes = require('./routes/historyRoutes'); // Heart disease history
const brainStrokeRoutes = require('./routes/brainStrokeHistoryRoutes'); // Brain stroke history
const helmet = require('helmet'); // Security middleware
const morgan = require('morgan'); // HTTP request logger

// Initialize the app
const app = express();

// Load environment variables from a .env file
dotenv.config();

// Middleware
app.use(helmet()); // Adds security headers
app.use(morgan('dev')); // Logs HTTP requests
app.use(cors()); // Enable Cross-Origin Request Sharing
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ Error connecting to MongoDB:', err);
    process.exit(1); // Exit if connection fails
  }
};

connectDB(); // Connect to MongoDB

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ecg', ecgRoutes);
app.use('/api/history', historyRoutes); // Heart disease history routes
app.use('/api/brain-stroke-history', brainStrokeRoutes); // Brain stroke history routes

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
