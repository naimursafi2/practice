const express = require("express");
const multer = require("multer");
const upload = multer();
const { createProduct } = require("../controller/productController");
const { authMiddleware, roleCheck } = require("../middleware/authMiddleware");
const route = express.Router();

route.post(
  "/create",
  authMiddleware,
  roleCheck(["admin", "moderator"]),
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "images", maxCount: 4 },
  ]),
  createProduct,
);

module.exports = route;
