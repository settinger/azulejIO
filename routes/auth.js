"use strict";

const { Router } = require("express");
const router = Router();

// const uploadImageMiddleware = require("./../middleware/image-upload");
const routeGuardMiddleware = require("./../middleware/route-guard");
// const upload = require("./../tools/cloudinary");

// const signUpController = require("./../controllers/auth/sign-up");
// const logInController = require("./../controllers/auth/log-in");
// const logOutController = require("./../controllers/auth/log-out");
// const loggedInController = require("./../controllers/auth/logged-in");
// const editController = require("./../controllers/auth/edit");

const auth = require("./../controllers/authentication");

router.post("/signup", routeGuardMiddleware(false), auth.signUp);
router.post("/signin", routeGuardMiddleware(false), auth.signIn);
router.post("/signout", routeGuardMiddleware(true), auth.signOut);
router.get("/verify", auth.verify);
router.get("/profile/:username", auth.loadUser);
router.patch("/profile/:username/edit", routeGuardMiddleware(true), auth.edit);
router.delete("/profile/:username", routeGuardMiddleware(true), auth.remove);

module.exports = router;
