require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- CORS Configuration ---
// This tells your server which websites are allowed to connect to it.
const allowedOrigins = [
  'http://localhost:5500', // For local testing
  'https://your-github-username.github.io' // IMPORTANT: Replace with your actual GitHub Pages URL
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or server-to-server)
    if (!origin) return callback(null, true);
    
    // Check if the incoming origin is in our list of allowed sites
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    return callback(null, true);
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
// Any request to /api/auth will be handled by the auth.js file
app.use('/api/auth', require('./routes/auth'));

// Any request to /api/furniture will be handled by the furniture.js file
app.use('/api/furniture', require('./routes/furniture'));

// --- Start the Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
