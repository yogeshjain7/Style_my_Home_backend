require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- CORRECT CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5500', // For local testing
  'https://yogeshjain7.github.io' // The origin of your live frontend website
];

app.use(cors({
  origin: function (origin, callback) {
    // Log the incoming request's origin to help with debugging
    console.log('Request received from origin:', origin); 

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      // Allow the request if the origin is in the list
      callback(null, true);
    } else {
      // Block the request if the origin is not in the list
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// --- End of CORS Configuration ---


// Middleware to parse JSON bodies
app.use(express.json());

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

// --- API Routes ---
app.use('/api/auth', require('./routes/auth'));

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
