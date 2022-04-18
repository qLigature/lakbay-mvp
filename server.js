const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const { verifyToken } = require('./middleware/verify-token');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const roomRouter = require('./routes/rooms');
const adminRouter = require('./routes/admin');

const errorHandler = require('./middleware/error-handler');

// Import environmental variables from .env file
const { DB_CONNECTION } = process.env;
const PORT = process.env.PORT || 9000;

// Connect to database
mongoose.connect(DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(verifyToken);

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' });
});

app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/rooms', roomRouter);
app.use('/admin', adminRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
