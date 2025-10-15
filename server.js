require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- CORRECT CORS Configuration ---
const allowedOrigins = [
  'http://localhost:5500', // For local testing
  'https://yogeshjain7.github.io' // Your live frontend URL
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// --- End of CORS Configuration ---

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error(err));

// API Routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
