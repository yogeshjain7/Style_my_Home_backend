require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// --- CORS Configuration ---
// This lists the website origins that are allowed to connect to this server.
const allowedOrigins = [
  'http://localhost:5500',         // For local laptop testing
  'http://127.0.0.1:5500',       // Also for local laptop testing
  'https://yogeshjain7.github.io' // Your live frontend website's origin
];

app.use(cors({
  origin: function (origin, callback) {
    // Log the incoming request's origin (useful for debugging)
    console.log('Request received from origin:', origin);

    // Allow requests with no origin (like mobile apps, Postman) or from an allowed origin
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Block requests from origins not in the list
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// --- End of CORS Configuration ---


// Middleware to parse incoming JSON requests
app.use(express.json());

// --- Connect to MongoDB ---
// Reads the connection string from your .env file (or Render's environment variables)
mongoose.connect(process.env.MONGO_URI, {})
.then(() => console.log('MongoDB Connected...')) // Success message
.catch(err => console.error('MongoDB Connection Error:', err)); // Error message

// --- API Routes ---
// Directs any requests starting with /api/auth to the routes defined in auth.js
app.use('/api/auth', require('./routes/auth'));

// --- Start the Server ---
// Uses the port specified by Render (process.env.PORT) or defaults to 5000 for local development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
