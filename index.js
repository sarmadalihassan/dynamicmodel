const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = require("./routes");
const bodyParser = require("body-parser");

app.listen(4000, () => {
  console.log("listening on port 4000");
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/test")
      .then(() => console.log("connected to mongodb"))
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
});

app.use(bodyParser.json());
app.use(router);
