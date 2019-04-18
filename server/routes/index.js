/*
  File name: COMP308-W2019-Midterm-300910535
  Author's name: Semy Jin
  Student ID: 300910535
  Web app name: Favourite Book List
  Github repository link: https://github.com/sjtype/COMP308-W2019-MidTerm-300910535
  Heroku link: https://comp308w2019-midterm-300910535.herokuapp.com/
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let passport = require("passport");

// define the book model
let book = require("../models/books");
// define the user model
let userModel = require("../models/users");
let User = userModel.User;

/* GET home page. wildcard */
router.get("/", (req, res, next) => {
  res.render("content/index", {
    title: "Home",
    displayName: req.user ? req.user.displayName : ""
  });
});

/* GET - display login page */
router.get("/login", (req, res, next) => {
  // check if user logged in
  if (!req.user) {
    res.render("auth/login", {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
});

/* POST - process login page */
router.post("/login", (req, res, next) => {
  // authenticate user credentials
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }

    req.logIn(user, err => {
      if (err) {
        return next(err);
      }
      return res.redirect("/books");
    });
  })(req, res, next);
});

/* GET display registration page */
router.get("/register", (req, res, next) => {
  if (!req.user) {
    res.render("auth/register", {
      title: "Register",
      messages: req.flash("registerMessage"),
      displayName: req.user ? req.user.displayName : ""
    });
  } else {
    return res.redirect("/");
  }
});

/* POST process registration page */
router.post("/register", (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, err => {
    if (err) {
      console.log("Error: Cannot register user");
      if (err.name == "UserExistsError") {
        req.flash("registerMessage", "Error: User already exists!");
        console.log("Error: User already exists!");
      }
      return res.render("auth/register", {
        title: "Register",
        messages: req.flash("registerMessage"),
        displayName: req.user ? req.user.displayName : ""
      });
    } else {
      // registration successful
      return passport.authenticate("local")(req, res, () => {
        // redirect user
        res.redirect("/books");
      });
    }
  });
});

/* GET user logout */
router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
