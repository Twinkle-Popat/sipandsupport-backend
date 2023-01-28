const express = require("express");
const router = express.Router();
const Creator = require("../models/creator");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const membershipController = require("../controllers/membershipController");

router.use(bodyParser.urlencoded({
    extended: true
}));

router.use(session({
    secret: "Our little Secret.",
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());

router.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

router.get("/auth/google/dashboard", 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
});

router.get("/logout", function(req,res){
    req.logout(function(err){
        if(err) throw err;
    });
    res.redirect("/");
});

router.post("/register", registerController.registerCreator);
router.post("/login", loginController.loginCreator);
router.post("/membership/:userId", membershipController.addMembership);

module.exports = router;