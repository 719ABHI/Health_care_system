
// // routes/historyRoutes.js
// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser');

// // Route to save user prediction history
// router.post('/', async (req, res) => {
//   const { predictionType, dateTime, result, riskPercentage, features } = req.body;

//   try {
//     // Create a new history record
//     const newHistory = new HistoryOfUser({
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//     });

//     // Save the history record to the database
//     await newHistory.save();
//     res.status(201).json({ message: 'Prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction history:', error);
//     res.status(500).json({ error: 'Error saving prediction history' });
//   }
// });

// // Route to get all history (for future expansion, if needed)
// router.get('/', async (req, res) => {
//   try {
//     const histories = await HistoryOfUser.find();
//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser');

// // Route to save user prediction history (POST /api/history)
// router.post('/', async (req, res) => {
//   const { userId, predictionType, dateTime, result, riskPercentage, features } = req.body;

//   if (!userId) {
//     return res.status(400).json({ error: 'Missing userId in request body' });
//   }

//   try {
//     const newHistory = new HistoryOfUser({
//       userId,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//     });

//     await newHistory.save();
//     res.status(201).json({ message: 'Prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction history:', error);
//     res.status(500).json({ error: 'Error saving prediction history' });
//   }
// });

// // Route to get history by userId (GET /api/history?userId=xxx)
// // If no userId provided, returns all (for admin/debug)
// router.get('/', async (req, res) => {
//   const { userId } = req.query;

//   try {
//     let histories;
//     if (userId) {
//       histories = await HistoryOfUser.find({ userId });
//     } else {
//       histories = await HistoryOfUser.find();
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history' });
//   }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser');

// // POST /api/history → Save prediction history
// router.post('/', async (req, res) => {
//   const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: 'Missing email in request body' });
//   }

//   try {
//     const newHistory = new HistoryOfUser({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//     });

//     await newHistory.save();
//     res.status(201).json({ message: 'Prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction history:', error);
//     res.status(500).json({ error: 'Error saving prediction history' });
//   }
// });

// // GET /api/history?email=someone@example.com → Fetch history for a user (or all if no email)
// router.get('/', async (req, res) => {
//   const { email } = req.query;

//   try {
//     let histories;
//     if (email) {
//       histories = await HistoryOfUser.find({ email });
//     } else {
//       histories = await HistoryOfUser.find(); // for admin or testing
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history' });
//   }
// });

// module.exports = router;



// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser');

// // POST /api/history → Save prediction history
// router.post('/', async (req, res) => {
//   const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

//   // Validate the required fields
//   if (!email || !predictionType || !dateTime || !result || !riskPercentage) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }

//   try {
//     // Create a new history entry
//     const newHistory = new HistoryOfUser({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//     });

//     // Save the history entry to the database
//     await newHistory.save();
//     res.status(201).json({ message: 'Prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction history:', error);
//     res.status(500).json({ error: 'Error saving prediction history', details: error.message });
//   }
// });

// // GET /api/history?email=someone@example.com → Fetch history for a user (or all if no email)

// router.get('/', async (req, res) => {
//   const email  = req.query.email;
//   console.log('Received email query:', req.query.email);

//   try {
//     let histories;
//     if (email) {
//       histories = await HistoryOfUser.find({ email });
//     } else {
//       histories = await HistoryOfUser.find(); // for admin or testing
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
//   }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const HistoryOfUser = require('../models/HistoryOfUser');

// // POST /api/history → Save prediction history (without checking for existing entries)
// router.post('/', async (req, res) => {
//   const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

//   // Validate the required fields
//   if (!email || !predictionType || !dateTime || !result || !riskPercentage) {
//     return res.status(400).json({ error: 'Missing required fields in the request body' });
//   }

//   try {
//     // Create a new history entry without checking for existing history
//     const newHistory = new HistoryOfUser({
//       email,
//       predictionType,
//       dateTime,
//       result,
//       riskPercentage,
//       features,
//     });

//     // Save the history entry to the database
//     await newHistory.save();
//     res.status(201).json({ message: 'Prediction history saved successfully' });
//   } catch (error) {
//     console.error('Error saving prediction history:', error);
//     res.status(500).json({ error: 'Error saving prediction history', details: error.message });
//   }
// });

// // GET /api/history?email=someone@example.com → Fetch history for a user (or all if no email)
// router.get('/', async (req, res) => {
//   const email = req.query.email;
//   console.log('Received email query:', email); // Log the received email query

//   try {
//     let histories;
//     if (email) {
//       histories = await HistoryOfUser.find({ email });
//     } else {
//       histories = await HistoryOfUser.find(); // For admin or testing purposes
//     }

//     res.status(200).json(histories);
//   } catch (error) {
//     console.error('Error fetching prediction history:', error);
//     res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
//   }
// });

// module.exports = router;






const express = require('express');
const router = express.Router();
const HistoryOfUser = require('../models/HistoryOfUser');

// POST /api/history → Save prediction history (no duplicate check, allows multiple entries per email)
router.post('/', async (req, res) => {
  const { email, predictionType, dateTime, result, riskPercentage, features } = req.body;

  // Validate required fields
  if (!email || !predictionType || !dateTime || !result || riskPercentage === undefined) {
    return res.status(400).json({ error: 'Missing required fields: email, predictionType, dateTime, result, riskPercentage' });
  }

  try {
    const newHistory = new HistoryOfUser({
      email,
      predictionType,
      dateTime,
      result,
      riskPercentage,
      features: features || {}, // Ensure it's at least an empty object
    });

    await newHistory.save();
    res.status(201).json({ message: '✅ Prediction history saved successfully' });
  } catch (error) {
    console.error('❌ Error saving prediction history:', error);
    res.status(500).json({ error: 'Error saving prediction history', details: error.message });
  }
});

// GET /api/history?email=someone@example.com → Fetch history by email (or all if no email)
router.get('/', async (req, res) => {
  const email = req.query.email;
  console.log('📥 Received email query:', email);

  try {
    let histories;
    if (email) {
      histories = await HistoryOfUser.find({ email }).lean();
      if (histories.length === 0) {
        return res.status(404).json({ message: `No history found for email: ${email}` });
      }
    } else {
      histories = await HistoryOfUser.find().lean();
    }

    res.status(200).json(histories);
  } catch (error) {
    console.error('❌ Error fetching prediction history:', error);
    res.status(500).json({ error: 'Error fetching prediction history', details: error.message });
  }
});

module.exports = router;
