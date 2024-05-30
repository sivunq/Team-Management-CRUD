const mongoose = require('mongoose');
const logger = require('../logger/logger');
require('dotenv').config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/teamMemberDB';
  
  try {
    await mongoose.connect(mongoURI);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
