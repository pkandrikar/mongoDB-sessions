const { MongoClient } = require("mongodb");
const express = require("express");
const booksRouter = require("./Books");

const MongoDB = require("./MongoDB");

const app = express();
app.listen(8000, "localhost", 10, () => {});
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/books", booksRouter);

MongoDB.init();
