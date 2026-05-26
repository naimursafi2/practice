const express = require("express");
// const dns = require("dns");
const cookieParser = require("cookie-parser");
const router = require("./routes");
const dbConfig = require("./config/dbConfig");
const app = express();
require("dotenv").config();
const cors = require("cors");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(express.json());
app.use(cookieParser());
dbConfig();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(router);
app.listen(8000, () => console.log("Server is running"));
