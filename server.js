const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./config/db");
const apiroutes = require("./routes");
const cors = require("cors");

db();

app.use(cors());
app.use(express.json());
app.use("/api", apiroutes);
app.use(express.static("public/images"));

app.get("/", (req, res) => {
  res.send("its working ");
});

app.listen(4000, () => {
  console.log("server is running ");
});
