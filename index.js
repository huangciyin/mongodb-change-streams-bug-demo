const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");

const pipeline = [{
  $project: {
    documentKey: false
  }
}];

MongoClient.connect(
    "mongodb: //localhost:27017,localhost:27018,localhost:27019?replicaSet=mongo-repl"
  )
  .then(client => {
    console.log("Connected correctly to server");
    // specify db and collections
    const db = client.db("superheroesdb");
    const collection = db.collection("superheroes");

    const changeStream = collection.watch(pipeline);
    // listen to change twice
    changeStream.on("change", function (change) {
      console.log("change callback1");
    });

    changeStream.on("change", function (change) {
      console.log("change callback2");
    });

    // insert few data with timeout so that we can watch it happening
    setTimeout(function () {
      collection.insertOne({
        batman: "bruce wayne"
      }, function (err) {
        assert.ifError(err);
      });
    }, 1000);

    // setTimeout(function () {
    //   collection.insertOne({ "superman": "clark kent" }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 2000);

    // setTimeout(function () {
    //   collection.insertOne({ "wonder-woman": "diana prince" }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 3000);

    // setTimeout(function () {
    //   collection.insertOne({ "ironman": "tony stark" }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 4000);

    // setTimeout(function () {
    //   collection.insertOne({ "spiderman": "peter parker" }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 5000);

    // // update existing document
    // setTimeout(function () {
    //   collection.updateOne({ "ironman": "tony stark" }, { $set: { "ironman": "elon musk" } }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 6000);

    // // delete existing document
    // setTimeout(function () {
    //   collection.deleteOne({ "spiderman": "peter parker" }, function (err) {
    //     assert.ifError(err);
    //   });
    // }, 7000);
  })
  .catch(err => {
    console.error(err);
  });