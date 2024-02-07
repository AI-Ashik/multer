require("dotenv").config();
require("./models/db");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const { PORT } = process.env;
const app = express();
const UPLOADS_FOLDER = "./uploads";

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const upload = multer({
  dest: UPLOADS_FOLDER,
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.post("/", upload.single("avatar", 2), (req, res) => {
  res.send("Success");
});

app.get((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
  next();
});

app.get((error, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
