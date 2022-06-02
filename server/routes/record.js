const { ObjectID } = require("bson");
const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("employees");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// This section will get a single record by name
recordRoutes.route("/record/:name").get(function (req, res) {
  //set db_connect to the database
  let db_connect = dbo.getDb();
  //set myquery to the name that was passed in the url
  let myquery = {name: req.params.name};  
  //find the record in the database
  db_connect
      //search in the collection "records"
      .collection("records")
      //find the record that matches the name
      .findOne(myquery, function (err, result) {
        //if there is an error, throw it
        if (err) throw err;
        //if there is no error, return the result
        res.json(result);
      });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
      name: req.body.Name,
      email: req.body.Email,
      password: req.body.Password,
      chestsOpened: req.body.ChestsOpened,
      itemsCollected: req.body.ItemsCollected
    
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
});

// This section will help you update a record by name.
recordRoutes.route("/update/:name").put(function (req, response) {
  let db_connect = dbo.getDb();  
  let myquery = { name: req.params.name};  
  console.log(myquery);
  let newvalues = {    
    $set: {   
      /*name: req.body.Name,
      email: req.body.Email,
      password: req.body.Password,
      health: req.body.Health,
      jumpVelocity: req.body.JumpVelocity,
      playerSpeed: req.body.PlayerSpeed,*/
      chestsOpened: req.body.ChestsOpened,
      itemsCollected: req.body.ItemsCollected   
    },  
  };
  db_connect.collection("records").findOneAndUpdate(myquery, newvalues, {new: true}, function (err, res) {
        if (err) throw err;
        response.json(res);
  });
});

// This section will help you delete a record
recordRoutes.route("/:name").delete((req, response) => {
  //set db_connect to the database
  let db_connect = dbo.getDb();
  //set myquery to the name that was passed in the url
  let myquery = { name: req.params.name};
  //delete the record
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

module.exports = recordRoutes; 