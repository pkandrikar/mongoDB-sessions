const express = require("express");
const router = express.Router();
const mongoDB = require("./MongoDB");

function table() {
  return mongoDB.getDB().collection("books");
}

/* ADD BOOK */
async function addBook(req, res) {
  const book = req.body;
  const result = await table().insertOne(book);
  res.send({ ...book, _id: result.insertedId });
}
router.put("/", (req, res) => {
  addBook(req, res);
});

/* GET BOOK BY ID */
async function getBookByID(req, res) {
  const book = await table().findOne({ _id: mongoDB.ObjectId(req.params.id) });
  res.send(book);
}
router.get("/:id", (req, res) => {
  getBookByID(req, res);
});

/* GET ALL BOOKS */
async function getAllBooks(req, res) {
  const books = table().find().sort({ pages: -1 });
  const allValues = await books.toArray();
  res.send(allValues);
}
router.get("/", (req, res) => {
  getAllBooks(req, res);
});

/* DELETE BOOK by ID */
async function deleteBookByID(req, res) {
  const book = await table().deleteOne({
    _id: mongoDB.ObjectId(req.params.id),
  });
  res.send("Record deleted");
}

router.delete("/:id", (req, res) => {
  deleteBookByID(req, res);
});

/* EXPORT */
module.exports = router;
