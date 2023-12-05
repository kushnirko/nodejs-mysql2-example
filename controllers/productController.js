'use strict';

const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Whoops... Something went wrong(' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getById(productId);
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Whoops... Something went wrong(' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, producer } = req.body;
    const createdProduct = await Product.create({ name, producer });
    res.status(200).json({ newProduct: createdProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Whoops... Something went wrong(' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const newProductData = req.body;
    const updatedProduct = await Product.updateById(productId, newProductData);
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Whoops... Something went wrong(' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.deleteById(productId);
    res.status(200).json({ deletedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Whoops... Something went wrong(' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
