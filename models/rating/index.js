"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

const Rating = mongoose.model("Rating", schema);

module.exports = Rating;
