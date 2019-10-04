"use strict";

const Rating = require("./../models/rating");
const Azulejo = require("./../models/azulejo");

exports.rate = (req, res, next) => {
  const { rating, comment } = req.body;
  Rating.create({
    azulejo: req.params.id,
    rating,
    comment,
    _createdBy: req.user._id
  })
    .then(review => {
      res.json({ type: "success", review });
    })
    .catch(error => {
      next(error);
    });
};
