'use strict';

require('dotenv').config();
const mysql = require('mysql2');
const promiseMysql = require('mysql2/promise');

const access = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

const pool = mysql.createPool(access);
const promisePool = promiseMysql.createPool(access);
const connectionFactory = () => mysql.createConnection(access);
const promiseConnectionFactory = () => promiseMysql.createConnection(access);

module.exports = {
  pool,
  promisePool,
  connectionFactory,
  promiseConnectionFactory,
};
