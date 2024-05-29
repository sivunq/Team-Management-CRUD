const express = require('express');
const bodyParser = require('body-parser');
const teamRoutes = require('./routes/teamRoutes');
const connectDB= require('./db/connection');
require('dotenv').config();


const app = express();
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