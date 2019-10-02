"use strict";

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    required: false
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user"
  }
});

const signInStatic = require("./statics/sign-in");
const signUpStatic = require("./statics/sign-up");
const findByEmailStatic = require("./statics/find-by-email");

schema.statics.signIn = signInStatic;
schema.statics.signUp = signUpStatic;
schema.statics.findByEmail = findByEmailStatic;

const User = mongoose.model("User", schema);

module.exports = User;
