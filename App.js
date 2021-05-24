const { MongoClient } = require("mongodb");
const express = require("express");
const booksRouter = require("./Books");
const MongoDB = require("./MongoDB");

const port = 8000;

const app = express();
app.listen(port, "localhost");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", booksRouter);

MongoDB.init();
