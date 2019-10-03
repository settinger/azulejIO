"use strict";

const { Router } = require("express");
const router = Router();

const routeGuardMiddleware = require("./../middleware/route-guard");

const azulejoController = require("./../controllers/azulejo");

router.get("/azulejo/all", azulejoController.loadAll);
router.get("/azulejo/:id", azulejoController.loadSingle);

router.post(
  "/azulejo/rate/:id",
  routeGuardMiddleware(true),
  azulejoController.rate
);

// router.post("/search", azulejoController.verify);

router.post(
  "/azulejo/create",
  routeGuardMiddleware(true),
  azulejoController.create
);

router.delete(
  "/azulejo/delete/:id",
  routeGuardMiddleware(true),
  azulejoController.remove
);

module.exports = router;
