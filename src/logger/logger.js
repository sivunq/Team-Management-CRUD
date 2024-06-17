const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');
const path = require('path');
const fs = require('fs');

const logDirectory = path.join(__dirname, '..', 'logs');

// Ensure log directory exists
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a transport for daily log rotation
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDirectory}/%DATE%-app.log`,
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', // Keep logs for 14 days
  zippedArchive: true,
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    dailyRotateFileTransport
  ],
  exceptionHandlers: [
    new transports.File({ filename: `${logDirectory}/exceptions.log` })
  ]
});

module.exports = logger;
