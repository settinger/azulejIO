"use strict";
require("dotenv").config();
const cloudinary = require("cloudinary");

const Azulejo = require("./../models/azulejo");
const User = require("./../models/user");

cloudinary.config();

exports.loadAll = (req, res, next) => {
  Azulejo.find()
    .sort({ createdAt: -1 })
    .populate("_createdBy")
    .then(azulejos => {
      res.json({ type: "success", azulejos });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadSearch = async (req, res, next) => {
  const n = req.query.n && parseInt(req.query.n); // Pagination: how many entries per page
  const p = req.query.p && parseInt(req.query.p); // Pagination: which page to start on
  const username = req.query.user;
  const color = req.query.color;
  const searchParams = {};
  const searchOptions = {};
  if (n) {
    searchOptions.limit = n;
  }
  if (n && p) {
    searchOptions.skip = p * n;
  }
  searchOptions.sort = { $natural: -1 };
  if (username) {
    const foundUser = await User.findOne({ username });
    searchParams._createdBy = foundUser && foundUser._id;
  }
  if (color) {
    searchParams.colors = { $in: color };
  }
  Azulejo.find(searchParams, null, searchOptions)
    .populate("_createdBy")
    .then(azulejos => {
      res.json({ type: "success", azulejos });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadRecent = (req, res, next) => {
  const n = parseInt(req.query.n) || 20; // Pagination: how many entries per page
  const p = parseInt(req.query.p) || 0; // Pagination: which page to start on
  Azulejo.find()
    .sort({ $natural: -1 })
    .skip(p * n)
    .limit(n)
    .populate("_createdBy")
    .populate({ path: "_remixedFrom", populate: { path: "_createdBy" } })
    .then(azulejos => {
      res.json({ type: "success", azulejos });
    })
    .catch(error => {
      next(error);
    });
};

exports.loadSingle = (req, res, next) => {
  Azulejo.findById(req.params.id)
    .populate("_createdBy")
    .populate("_ratings")
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
};

exports.create = (req, res, next) => {
  const { name, colors, image, _remixedFrom } = req.body;
  // Upload to Cloudinary
  cloudinary.v2.uploader.upload(
    image,
    { folder: "/azulejio" },
    (error, result) => {
      Azulejo.create({
        name,
        colors,
        imageUrl: result.url,
        createdBy: req.user.username,
        _createdBy: req.user._id,
        _remixedFrom
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
exports.updateRate = (req, res, next) => {
  const { rating, comment } = req.body;
  Azulejo.findByIdAndUpdate(req.params.id, {
    $push: {
      reviews: {
        rating,
        comment,
        _createdBy: req.user._id
      }
    }
  })
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
};
exports.addFav = (req, res, next) => {
  Azulejo.findByIdAndUpdate(
    req.params.id,
    {
      $push: { fav: req.user._id }
    },
    { new: "true" }
  )
    .then(azulejo => {
      res.json({ type: "success", azulejo });
    })
    .catch(error => {
      next(error);
    });
};

exports.removeFav = (req, res, next) => {
  Azulejo.findByIdAndUpdate(
    req.params.id,
    {
      $pull: { fav: req.user._id }
    },
    { new: "true" }
  )
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
