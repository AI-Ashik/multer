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
  limits: {
    fileSize: 1000000, // 1MB in byte
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("only jpg,jpeg,png allowed"));
    }
  },
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.post("/", upload.single("avatar", 2), (req, res) => {
  res.send("Success");
});

// app.post("/", upload.array("avatar", 2), (req, res) => {
//   res.send("Success");
// });

// app.post(
//   "/",
//   upload.fields([
//     { name: "avatar", maxCount: 1 },
//     { name: "gallery", maxCount: 2 },
//   ]),
//   (req, res) => {
//     res.send("Success");
//   }
// );

app.get((req, res, next) => {
  res.status(404).json({
    message: "Route Not Found",
  });
  next();
});

app.use((error, req, res, next) => {
  if (error) {
    if (error instanceof multer.MulterError) {
      res.status(500).send("Upload error");
    } else {
      next(error); // Pass other errors to the next error handler
    }
  } else {
    res.send("success");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
