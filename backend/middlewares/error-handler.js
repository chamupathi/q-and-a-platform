const errorHandler = (err, req, res, next) => {
    // Log the error
    console.error(err.stack);
  
    // Set default status code if not set
    const statusCode = err.status || 500;
  
    // Send error response
    res.status(statusCode).json({
      error: {
        message: err.message || 'Internal Server Error',
      },
    });
  }
  module.exports = errorHandler;