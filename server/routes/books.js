/*
  File name: COMP308-W2019-Midterm-300910535
  Author's name: Semy Jin
  Student ID: 300910535
  Web app name: Favourite Book List
  Heroku link: https://comp308w2019-midterm-300910535.herokuapp.com/
*/

// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the book model
let book = require("../models/books");

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        books: books
      });
    }
  });
});

//  GET - display Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  res.render("books/details", {
    title: "Add New Book",
    books: ""
  });
});

// POST - process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  let newBook = book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  // create new book object
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh books list
      res.redirect("/books");
    }
  });
});

// GET - Book Details page in order to edit an existing Book
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  book.findById(id, (err, bookObject) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // show edit view
      res.render("books/details", {
        title: "Edit Book",
        books: bookObject
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  let updatedBook = book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  // update book object
  book.update({ _id: id }, updatedBook, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh books list
      res.redirect("/books");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;

  book.remove({ _id: id }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh books list
      res.redirect("/books");
    }
  });
});

module.exports = router;
