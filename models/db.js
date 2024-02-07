const mongoose = require("mongoose");
require("dotenv").config();

const { DB_URL } = process.env;

mongoose
  .connect(DB_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err.message));
