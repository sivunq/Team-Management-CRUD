const logger = require('../logger/logger');

function responseHandler(req, res, next) {
  res.sendResponse = (data, statusCode = 200) => {
    res.status(data.statusCode || statusCode);
    if (typeof data === 'string') {
      res.send(data);
    } else {
      res.json({
        status: 'success',
        data: data,
      });
    }
  };

  res.sendError = (error, statusCode = 500) => {
    res.status(error.statusCode || statusCode);
	logger.error(error.message || 'Internal Server Error');
    res.json({
		status: 'error',
		message: error.message || 'Internal Server Error'
	});
  };

  next();
}

module.exports = responseHandler;
