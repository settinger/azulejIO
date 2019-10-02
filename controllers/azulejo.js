"use strict";

const Azulejo = require("./../models/azulejo");
const Review = require("./../models/review");
const User = require("./../models/user");

exports.loadAll = (req, res, next) => {
  Azulejo.find({})
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadSingle = (req, res, next) => {
  Azulejo.findById(req.params.id)
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

exports.loadUser = (req, res, next) => {
  User.findOne(req.params.id)
    .then(user => {
      res.json({ type: "success", user });
    })
    .catch(error => {
      next(error);
    });
};

exports.create = (req, res, next) => {
  const { name, colors, image } = req.body;
  Azulejo.create({
    name,
    colors,
    image,
    createdBy: req.user.username
  })
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
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
