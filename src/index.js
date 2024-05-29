const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const teamRoutes = require('./routes/teamRoutes');
const connectDB= require('./db/connection');
require('dotenv').config();

const rateLimitTimeRange=5 * 60 * 1000; //in milliseconds
const requestsLimit=10;
// Rate limiting middleware
const limiter = rateLimit({
  windowMs: rateLimitTimeRange,
  max: requestsLimit, // limit each IP to x requests per windowMs
  message: 'Too many requests, please try again later',
});

const app = express();
app.use(limiter);
app.use(bodyParser.json());
app.use('/api/members', teamRoutes);

// MongoDB connection
connectDB();

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;