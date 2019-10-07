"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  reviews: [
    {
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      comment: {
        type: String
      },
      _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    }
  ],
  name: {
    type: String,
    required: true,
    trim: true
  },
  colors: {
    type: Array
  },
  imageUrl: {
    type: String,
    required: true
  },
  fav: {
    type: Number,
    trim: true
  },
  _createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  _remixedFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Azulejo" }
});

const Azulejo = mongoose.model("Azulejo", schema);

module.exports = Azulejo;
