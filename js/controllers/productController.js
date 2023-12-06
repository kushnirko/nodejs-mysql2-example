'use strict';

const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();
    res.status(200).json({ products });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
  // Product.getAll()
  //   .then((products) => res.status(200).json({ products }))
  //   .catch((err) => {
  //     console.error(err);
  //     res.status(404).json({ errorMessage: err.message });
  //   });
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getById(productId);
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    const createdProduct = await Product.create(productData);
    res.status(201).json({ createdProduct });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const newProductData = req.body;
    const updatedProduct = await Product.updateById(productId, newProductData);
    res.status(200).json({ updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(400).json({ errorMessage: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.deleteById(productId);
    res.status(200).json({ deletedProduct });
  } catch (err) {
    console.error(err);
    res.status(404).json({ errorMessage: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
