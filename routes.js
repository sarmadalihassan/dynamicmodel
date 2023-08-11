const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dynamicModels = {};

router.get("/", (req, res) => {
  return res.status(200).send("hello");
});

router.post("/create-model", (req, res) => {
  const modelName = req.body.modelName;
  delete req.body.modelName;

  const schema = new mongoose.Schema(req.body);

  dynamicModels[modelName] = mongoose.model(modelName, schema);

  return res.status(200).send("model route");
});

router.post("/use-model", async (req, res) => {
  const modelName = req.body.modelName;

  delete req.body.modelName;

  const model = dynamicModels[modelName];

  if (!model) {
    return res.status(404).json({ message: "Dynamic model not found" });
  }

  const result = await model.create({ title: "hello" });

  return res.status(200).send("use model route");
});

module.exports = router;
