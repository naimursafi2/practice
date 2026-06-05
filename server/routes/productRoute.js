const express = require('express');
const { createProduct } = require('../controller/productController');
const { authMiddleware, roleCheck } = require('../middleware/authMiddleware');
const route = express.Router();

route.post("/create",authMiddleware,roleCheck(["admin","moderator"]),createProduct)

module.exports = route