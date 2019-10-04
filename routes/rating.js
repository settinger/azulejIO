"use strict";

const { Router } = require("express");
const router = Router();

const routeGuardMiddleware = require("./../middleware/route-guard");

const ratingController = require("./../controllers/rating");

router.post(
  "/azulejo/:id/rate",
  routeGuardMiddleware(true),
  ratingController.loadSingle
);

module.exports = router;
