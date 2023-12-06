'use strict';

const db = require('../database');

class Product {
  static async getAll() {
    const sql = `
    SELECT *
    FROM product;
    `;
    const connection = db.connectionFactory();
    connection.connect(() => {
      console.log('connected as id ' + connection.threadId);
    });
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
    // const connection1 = db.connectionFactory();
    // const f = (result, fields) =>
    //   console.log(`Hello from callback!\n${{ result, fields }}`);
    // connection1.query(sql, (err, res, fields) => {
    //   connection1.end();
    //   if (err) {
    //     throw err;
    //   } else {
    //     f(res, fields);
    //   }
    // });
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
      const [[res]] = await connection.query(sql);
      // console.dir(
      //   {
      //     query: await connection.query(sql),
      //     execute: await connection.execute(sql),
      //   },
      //   {
      //     depth: null,
      //   },
      // );
      const product = res;
      const producer = await this.getProducerById(id);
      product.producer = producer.name;
      return product;
    } catch (err) {
      throw err;
    } finally {
      if (connection) {
        await connection.end();
        // connection.end().then(() => {
        //   console.log({ connection });
        // });
      }
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
      db.pool.execute(sql, (err, [res]) => {
        if (err) {
          reject(err);
        } else if (!res) {
          reject(new Error('Could not get producer with this id'));
        } else {
          resolve(res);
        }
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
    const [creationReport] = await db.promisePool.execute(slq);
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
    let promiseConnection;
    try {
      const connection = db.connectionFactory();
      promiseConnection = connection.promise();
      await promiseConnection.beginTransaction();
      await promiseConnection.execute(sql);
      await promiseConnection.commit();
      return this.getById(id);
    } catch (err) {
      await promiseConnection.rollback();
      throw err;
    } finally {
      if (promiseConnection) await promiseConnection.end();
    }
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
