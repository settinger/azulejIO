"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  imageID: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdBy: {
    type: String,
    required: true
  }
});

const Review = mongoose.model("Review", schema);

module.exports = Review;
