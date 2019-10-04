"use strict";
require("dotenv").config();
const cloudinary = require("cloudinary");

const Azulejo = require("./../models/azulejo");
const Rating = require("./../models/rating");
const User = require("./../models/user");

cloudinary.config();

exports.loadAll = (req, res, next) => {
  Azulejo.find()
    .sort({ createdAt: -1 })
    .populate("_createdBy")
    .then(azulejos => {
      console.log(azulejos);
      res.json({ type: "success", azulejos });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadSingle = (req, res, next) => {
  Azulejo.findById(req.params.id)
    .sort({ createdAt: -1 })
    .populate("_createdBy")
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
};

exports.rate = (req, res, next) => {
  const { imageID, rating, comment } = req.body;
  Review.create({
    imageID,
    rating,
    comment,
    createdBy: req.user.username
  })
    .then(review => {
      res.json({ type: "success", review });
    })
    .catch(error => {
      next(error);
    });
};

exports.create = (req, res, next) => {
  const { name, colors, image } = req.body;
  // Upload to Cloudinary
  cloudinary.v2.uploader.upload(
    image,
    { folder: "/azulejio" },
    (error, result) => {
      console.log(result, error);
      Azulejo.create({
        name,
        colors,
        imageUrl: result.url,
        createdBy: req.user.username,
        _createdBy: req.user._id
      })
        .then(azulejo => {
          res.json({ type: "success", azulejo });
        })
        .catch(error => {
          next(error);
        });
    }
  );
};

exports.remove = (req, res, next) => {
  Azulejo.findOneAndDelete({
    _id: req.params.id
  })
    .then(azulejo => {
      if (azulejo) {
        res.json({ type: "success" });
      } else {
        next(new Error("AZULEJO_COULD_NOT_BE_DELETED"));
      }
    })
    .catch(error => {
      next(error);
    });
};
