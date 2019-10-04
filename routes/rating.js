"use strict";

const { Router } = require("express");
const router = Router();

const routeGuardMiddleware = require("./../middleware/route-guard");

const ratingController = require("./../controllers/rating");

// router.post("/:id/rate", routeGuardMiddleware(true), ratingController.rate);

module.exports = router;
