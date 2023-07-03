const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/relationshipDemo")
  .then(() => console.log("Mongo Connection Open!!"))
  .catch((err) => {
    console.log("Oh No Mongo Connection Error!");
    console.log(err);
  });
