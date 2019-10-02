"use strict";

const User = require("./../models/user");

exports.signUp = (req, res, next) => {
  const { email, username, password } = req.body;
  User.signUp({ email, username, password })
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      res.json({ type: "success", user });
    })
    .catch(error => {
      next(error);
    });
};

exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.signIn({ email, password })
    .then(user => {
      req.session.user = {
        _id: user._id
      };
      res.json({ type: "success", user });
    })
    .catch(error => {
      next(error);
    });
};

exports.signOut = (req, res, next) => {
  req.session.destroy();
  res.json({ type: "success" });
};

exports.verify = (req, res, next) => {
  res.json({
    type: "success",
    user: {
      ...(req.user && { user: req.user })
    }
  });
};

exports.edit = (req, res, next) => {
  const { username } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      ...(username && { username })
    },
    { new: true }
  )
    .then(user => {
      if (!user) {
        return next(new Error("USER_NOT_FOUND"));
      }
      res.json({ user });
    })
    .catch(error => {
      next(error);
    });
};
