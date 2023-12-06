'use strict';

const db = require('../database');

class Product {
  static async getAll() {
    const sql = `
    SELECT *
    FROM product;
    `;
    const connection = db.connectionFactory();
    const products = await new Promise((resolve, reject) => {
      connection.query(sql, (err, res, fields) => {
        connection.end();
        if (err) {
          reject(err);
        } else {
          // console.log({ res, fields });
          resolve(res);
        }
      });
    });
    for await (const product of products) {
      const producer = await this.getProducerById(product.id);
      product.producer = producer.name;
    }
    return products;
  }

  static async getById(id) {
    const sql = `
    SELECT *
    FROM product
    WHERE id = ${id};
    `;
    let connection;
    try {
      connection = await db.promiseConnectionFactory();
      const [res] = await connection.query(sql);
      // console.dir(
      //   {
      //     query: await connection.query(sql),
      //     execute: await connection.execute(sql),
      //   },
      //   {
      //     depth: null,
      //   },
      // );
      const product = res[0];
      const producer = await this.getProducerById(id);
      product.producer = producer.name;
      return product;
    } catch (err) {
      throw err;
    } finally {
      await connection.end();
    }
  }

  static getProducerById(id) {
    const sql = `
    SELECT producer.*
    FROM producer
    LEFT JOIN product
    ON producer.id = product.producer
    WHERE product.id = ${id};
    `;
    return new Promise((resolve, reject) => {
      db.pool.execute(sql, (err, res) => {
        if (err) reject(err);
        else resolve(res[0]);
      });
    });
  }

  static async create({ name, producer }) {
    const slq = `
    INSERT INTO product(
      name,
      producer
    )
    VALUES(
      '${name}',
      '${producer}'
    )
    `;
    const creationReport = (await db.promisePool.execute(slq))[0];
    const newProductId = creationReport.insertId;
    return this.getById(newProductId);
  }

  static async updateById(id, { name, producer }) {
    const sql = `
    UPDATE product
    SET
      name = '${name}',
      producer = '${producer}'
    WHERE id = ${id};
    `;
    let connection;
    try {
      const connection = db.connectionFactory();
      const a = connection.execute(sql);
      // const [rows, fields] = await connection.execute(sql);
      console.log({ a });
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        connection.end();
      }
    }
    return this.getById(id);
  }

  static async deleteById(id) {
    const product = await this.getById(id);
    const sql = `
    DELETE FROM product
    WHERE id = ${id};
    `;
    db.promisePool
      .getConnection()
      .then((connection) => {
        connection.execute(sql);
        connection.release();
      })
      .catch((err) => {
        throw err;
      });
    return product;
  }
}

module.exports = Product;
