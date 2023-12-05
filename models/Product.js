'use strict';

const db = require('../database');

const Product = {
  async getAll() {
    const sql = 'SELECT * FROM product;';
    return (await db.execute(sql))[0];
  },

  async getById(id) {
    const sql = `SELECT * FROM product WHERE id = ${id};`;
    return (await db.execute(sql))[0];
  },

  async create({ name, producer }) {
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
    const [newProduct] = await db.execute(slq);
    return newProduct;
  },

  async updateById(id, { name, producer }) {
    const sql = `
    UPDATE product SET
      name = '${name}',
      producer = '${producer}'
    WHERE id = ${id};
    `;
    await db.execute(sql);
    return Product.getById(id);
  },

  async deleteById(id) {
    const product = await Product.getById(id);
    const sql = `DELETE from product WHERE id = ${id};`;
    await db.execute(sql);
    return product;
  },
};

module.exports = Product;
