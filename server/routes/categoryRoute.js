const express = require("express");
const { authMiddleware, roleCheck } = require("../middleware/authMiddleware");
const {
  createCategory,
  getAllCategory,
} = require("../controller/categoryController");
const route = express.Router();

route.post("/create", authMiddleware, roleCheck(["admin"]), createCategory);
route.get("/all", getAllCategory);

module.exports = route;
