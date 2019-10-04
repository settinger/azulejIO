"use strict";

const Rating = require("./../models/rating");

exports.rate = (req, res, next) => {
  const { rating, comment } = req.body;
  Rating.create({
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
