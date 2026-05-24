const express = require("express");
// const dns = require("dns");
const router = require("./routes");
const dbConfig = require("./config/dbConfig");
const app = express();
require("dotenv").config();

// dns.setServers(["8.8.8.8", "8.8.4.4"]);
app.use(express.json());
app.use(router);
dbConfig();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.listen(8000, () => console.log("Server is running"));
