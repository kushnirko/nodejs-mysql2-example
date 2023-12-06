'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./database');

const productRoutes = require('./routes/productRoutes');
app.use(express.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const closeServer = async () => {
  console.log('\nStarting the process of closing the app...');
  try {
    await db.pool.end();
    await db.promisePool.end();
    await server.close(() => {
      console.log('The app is closed. Bye!');
      process.exit();
    });
  } catch (err) {
    console.error('Error during closing the app: ' + err.message);
    process.exit(1);
  }
};

// The SIGINT signal is sent to a process by its controlling terminal when a user wishes to interrupt the process.
process.on('SIGINT', closeServer);
// The SIGTERM signal is sent to a process to request its termination.
process.on('SIGTERM', closeServer);
