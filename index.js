const express = require("express");
const multer = require("multer");

// File upload folder
const UPLOADS_FOLDER = "./uploads/";
// preapre the final multer upload object
const upload = multer({
  dest: UPLOADS_FOLDER,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "avatar") {
      if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
      ) {
        cb(null, true);
      } else {
        cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
      }
    } else if (file.fieldname === "doc") {
      if (file.mimetype === "application/pdf") {
        cb(null, true);
      } else {
        cb(new Error("Only .pdf format allowed!"));
      }
    } else {
      cb(new Error("There was an unknown error!"));
    }
  },
});

// express app initialization
const app = express();

// application route
app.post(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 2,
    },
    {
      name: "doc",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    res.send("success");
  }
);

// default error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

app.listen(3000, () => {
  console.log("app listening at port 3000");
});
