const express = require("express");
const multer = require("multer");
const upload = multer();

const { authMiddleware, roleCheck } = require("../middleware/authMiddleware");
const {
  createCategory,
  getAllCategory,
  updateCategory,
} = require("../controller/categoryController");
const route = express.Router();

route.post("/create", authMiddleware, roleCheck(["admin"]), createCategory);
route.get("/all", getAllCategory);
route.put("/update-category", upload.single("thumbnail"),updateCategory)

module.exports = route;
