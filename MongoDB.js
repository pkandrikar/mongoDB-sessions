const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://pkandrikar:password@cluster0.pkmzk.mongodb.net/database1?retryWrites=true&w=majority",
  { useUnifiedTopology: true },
  { keepAlive: 1 }
);

var ObjectId = require("mongodb").ObjectId;

var _db;

module.exports = {
  init: function (callback) {
    client
      .connect()
      .then((client) => {
        _db = client.db("database1");
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // client.close();
      });
  },

  getDB: function () {
    return _db;
  },
  ObjectId: ObjectId,
};
