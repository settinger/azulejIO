"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  colors: {
    type: Array
  },
  ratings: {
    type: Array
  },
  image: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  }
});

const Azulejo = mongoose.model("Azulejo", schema);

module.exports = Azulejo;
