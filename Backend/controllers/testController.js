const TestCollection = require("../models/testModel");
const mongoose = require("mongoose");


const createTest = async (req, res) => {
  try {
    console.log("Ready State:", mongoose.connection.readyState);
    console.log("DB Name:", mongoose.connection.name);

    const data = await TestCollection.create({
      name: req.body.name,
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getTest = async (req, res) => {
  try {
    const data = await TestCollection.find();

    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createTest, getTest };