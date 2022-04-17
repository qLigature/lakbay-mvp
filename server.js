const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');

const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send({ message: 'Hello world!' });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
