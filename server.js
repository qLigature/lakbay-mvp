const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const roomRouter = require('./routes/rooms');

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

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Routes
app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' });
});

app.use('/rooms', roomRouter);

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
