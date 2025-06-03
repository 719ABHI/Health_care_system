
// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // POST /register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, password, confirmPassword } = req.body;

//   try {
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       password: hashedPassword
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) return res.status(400).json({ message: 'Email query param is required' });

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Get user info error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;





// const express = require('express');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const path = require('path');
// const User = require('../models/User'); // Adjust path as needed

// const router = express.Router();

// // Configure multer for profile image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/profileImages/');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // POST /register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, gender, password, confirmPassword } = req.body;

//   try {
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       gender: gender || '',
//       password: hashedPassword,
//       profileImage: '' // initially empty
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.json({
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         age: user.age,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Error fetching user info:', err);
//     return res.status(500).json({ message: 'Server error' });
//   }
// });

// // PUT /update-user
// router.put('/update-user', upload.single('profileImage'), async (req, res) => {
//   try {
//     const { email, name, phoneNumber, address, age, gender } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: 'Email is required to update user' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     if (name) user.name = name;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (address) user.address = address;
//     if (age) user.age = age;
//     if (gender) user.gender = gender;

//     if (req.file) {
//       user.profileImage = `/uploads/profileImages/${req.file.filename}`;
//     }

//     await user.save();

//     res.json({
//       message: 'User updated successfully',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage,
//       },
//     });
//   } catch (err) {
//     console.error('Update user error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;







// const express = require('express');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const User = require('../models/User'); // Adjust path to your User model

// const router = express.Router();

// // Configure multer for profile image upload
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/profile-images/');  // Correct folder name
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // POST /register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, gender, password, confirmPassword } = req.body;

//   try {
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       gender: gender || '',
//       password: hashedPassword,
//       profileImage: '' // initially empty
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) return res.status(400).json({ message: 'Email query param is required' });

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage
//       }
//     });
//   } catch (err) {
//     console.error('Get user info error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // PUT /update-user
// // Use upload.single('profileImage') to handle single image upload from field named 'profileImage'
// router.put('/update-user', upload.single('profileImage'), async (req, res) => {
//   try {
//     const { email, name, phoneNumber, address, age, gender } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: 'Email is required to update user' });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Update fields if provided
//     if (name) user.name = name;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (address) user.address = address;
//     if (age) user.age = age;
//     if (gender) user.gender = gender;

//     // Update profile image if uploaded
//     if (req.file) {
//       // Delete old profile image if exists
//       if (user.profileImage) {
//         const oldImagePath = path.join(__dirname, '..', user.profileImage);
//         fs.unlink(oldImagePath, (err) => {
//           if (err) {
//             console.warn('Old profile image deletion error:', err.message);
//           }
//         });
//       }
//       user.profileImage = `/uploads/profile-images/${req.file.filename}`;
//     }

//     await user.save();

//     res.json({
//       message: 'User updated successfully',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage,
//       },
//     });
//   } catch (err) {
//     console.error('Update user error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;







// const express = require('express');
// const bcrypt = require('bcryptjs');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const User = require('../models/User'); // Adjust path to your User model

// const router = express.Router();

// // Multer storage config for profile image
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads/profile-images');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const ext = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
//   }
// });
// const upload = multer({ storage });

// // POST /register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, gender, password, confirmPassword } = req.body;

//   try {
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       gender: gender || '',
//       password: hashedPassword,
//       profileImage: ''
//     });

//     await newUser.save();

//     res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         userId: newUser.userId,
//         name: newUser.name,
//         email: newUser.email,
//         phoneNumber: newUser.phoneNumber,
//         address: newUser.address,
//         age: newUser.age,
//         gender: newUser.gender,
//         profileImage: ''
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: 'Invalid email or password' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

//     res.json({
//       message: 'Login successful!',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage ? user.profileImage.split('/').pop() : ''
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;
//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.json({
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage ? user.profileImage.split('/').pop() : ''
//       }
//     });
//   } catch (err) {
//     console.error('Get user info error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // PUT /update-user
// router.put('/update-user', upload.single('profileImage'), async (req, res) => {
//   const { email, name, phoneNumber, address, age, gender } = req.body;

//   if (!email) return res.status(400).json({ message: 'Email is required' });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     // Update fields
//     if (name) user.name = name;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (address) user.address = address;
//     if (age) user.age = age;
//     if (gender) user.gender = gender;

//     // Update profile image if a new one is uploaded
//     if (req.file) {
//       // Delete old image if exists
//       if (user.profileImage) {
//         const oldPath = path.join(__dirname, '..', user.profileImage);
//         fs.unlink(oldPath, (err) => {
//           if (err) console.warn('Failed to delete old image:', err.message);
//         });
//       }
//       user.profileImage = `/uploads/profile-images/${req.file.filename}`;
//     }

//     await user.save();

//     res.json({
//       message: 'User updated successfully',
//       user: {
//         userId: user.userId,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age,
//         gender: user.gender,
//         profileImage: user.profileImage ? user.profileImage.split('/').pop() : ''
//       }
//     });
//   } catch (err) {
//     console.error('Update user error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // POST /api/auth/register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, password, confirmPassword } = req.body;

//   try {
//     // Check for missing fields
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Password match check
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Check for existing email
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       password: hashedPassword
//     });

//     await user.save();

//     res.status(201).json({
//       message: 'User registered successfully!',
//       user: {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     res.json({
//       message: 'Login successful!',
//       user: {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/auth/get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({
//       user: {
//         userId: user._id,
//         name: user.name,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         address: user.address,
//         age: user.age
//       }
//     });
//   } catch (err) {
//     console.error('Error fetching user info:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;






// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // POST /api/auth/register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, password, confirmPassword } = req.body;

//   try {
//     // Check for missing fields
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Password match check
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Check for existing email
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       password: hashedPassword
//     });

//     await user.save();

//     // Return user info without wrapper
//     res.status(201).json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Return user info without wrapper
//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/auth/get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return user info without wrapper
//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Error fetching user info:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');
// const router = express.Router();

// // POST /api/auth/register
// router.post('/register', async (req, res) => {
//   const { name, email, phoneNumber, address, age, password, confirmPassword } = req.body;

//   try {
//     // Check for missing fields
//     if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     // Password match check
//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }

//     // Check for existing email
//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create new user
//     const user = new User({
//       name,
//       email,
//       phoneNumber,
//       address,
//       age,
//       password: hashedPassword
//     });

//     await user.save();

//     // Return user info without wrapper
//     res.status(201).json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Registration error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // POST /api/auth/login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     // Compare passwords
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }

//     localStorage.setItem('email', email);

//     // Return user info without wrapper
//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // GET /api/auth/get-user-info?email=...
// router.get('/get-user-info', async (req, res) => {
//   const { email } = req.query;

//   if (!email) {
//     return res.status(400).json({ message: 'Email is required' });
//   }

//   try {
//     const user = await User.findOne({ email }).select('-password -resetToken');

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Return user info without wrapper
//     res.json({
//       userId: user._id,
//       name: user.name,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       address: user.address,
//       age: user.age
//     });
//   } catch (err) {
//     console.error('Error fetching user info:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;






const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, phoneNumber, address, age, password, confirmPassword } = req.body;

  try {
    if (!name || !email || !phoneNumber || !address || !age || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      phoneNumber,
      address,
      age,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        age: user.age
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        age: user.age
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/auth/get-user-info?email=...
router.get('/get-user-info', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const user = await User.findOne({ email }).select('-password -resetToken');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
        age: user.age
      }
    });
  } catch (err) {
    console.error('Error fetching user info:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
