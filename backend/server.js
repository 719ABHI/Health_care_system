

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const helmet = require('helmet');
// const morgan = require('morgan');
// require('express-async-errors');

// // Route imports
// const authRoutes = require('./routes/auth');
// const ecgRoutes = require('./routes/ecgRoutes');
// const historyRoutes = require('./routes/historyRoutes');
// const strokeRoutes = require('./routes/strokeRoutes');

// // Initialize app
// const app = express();
// dotenv.config();

// // CORS config
// const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true,
// }));

// // Middleware
// app.use(helmet());
// app.use(morgan('dev'));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // MongoDB connection with retry
// const connectDB = async () => {
//   const maxRetries = 5;
//   let retries = 0;
//   while (retries < maxRetries) {
//     try {
//       await mongoose.connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
//       console.log('✅ MongoDB connected successfully');
//       break;
//     } catch (err) {
//       retries++;
//       console.error(`❌ MongoDB connection failed (attempt ${retries}): ${err.message}`);
//       if (retries >= maxRetries) {
//         console.error('❌ Max retries reached, exiting');
//         process.exit(1);
//       }
//       console.log('⏳ Retrying in 5 seconds...');
//       await new Promise(res => setTimeout(res, 5000));
//     }
//   }
// };
// connectDB();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/ecg', ecgRoutes);
// app.use('/api/history', historyRoutes);
// app.use('/api/save', strokeRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'Server is healthy' });
// });

// // Root route
// app.get('/', (req, res) => {
//   res.send('🚀 Server is up and running');
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('🚨 Global error:', err.stack);
//   res.status(500).json({ message: 'Internal server error', error: err.message });
// });

// // Start server
// const PORT = process.env.PORT || 5002;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path'); // <-- Import path module
require('express-async-errors');

// Route imports
const authRoutes = require('./routes/auth');
const ecgRoutes = require('./routes/ecgRoutes');
const historyRoutes = require('./routes/historyRoutes');
const strokeRoutes = require('./routes/strokeRoutes');

// Initialize app
const app = express();
dotenv.config();

// CORS config
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from uploads folder

// Serve static files from uploads/profile-images folder
app.use('/uploads/profile-images', express.static(path.join(__dirname, 'uploads', 'profile-images')));



// MongoDB connection with retry
const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;
  while (retries < maxRetries) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('✅ MongoDB connected successfully');
      break;
    } catch (err) {
      retries++;
      console.error(`❌ MongoDB connection failed (attempt ${retries}): ${err.message}`);
      if (retries >= maxRetries) {
        console.error('❌ Max retries reached, exiting');
        process.exit(1);
      }
      console.log('⏳ Retrying in 5 seconds...');
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ecg', ecgRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/save', strokeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is healthy' });
});

// Root route
app.get('/', (req, res) => {
  res.send('🚀 Server is up and running');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🚨 Global error:', err.stack);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
