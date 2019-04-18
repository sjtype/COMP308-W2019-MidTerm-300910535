/*
  File name: COMP308-W2019-Midterm-300910535
  Author's name: Semy Jin
  Student ID: 300910535
  Web app name: Favourite Book List
  Github repository link: https://github.com/sjtype/COMP308-W2019-MidTerm-300910535
  Heroku link: https://comp308w2019-midterm-300910535.herokuapp.com/
*/

// modules for user model
let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

// create a model class
let userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "Username is required."
    },
    email: {
      type: String,
      default: "",
      trim: true,
      required: "Email is required."
    },
    displayName: {
      type: String,
      default: "",
      trim: true,
      required: "Display name is required."
    },
    created: {
      type: Date,
      default: Date.now
    },
    update: {
      type: Date,
      default: Date.now
    }
  },
  { 
    collection: "users" 
  }
);

// configure options for user schema
let options = {
  missingPasswordError: "Wrong/missing password"
};

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model("users", userSchema);
