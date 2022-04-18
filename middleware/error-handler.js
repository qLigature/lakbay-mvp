const errorHandler = (err, req, res, next) => {

  console.log(err);

  // Duplicate Email Handler for User Registration
  if (err.code === 11000) {
    console.log('Email in use');
    return res.sendStatus(400);
  }

  // User accessing admin-only or other users' routes
  if (err.message === 'User is unauthorized') {
    return res.sendStatus(401);
  }

  // Cast Error Handler
  if (err.name === 'CastError') {
    return res.status(400).send({
      error: 'Invalid Input'
    });
  }

  // Schema Validation Error(s) in Models
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({
      error: messages
    });

    // Missing JWT Token
  } else if (err.message === 'No authorization token was found') {
    return res.status(401).json({
      error: 'Please login to continue.'
    });

    // Invalid JWT Token
  } else if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: 'Invalid token, please refresh your session'
    });

    // Expired JWT Token
  } else if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expired'
    });

  } else {
    return res.status(500).json({
      error: 'Internal server error'
    });
  }
};

module.exports = errorHandler;
