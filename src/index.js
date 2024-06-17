const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const teamRoutes = require('./routes/teamRoutes');
const healthCheck = require('./routes/healthCheck');
const responseHandler = require('./middlewares/responseHandler');
const logger = require('./logger/logger');
const connectDB= require('./db/connection');
const helmet = require('helmet');

require('dotenv').config();

//Rate limiting middleware
const rateLimitTimeRange=5 * 60 * 1000; //in milliseconds
const requestsLimit=10;
const limiter = rateLimit({
  windowMs: rateLimitTimeRange,
  max: requestsLimit, // limit each IP to x requests per windowMs
  message: 'Too many requests, please try again later',
});

//middleware
const app = express();
app.use(helmet());
app.use(limiter);
app.use(bodyParser.json());

app.use(responseHandler);

//routes
app.use('/api/v1', teamRoutes);
app.use('/api/health', healthCheck);

//DB connection
connectDB();

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = app;