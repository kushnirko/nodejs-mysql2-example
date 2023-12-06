'use strict';

require('dotenv').config();

const express = require('express');
const app = express();

const productRoutes = require('./routes/productRoutes');
app.use(express.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const closeApp = async () => {
  console.log('Starting the process of closing the app...');
  const pool = require('./database').pool;
  await pool.end();
  app.close(() => {
    console.log('The app is closed. Bye!');
    process.exit();
  });
};

process.on('SIGTERM', closeApp);
process.on('SIGINT', closeApp);
