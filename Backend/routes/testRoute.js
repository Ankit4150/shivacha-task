const express = require("express");
const testrouter = express.Router();

const { createTest, getTest } = require("../controllers/testController");

testrouter.post("/create", createTest);
testrouter.get("/all", getTest);

module.exports = testrouter;