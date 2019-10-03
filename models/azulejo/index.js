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
  imageUrl: {
    type: String,
    required: true
  },
  createdBy: {
    type: String,
    required: true
  },
  _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Azulejo = mongoose.model("Azulejo", schema);

module.exports = Azulejo;
