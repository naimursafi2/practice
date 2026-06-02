const express = require("express");
const router = express.Router();
const authRoute = require('./authRoute')


router.use("/auth",authRoute);
router.use("/category",require('./categoryRoute'))

module.exports = router;
